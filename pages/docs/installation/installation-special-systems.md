---
title: Special systems
permalink: installation-special-systems.html
keywords: installation, building, dependencies, spack, cluster, supercomputer
tocheaders: h2,h3
---

This page contains instructions for building preCICE on special systems, being clusters and supercomputers.

The systems in the [archived section](#archived-systems) are no longer operational.
The instructions may still be valuable for unlisted systems.

{% include note.html content="We encourage users to actively contribute to this page! If your system is not listed, please feel encouraged to add instructions for it!" %}

## Active systems

### SuperMUC-NG (Lenovo/Intel, Munich)

Login: [LRZ page](https://doku.lrz.de/display/PUBLIC/Access+and+Login+to+SuperMUC-NG)

#### Building

(1) [Download Eigen](http://eigen.tuxfamily.org/index.php?title=Main_Page) and copy it to SuperMUC. Put in your `.bashrc`.
```bash
export EIGEN3_ROOT="$HOME/Software/eigen3"
```

(2) [Download latest boost](), copy it to SuperMUC and build yourself:
```bash
./bootstrap.sh --with-libraries=log,thread,system,filesystem,program_options,test --prefix=$HOME/Software/boost-install
./b2 install
``` 
Then, in your `.bashrc`:
```bash
export BOOST_ROOT=$HOME/Software/boost-install
export LIBRARY_PATH=$BOOST_ROOT/lib:$LIBRARY_PATH
export LD_LIBRARY_PATH=$BOOST_ROOT/lib:$LD_LIBRARY_PATH
export CPLUS_INCLUDE_PATH=$BOOST_ROOT/include:$CPLUS_INCLUDE_PATH
```

(3) Some further modules you need:
```bash
module load cmake
module load gcc
```

(4) Build
```bash
CXX=mpicxx cmake -DBUILD_SHARED_LIBS=ON -DCMAKE_BUILD_TYPE=Debug -DPETSC=OFF -DPYTHON=OFF
```

(5) Run tests. Create a `job.cmd` with 
```bash
#!/bin/bash
#SBATCH --time=00:10:00
#SBATCH -J tests
#Output and error (also --output, --error):
#SBATCH -o ./%x.%j.out
#SBATCH -e ./%x.%j.err
#Initial working directory (also --chdir):
#SBATCH -D ./
#SBATCH --exclusive
#SBATCH --partition=test
#SBATCH --nodes=1
#SBATCH --ntasks-per-node=48
#SBATCH --account=pn56se
#SBATCH --get-user-env

module load slurm_setup

rm -rf tests
mkdir tests
cd tests
mpiexec -np 4 ../../Software/precice-1.6.1/build/debug/testprecice --log_level=test_suite --run_test="\!@MPI_Ports"

```
 
#### Notes on OpenFOAM

To get OpenFOAM and the OpenFOAM adapter to work, some hacks are needed. 

(1) **OpenFOAM**: None of the OpenFOAM modules seem to work, but you can directly:
```bash
source /lrz/sys/applications/OpenFOAM/OpenFOAM-v1812+.impi.gcc/OpenFOAM-v1812/etc/bashrc_impi.gcc
```

Afterwards, you might need to reload 
```bash
module load intel/19.0
```
and you also need to change
```bash
module swap mpi.intel/2019_gcc mpi.intel/2018_gcc
```

(2) **yaml-cpp**

Copy [yaml-cpp](https://github.com/jbeder/yaml-cpp) to SuperMUC, 0.6.3 seems to work.
* From `yaml-cpp-yaml-cpp-0.6.3` path: `mkdir build` and `cd build`  
* `CXX=gcc CC=gcc cmake -DYAML_BUILD_SHARED_LIBS=ON ..`
* `make yaml-cpp`
* and add to your `.bashrc`
```bash
export CPLUS_INCLUDE_PATH="$HOME/Software/yaml-cpp-yaml-cpp-0.6.3/include:${CPLUS_INCLUDE_PATH}"
export LD_LIBRARY_PATH="$HOME/Software/yaml-cpp-yaml-cpp-0.6.3/build:${LD_LIBRARY_PATH}"
```

(3) Build the **OpenFOAM adapter**

#### Notes on SWAK

* `ln -s swakConfiguration.automatic swakConfiguration`
* `export WM_NCOMPPROCS=16`
* `module load python/3.6_intel`
* download bison (`wget http://ftp.gnu.org/gnu/bison/bison-3.0.4.tar.gz`) and copy it to `privateRequirements/sources`







#### Job script for Ateles

```bash
#!/bin/bash
#SBATCH --time=00:30:00
#SBATCH -J <name of your job>
#Output and error (also --output, --error):
#SBATCH -o ./%x.%j.out
#SBATCH -e ./%x.%j.err
#Initial working directory (also --chdir):
#SBATCH -D ./
#SBATCH --mail-type=END
#SBATCH --mail-user= <your email address>
#SBATCH --exclusive
#SBATCH --partition=test
#SBATCH --nodes=11
#SBATCH --ntasks-per-node=48
#SBATCH --account= <project name>
#SBATCH --ear=off

module load slurm_setup
module unload devEnv/Intel/2019
module load devEnv/GCC
export FC=mpif90
export CC=mpicc

BOOST_ROOT=$HOME/lib_precice/boost
export PRECICE_ROOT=$HOME/lib_precice/precice
export LD_LIBRARY_PATH=$PRECICE_ROOT/build/last:$LD_LIBRARY_PATH
export LIBRARY_PATH=$PRECICE_ROOT/build/last:$LIBRARY_PATH
export LIBRARY_PATH=$BOOST_ROOT/lib:$LIBRARY_PATH
export LD_LIBRARY_PATH=$BOOST_ROOT/lib:$LD_LIBRARY_PATH
export CPLUS_INCLUDE_PATH=$BOOST_ROOT/include:$CPLUS_INCLUDE_PATH

#UPDATE intervalk in seconds
DELAY="60"

rm -f simultan.machines
rm -f *hosts
rm -fr .*address
```
```bash
echo "tpn: ${SLURM_TASKS_PER_NODE%%(*}"
for i in `scontrol show hostname $SLURM_JOB_NODELIST`; do
for j in $(seq 1 ${SLURM_TASKS_PER_NODE%%(*}); do echo $i >> simultan.machines; done
done
#### CAUTION: NO NODE SHARING BETWEEN PARTICIPANTS IS ALLOWED! #### 
L1=1
L2=432
sed -n -e "${L1},${L2}p" ./simultan.machines > dom1.hosts
mpiexec -np 432 -hostfile dom1.hosts <Path to executable> <File to be executed> &> <Output file> &
PID1=$!
echo $PID1
L1=433
L2=480
sed -n -e "${L1},${L2}p" ./simultan.machines > dom2.hosts
mpiexec -np 37 -hostfile dom2.hosts <Path to executable> <File to be executed> &> <Output file> &
PID2=$!
echo $PID2
L1=481
L2=528
sed -n -e "${L1},${L2}p" ./simultan.machines > dom3.hosts
mpiexec -np 2 -hostfile dom3.hosts <Path to executable> <File to be executed> &> <Output file> &
PID3=$!
echo $PID3

check_and_kill() {
  ps $1
  if (( $? )); then
    kill $2
    return 1
  else
    return 0
  fi
}

while [[ 1 ]]

do
 check_and_kill "$PID1" "$PID2" || exit
 check_and_kill "$PID2" "$PID1" || exit
 sleep $DELAY
done
```

### CooLMUC (LRZ Linux Cluster, Munich)

### Building with CMake

#### Build

Building preCICE on the [LRZ Linux Cluster](https://www.lrz.de/services/compute/linux-cluster/overview/) (here CooLMUC2) is similar to building it on other supercomputers. If you load modules for any preCICE related installation, make sure the used MPI versions are consistent. This is also relevant for any solver you want to couple with preCICE. Therefore, it might be helpful to have a look in your solvers module installation before you start compiling preCICE. You can use `module show` to get information about specific modules.

##### Basic building (without PETSc or Python)

Most of the necessary dependencies for a basic building are available via modules. We use here `mpi.intel/2018_gcc` for the MPI dependency as an example, since we later load an OpenFOAM module, which needs this MPI version.
```bash
module load gcc/7
module load mpi.intel/2018_gcc
module load boost/1.68.0 # Read below if you need yaml-cpp
module load cmake/3.12.1
```
Before running the command `module load mpi.intel/2018_gcc` the user has to run `module unload mpi.intel` to unload the preloaded mpi version.
Steps for the Eigen dependency are described in the [wiki page for SuperMUC](SuperMUC). Afterwards, follow the usual [building instructions for CMake](https://github.com/precice/precice/wiki/Building:-Using-CMake):
```bash
mkdir build && cd build
cmake -DBUILD_SHARED_LIBS=ON -DPETSC=OFF -DPYTHON=OFF -DCMAKE_INSTALL_PREFIX=/path/to/precice/installation -DCMAKE_BUILD_TYPE=RelWithDebInfo ..
make -j 12
make install
```

After installing, make sure you add the preCICE installation paths to your `.bashrc`, so that other programs can find it:
```bash
export PRECICE_ROOT="path/to/precice_install"
export PKG_CONFIG_PATH="path/to/precice_install/lib/pkgconfig:${PKG_CONFIG_PATH}"
export CPLUS_INCLUDE_PATH="path/to/precice_install/include:${CPLUS_INCLUDE_PATH}"
export LD_LIBRARY_PATH="path/to/precice_install/lib:${LD_LIBRARY_PATH}"
```

###### Boost and yaml-cpp

If you want to install a solver/adapter which depends on **yaml-cpp** (e.g. OpenFOAM adapter or CalculiX adapter), its compilation will probably lead to linking errors for yaml-cpp versions >= 0.6. Since a yaml-cpp < 0.6 requires boost < 1.67 and preCICE needs at least a boost version >= 1.65.1, we need to compile Boost from source. Therefore, download the desired (in your case 1.65.1) boost version from the [boost version history](https://www.boost.org/users/history/) and [copy it to the cluster](https://www.lrz.de/services/compute/ssh/).
```bash
tar -xzvf boost_1_65_1.tar.gz
cd boost_1_65_1
./bootstrap.sh --with-libraries=log,thread,system,filesystem,program_options,test --prefix=/path/to/installation/target
./b2 install
```
This installs Boost in your prefix directory. You need to add the `prefix/lib` path to your `LD_LIBRARY_PATH` and your `prefix/include` path to your `CPLUS_INCLUDE_PATH`. Additionally, set the `BOOST_ROOT` according to your 
prefix. If the boost installation is done in a separate folder, result might look like:
```bash
export LIBRARY_PATH="path/to/boost_install/lib:${LIBRARY_PATH}"
export LD_LIBRARY_PATH="path/to/boost_install/lib:${LD_LIBRARY_PATH}"
export CPLUS_INCLUDE_PATH="path/to/boost_install/include:${CPLUS_INCLUDE_PATH}"     
export BOOST_ROOT='path/to/boost_install'
```
Then, follow the description above (without loading the boost module).

You can also try not installing Boost, but directly using the `path/to/boost_source/libs` and `path/to/boost_source/boost` directories instead.

##### PETSc

There are some available versions of PETSc. You might want to pick one of them and install preCICE. In our case, the available versions are unfortunately not compatible with our (above) chosen MPI version and the compilation fails. Hence, we install our own PETSc version: 
```bash
git clone -b maint https://bitbucket.org/petsc/petsc petsc
```
PETSc depends on BLAS and LAPACK. You could either download the LAPACK tar ball, which includes also BLAS from their [webpage](http://www.netlib.org/lapack/) or you let PETSc download and compile it automatically, which is shown below.

The PETSc `configure` script will fail on the login nodes, (probably) since MPI is disabled. Hence, you need to start an interactive job, before you run the script. Details on how to do this can be found on the [LRZ documentation](https://doku.lrz.de/display/PUBLIC/Running+parallel+jobs+on+the+Linux-Cluster).

If you login through lxlogin5 (CooLMUC2), you could do
```bash
salloc --ntasks=12
```
As mentioned above, we want to use `mpi.intel/2018_gcc`. You may get an error message if you run the configuration script without specifying the `mpi-dir`. If you use another version, you can look it up with `module show` under `I_MPI_ROOT`. Then, run the `configure` script and follow the instructions:
```bash
./configure --with-mpi-dir=/lrz/sys/intel/studio2018_p4/impi/2018.4.274 --download-fblaslapack=1
```
You may additionally specify a `--prefix` for the target directory. Then, you just need to set `PETSC_DIR= prefix`.
If you don't specify it, you need to set `PETSC_DIR=/path/to/petsc` and `PETSC_ARCH`. Additionally, export your paths:
```bash
export LD_LIBRARY_PATH=$PETSC_DIR/$PETSC_ARCH/lib:$LD_LIBRARY_PATH
export CPATH=$PETSC_DIR/include:$PETSC_DIR/$PETSC_ARCH/include:$CPATH
export LIBRARY_PATH=$PETSC_DIR/$PETSC_ARCH/lib:$LIBRARY_PATH
export PYTHONPATH=$PETSC_DIR/$PETSC_ARCH/lib
```
Afterwards, you could follow the usual building instructions: 
```bash
mkdir build && cd build
CC=mpicc CXX=mpicxx cmake -DPETSC=ON -DPYTHON=OFF -DCMAKE_INSTALL_PREFIX=/path/to/precice/installation -DCMAKE_BUILD_TYPE=Release ../..
make -j 12
make install
```

#### Run tests
Since the preCICE tests also need MPI, you need to start an interactive job as described above:
```bash
salloc --ntasks=12
cd $SCRATCH/precice/build
ctest
```
Don't forget to source your paths and modules, if you don't specify them in your `.bashrc`.

Another option is the usage of a jobscript. An example might look like this:
```bash
#!/bin/bash
#SBATCH -o $SCRATCH/clusteroutput.out 
#SBATCH -D $SCRATCH
#SBATCH -J precice_tests 
#SBATCH --get-user-env 
#SBATCH --clusters=mpp2
#SBATCH --ntasks=28 
#SBATCH --mail-type=end 
#SBATCH --mail-user=examplemail@domain.de 
#SBATCH --export=NONE 
#SBATCH --time=08:00:00 
source /etc/profile.d/modules.sh
cd $SCRATCH/
source modules.txt
cd $SCRATCH/precice/build
ctest
```
#### Run simulations

For running coupled simulations the user can launch both the solvers from a single job script, for example:
```bash
mpirun -np 4 ${Solver1} -parallel -case ${Participant1} > ${Participant1}.log 2>&1 &
mpirun -np 4 ${Solver2} -parallel -case ${Participant2} > ${Participant2}.log 2>&1 &
```
Alternatively the user can write a `Allrun_parallel` then the script can be directly launched from the job script.

More information about running parallel jobs on this cluster can be found on the [LRZ documentation](https://doku.lrz.de/display/PUBLIC/Running+parallel+jobs+on+the+Linux-Cluster). 

Start the job with `sbatch name_of_jobscript.job`.

### Notes on OpenFOAM

There are several OpenFOAM versions available. The complete list can be found in the directory `/lrz/sys/applications/OpenFOAM`. In order to load one specific version, source the `bashrc` file. In this example, we use OpenFOAM -v1812+.impi.gcc. This corresponds to our used MPI version `mpi.intel/2018_gcc`. To source the OpenFOAM environment, run:
```bash
source /lrz/sys/applications/OpenFOAM/OpenFOAM-v1812+.impi.gcc/OpenFOAM-v1812/etc/bashrc_impi.gcc_dbg
```

For the OpenFOAM adapter, yaml-cpp is needed. As mentioned above, you probably get linking errors for yaml-cpp >= 0.6. Hence, we [download version 0.5.3](https://github.com/jbeder/yaml-cpp/archive/release-0.5.3.tar.gz) and [copy it to the cluster](https://www.lrz.de/services/compute/ssh/). Then, run
```bash
tar -xzvf yaml-cpp-yaml-cpp-0.5.3.tar.gz
cd yaml-cpp-yaml-cpp-0.5.3
mkdir build && cd build
cmake -DBUILD_SHARED_LIBS=ON -DCMAKE_INSTALL_PREFIX=path/to/install/target ..
make -j 12
make install
```
You need to add the target to your `LD_LIBRARY_PATH`. Afterwards, compile the adapter as described in the [building instructions](https://github.com/precice/openfoam-adapter/wiki/Building).

##### Installing the Python Bindings for Python 2.7.13

<details><summary>Guide to installing the Python bindings for 2.7.13 (...)</summary>
<p>
<!-- We need the above p tag and a line break before we start formatting -->

This guide provides steps to install python bindings for precice-1.6.1 for the default Python 2.7.13 on the CoolMUC. Note that preCICE no longer supports Python 2 after v1.4.0. Hence, some modifications to the python setup code was necessary. Most steps are similar if not identical to the basic guide without petsc or python above. This guide assumes that the Eigen dependencies have already been installed.

Load the prerequisite libraries:
```bash
module load gcc/7
module unload mpi.intel
module load mpi.intel/2018_gcc
module load cmake/3.12.1
```
At the time of this writing `module load boost/1.68.0` is no longer available. Instead
boost 1.65.1 was installed per the `boost and yaml-cpp` guide above. 
```bash
mkdir build && cd build
cmake -DBUILD_SHARED_LIBS=ON -DPETSC=OFF -DPYTHON=OFF -DCMAKE_INSTALL_PREFIX=/path/to/precice/installation -DCMAKE_BUILD_TYPE=RelWithDebInfo ..
make -j 12
make install
```

After installing, make sure you add the preCICE installation paths to your `.bashrc`, so that other programs can find it:
```bash
export PRECICE_ROOT="path/to/precice_install"
export PKG_CONFIG_PATH="path/to/precice_install/lib/pkgconfig:${PKG_CONFIG_PATH}"
export CPLUS_INCLUDE_PATH="path/to/precice_install/include:${CPLUS_INCLUDE_PATH}"
export LD_LIBRARY_PATH="path/to/precice_install/lib:${LD_LIBRARY_PATH}"
```

Ensure that pip is installed. If not, install pip for the local python version:
```bash
wget https://bootstrap.pypa.io/get-pip.py
module load python/2.7_intel
python get-pip.py --user
```
Install the future library
```bash
python -m pip install future --user
```
Then, navigate to the python_future bindings script.
```bash
cd /path/to/precice/src/precice/bindings/python_future/setup.py
```
Open the `setup.py` installation script and make the following modifications. Firstly, append the following to the head of the file to allow Python2 to run Python3 code. Note that
importing `unicode_literals` from `future` will cause errors in `setuptools` methods as string literals 
in code are interpreted as `unicode` with this import.
```py
from __future__ import (absolute_import, division,
                        print_function)
from builtins import (
         bytes, dict, int, list, object, range, str,
         ascii, chr, hex, input, next, oct, open,
         pow, round, super,
         filter, map, zip)
import numpy
```
Modify `mpicompiler_default = "mpic++"` to `mpicompiler_default = "mpicxx"` in line ~100-102.
Run the setup file using the default Python 2.7.13.

Add the numpy headers to the Extension to ensure that Numpy headers are detectable when loading precice
Update lines ~80-100
```py
        Extension(
                APPNAME,
                sources=bindings_sources,
                libraries=[],
                include_dirs=[numpy.get_include()],
                language="c++",
                extra_compile_args=compile_args,
                extra_link_args=link_args
            ),
        Extension(
                "test_bindings_module",
                sources=test_sources,
                libraries=[],
                include_dirs=[numpy.get_include()],
                language="c++",
                extra_compile_args=compile_args,
                extra_link_args=link_args
            )
```
Then run the setup script to install the bindings
```bash
python setup.py install --user
```
</p>
</details>

### Hazel Hen (Cray/Intel, Stuttgart)

:warning: This page needs updates for preCICE v2 :warning:

### Hazel Hen

#### Building 

##### Modules
```bash
module swap PrgEnv-cray PrgEnv-gnu
module load cray-python/3.6.1.1
module load cray-petsc # if distributed RBF are used.
module load tools/boost/1.66.0
```
##### Other dependencies

###### Eigen
Install Eigen and set the variables as described in [Dependencies](https://github.com/precice/precice/wiki/Dependencies#eigen).

###### PETSc
Just load the module and use `petsc=on` for compilation: `module load cray-petsc`

##### Compilation
You **must** use `platform=hazelhen` for compilation.
```bash
scons petsc=on python=off compiler=CC platform=hazelhen
```

#### Executing
##### aprun
`aprun` is used instead of `mpirun`. However, you can execute only one `aprun` per node, i.e. for two aprun calls you must reserve at least two nodes.

##### Network Interface
Use `ipogif0` for socket communication.


### Cartesius (Dutch national supercomputer)

#### modules and environment
```sh
module unload compilerwrappers
module load Boost/1.65.1-foss-2017b-Python-2.7.14 blas/netlib/gnu lapack/netlib/gnu

export PETSC_DIR=
export PETSC_ARCH=arch-linux
export PRECICE_ROOT=
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:$SURFSARA_LIBRARY_PATH:$PETSC_DIR/$PETSC_ARCH/lib:$PRECICE_ROOT/build
export LIBRARY_PATH=$LIBRARY_PATH:$LD_LIBRARY_PATH
export CPATH=$CPATH:$SURFSARA_INCLUDE_PATH:$PRECICE_ROOT/src
export PATH=$PATH:/hpc/eb/RedHatEnterpriseServer7/CMake/3.12.1-GCCcore-6.4.0/bin
```

Set `PETSC_DIR` and `PRECICE_ROOT` as locations where you want to build PETSc and preCICE, respectively.

#### PETSc
The author built PETSc because available modules are built using intel compilers and the author didn't try those out.
Extract PETSc into `$PETSC_DIR` and from there,
```sh
./configure --with-shared-libraries
make all test
```

#### preCICE
From `$PRECICE_ROOT`,
```sh
mkdir build && cd build
CXX=mpicxx cmake -DBUILD_SHARED_LIBS=ON -DCMAKE_BUILD_TYPE=Release -DEIGEN3_INCLUDE_DIR:String=/hpc/sw/eigen-3.3.3-intel/include/eigen3 ..
make
```

For linking other projects (and python module below), `libprecice.so` is in `$PRECICE_ROOT/build` and header files are in `$PRECICE_ROOT/src`. These variables are added to `LD_LIBRARY_PATH`, `LIBRARY_PATH`, and `CPATH` already in the first section.

For the python parts,
```sh
cd $PRECICE_ROOT/src/precice/bindings/python
python setup.py build
python setup.py install --user
```


## Archived systems


### SuperMUC (Lenovo/Intel, Munich)


:warning: This page needs updates for preCICE v2 :warning:

:information_source: SuperMUC was shut down in 2019. This page may still be useful for other clusters. See also the instructions for [SuperMUC-NG](SuperMUC-NG).

### Building with CMake

#### Build

Building preCICE on SuperMUC or other LRZ systems is very similar to building it locally. The main differences are that we can easily get most of the dependencies through the module system.

##### Basic building (without Python)

You may build preCICE without PETSc or Python and still use most of its features. See also the [general build instructions](Get-preCICE).

(1) Load some modules (or directly put them in your `.bashrc`)
```bash
module load gcc/6
module swap mpi.ibm mpi.intel/5.1
module load petsc/3.8
module load boost/1.65_gcc
export BOOST_ROOT=$BOOST_BASE
``` 

(2) Get Eigen: [Download the latest version of Eigen](http://eigen.tuxfamily.org/index.php?title=Main_Page) and copy it to SuperMUC. Specify the path in your `.bashrc`, e.g. 
```
export EIGEN3_ROOT="$HOME/eigen3"
```

* Don't only get the `eigen/Eigen` folder, copy the complete archive. 
* Don't copy it to your `precice/src`, copy it to a separate directory (e.g. `eigen3`)

(3) Get cmake. The newest version on SuperMUC (3.8) is, unfortunately, too old. We need >= 3.10.2. [Download the latest stable version](https://cmake.org/download/) and copy it to SuperMUC. Then, e.g. 
```bash
tar -xzvf cmake-3.13.4.tar.gz
./bootstrap
make -j28
export PATH=$PATH:$HOME/cmake-3.13.4/bin
```

(4) Build preCICE. In the root directory of preCICE:
```bash
mkdir build/no_python
cd build/no_python
CXX=mpicxx cmake -DPYTHON=OFF -DCMAKE_BUILD_TYPE=Release ../..
make -j28
```

##### Without PETSc

```bash
mkdir build/no_petsc_no_python
cd build/no_petsc_no_python
CXX=mpicxx cmake -DPETSC=OFF -DPYTHON=OFF -DCMAKE_BUILD_TYPE=Release ../..
make -j28
```

##### Python

So far, we did not get Python to work. Please let us know if you do. 

#### Run tests

Use the job system, to run the tests. Get a [standard job script](https://www.lrz.de/services/compute/supermuc/loadleveler/examples_haswell_nodes/) and run:

```bash
#!/bin/bash
#@ wall_clock_limit = 00:30:00
#@ job_type = MPICH
#@ job_name = Tests
#@ class = test
#@ island_count = 1,1
#@ network.MPI = sn_all,not_shared,us
#@ node = 1
#@ tasks_per_node = 28
#@ output = $(job_name).out
#@ error = $(job_name).err
#@ initialdir = $(home)/precice/build/no_python
#@ energy_policy_tag = my_energy_tag
#@ minimize_time_to_solution = yes
#@ queue
. /etc/profile
. /etc/profile.d/modules.sh

ctest 
```

#### Run simulations

When using socket communication on SuperMUC (as well as other LRZ clusters), it is important to specify in the [preCICE configuration file]() that the communication should happen through the Infiniband network (`network="ib0"`), instead of the local network (`network="lo"`). 


### MAC Cluster (various architectures, Munich)


:warning: This page needs updates for preCICE v2 :warning:

:information_source: The MAC Cluster was shut down in 2018. However, these instructions may also be useful for users of other HPC systems.

#### General Information
Read first some information about the [MAC-Cluster](http://www.mac.tum.de/wiki/index.php/MAC_Cluster) and about [Running parallel jobs with SLURM](https://www.lrz.de/services/compute/linux-cluster/batch_parallel/).

You may allocate an interactive shell like this: 

```salloc --partition=snb --ntasks=1 --cpus-per-task=32```

Then you can run your executable in the interactive shell: e.g. 

```mpiexec.hydra -ppn 1 -n 1 ./executable parameters ...```

Note that each node has 16 physical resp. 32 virtual cores. This means that the following combinations should be applied for scaling tests (to always reserve full nodes): (salloc ntasks, salloc cpus-per-task, mpiexec ppn, mpiexec n): (1,32,1,1), (2,16,2,2), (4,8,4,4), (8,4,8,8), (16,2,16,16), (32,2,16,32), (64,2,16,64), ...

#### Building preCICE
To build preCICE on the MAC Cluster you may follow the same [instructions for building for SuperMUC](SuperMUC).
In SCons you need to set `platform=supermuc` also in the case of the MAC Cluster. Note that, in contrast to SuperMUC, you can access GitHub from the MAC Cluster.

You should build preCICE on the login node of the MAC Cluster partition that you are going to use.

#### Running the tests
In order to run the tests, [the same instructions as for SuperMUC](SuperMUC) apply. After you load the correct modules, you may execute the tests in a compute node, from your `PRECICE_ROOT` directory:

```bash
salloc --partition=snb --ntasks=1 --cpus-per-task=32
srun ./tools/compileAndTest.py -t
exit
```

**Note:** Before preCICE v1.1.0, the `-t` option was named `-b`.


### MareNostrum (Lenovo/Intel, Barcelona)


:warning: This page needs updates for preCICE v2 :warning:

#### Build

See also the [general build instructions](Building).

* To be put in your .bashrc: 

```bash
module load python  #needed by scons
module unload intel
module load gcc/4.8.2
module switch openmpi impi
export PRECICE_BOOST_ROOT=$HOME/software/boost_1_53_0
```
* copy boost_1_53_0 to `software` (no installation needed!)
* copy `Eigen` to `src` (just as usual)
* `scons petsc=off python=off compiler=mpicxx build=release platform=supermuc -j32`

#### ALYA
* you have to further `module load intel` (but only once preCICE is compiled)
* configure ALYA with `-L[PathToPreCICE]/build/last -lprecice -lstdc++ -lrt`
* for running: also put `module load intel` in your jobscript
* use `network="ib0"` for sockets communication beyond one node
 
