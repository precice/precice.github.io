---
title: Special systems
permalink: installation-special-systems.html
keywords: installation, building, dependencies, spack, cluster, supercomputer
tocheaders: h2,h3
---

<!-- markdownlint-configure-file {"MD024": { "siblings_only": true } } -->

This page contains instructions for building preCICE on special systems, being clusters and supercomputers.

The systems in the [archived section](#archived-systems) are no longer operational.
The instructions may still be valuable for unlisted systems.

{% note %}
We encourage users to actively contribute to this page! If your system is not listed, please feel encouraged to add instructions for it!
{% endnote %}

## Active systems

### HAWK (HPE Apollo/AMD, Stuttgart)

#### Building

The following steps explain how to install preCICE on HAWK with PETSc and MPI using the system standard [HPE MPI](https://kb.hlrs.de/platforms/index.php/MPI(Hawk)) implementation:

(1) [Download Eigen](http://eigen.tuxfamily.org/index.php?title=Main_Page) and copy it to HAWK. Afterwards export the `EIGEN3_ROOT`, e.g.,

```bash
export EIGEN3_ROOT="$HOME/precice/eigen"
```

(2) Load available modules:

```bash
module load cmake boost petsc/<VERSION>-int32-shared
```

{% note %}
libxml2 is part of the `-devel` packages, which are loaded by default on the login nodes. The compute nodes run in a diskless mode in order to save RAM. Therefore, make sure to use the login nodes for building purposes.
{% endnote %}

(3) Build preCICE. For PETSc, the library path and include path need to be defined explicitly:

```bash
cmake -DBUILD_SHARED_LIBS=ON -DCMAKE_BUILD_TYPE=Debug -DCMAKE_INSTALL_PREFIX="my/install/prefix" -DPRECICE_PETScMapping=ON -DPETSc_INCLUDE_DIRS="$PETSC_DIR/include" -DPETSc_LIBRARIES="$PETSC_DIR/lib/libpetsc.so" -DPRECICE_PythonActions=OFF /path/to/precice/source

make install -j 16
```

Usually, both variables, `PETSc_LIBRARIES` and `PETSc_INCLUDE_DIRS` are supposed to be found by `cmake`. This detection mechanism fails on Hawk and therefore we have to specify these variables on the command line. The reason for the detection mechanism to fail is unclear. It might be causes by our PETSc detection mechanism or might be an issue with the cluster. If you find a more native way to use the PETSc installation provided on Hawk, please update this documentation. The PETSc module, where this issue occurred, was `petsc/3.12.2-int32-shared`.

{% note %}
In order to run the tests, you need to enable spawn capable MPI runs by specifying the global MPI universe size. This can be done by configuring `cmake` with the additional argument `-D MPIEXEC_NUMPROC_FLAG=\"-up;4;-np\"` (environment variables can be exported as an alternative). All tests apart from the parallel integration test (which probably fails due to improper network specification) should pass afterwards. In order to run MPI spawn capable simulations (required for IQN-IMVJ, but not IQN-ILS) you need to specify the global MPI universe size using the `-up` flag as well, e.g., `mpirun -up 64 -np 32 ./my_solver arg1`
{% endnote %}

#### Running on a single node

Simulations on a single node are possible, but you explicitly need to specify the hardware. Otherwise, the MPI jobs are executed on the same cores, which will slow down the whole simulation due to migration significantly. In order to run the a coupled simulation on a single node with 8 ranks, use the following command:

```bash
mpirun -np 4 omplace -nt 1 ./exec1 args &
mpirun -np 4 omplace -b 4 -nt 1 ./exec2 args2
```

The `nt` argument specifies the number of threads each rank uses. Since we don't want to use multi-threading, we select just a single thread per core. The argument option `-b` specifies the starting CPU number for the effective CPU list, so that we shift the starting number of CPU list in the second participant by the cores employed for the first participant. In our case we want to use 4 ranks/cores for each participant. There are further options to specify the hardware. Have a look at `omplace` using `man omplace` or the [hardware pinning](https://kb.hlrs.de/platforms/index.php/Batch_System_PBSPro_(Hawk)#Pinning) documentation for more information.

#### Notes on deal.II

`METIS` is preinstalled and can be loaded via the module system. In case that the preCICE modules above are loaded, `METIS` will already be loaded as a dependency of PETSc. However, in order to install deal.II with `METIS` support, you additionally need to enable a support for `LAPACK` (`DEAL_II_WITH_LAPACK=ON`) in the deal.II installation. In order to use `LAPACK` on Hawk, you can load the module `libflame`.

Additional dependencies of deal.II, such as `TRILINOS`, are available through module system and can be loaded accordingly. You can get obtain the a full list of preinstalled software on Hawk using the command `module avail`.

#### Notes on OpenFOAM

OpenFOAM is available on the system. You may want to call `module avail openfoam` for a complete overview of preinstalled OpenFOAM versions.

### SuperMUC-NG (Lenovo/Intel, Munich)

Login: [LRZ page](https://doku.lrz.de/display/PUBLIC/Access+and+Login+to+SuperMUC-NG)

#### Available Modules

The LRZ provides a precice modules since 28. June 2021.
These are built with PETSc as well as MPI using both GCC and the Intel compiler.

To display all precice modules:

```bash
module avail precice
```

Load using:

```bash
module load precice
```

#### Building

(1) [Download Eigen](http://eigen.tuxfamily.org/index.php?title=Main_Page) and copy it to SuperMUC. Put in your `.bashrc`.

```bash
export EIGEN3_ROOT="$HOME/Software/eigen3"
```

(2) [Download latest boost](https://www.boost.org/), copy it to SuperMUC and build yourself:

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
<!-- Long code blocks need to be split. See https://github.com/precice/precice.github.io/commit/74e377cece4a221e00b5c56b1db3942ec70a6272 -->
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

#### Get preCICE

You can use preCICE on the [LRZ Linux Cluster](https://doku.lrz.de/display/PUBLIC/Linux+Cluster) (here CooLMUC2) by building it from source or use the provided module (since June 2021).

##### Use the preCICE module

Make sure that the module `spack/21.1.1` (or newer) is loaded. Checking via `module list` should give you an output similar to:

```bash
Currently Loaded Modulefiles:
 1) admin/1.0   2) tempdir/1.0   3) lrz/1.0   4) spack/21.1.1
```

If `spack/21.1.1` is not loaded. Run `module load spack/21.1.1` first.

`module av precice` shows you the available preCICE modules. You can load preCICE by running `module load precice/2.2.0-gcc8-impi` or `module load precice/2.2.0-intel19-impi`. Make sure to also load the required compiler and MPI. E.g.:

```bash
module load gcc/8 intel-mpi/2019-gcc  # we need the gcc compiler for FEniCS
module load precice/2.2.0-gcc8-impi
```

This gives on `module list`:

```bash
Currently Loaded Modulefiles:
 1) admin/1.0   2) tempdir/1.0   3) lrz/1.0   4) spack/21.1.1   5) gcc/8.4.0   6) intel-mpi/2019-gcc   7) precice/2.2.0-gcc8-impi
```

**Note:** If you want to use FEniCS (see below), please stick to GCC from the very beginning.

##### Building with CMake

{% warning %}
This page needs updates for preCICE v2 and the module system rolled out on CooLMUC in June 2021
{% endwarning %}

If you load modules for any preCICE related installation, make sure the used MPI versions are consistent. This is also relevant for any solver you want to couple with preCICE. Therefore, it might be helpful to have a look in your solvers module installation before you start compiling preCICE. You can use `module show` to get information about specific modules.

**since June 2021 most dependencies below (PETSc, Python, Boost) are available through the module system. Feel free to use these modules, if you want to build preCICE from source and update this section.**

###### Basic building (without PETSc or Python)

Most of the necessary dependencies for a basic building are available via modules. We use here `mpi.intel/2018_gcc` for the MPI dependency as an example, since we later load an OpenFOAM module, which needs this MPI version.

```bash
module load gcc/7
module load mpi.intel/2018_gcc
module load boost/1.68.0 # Read below if you need yaml-cpp
module load cmake/3.12.1
```

Before running the command `module load mpi.intel/2018_gcc` the user has to run `module unload mpi.intel` to unload the preloaded mpi version.
Steps for the Eigen dependency are described in the [wiki page for SuperMUC](installation-special-systems.html#supermuc-ng-lenovointel-munich). Afterwards, follow the usual [building instructions for CMake](https://precice.org/installation-source-preparation.html):

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

If you want to install a solver/adapter which depends on **yaml-cpp** (e.g. OpenFOAM adapter or CalculiX adapter), its compilation will probably lead to linking errors for yaml-cpp versions >= 0.6. Since a yaml-cpp < 0.6 requires boost < 1.67 and preCICE needs at least a boost version >= 1.65.1, we need to compile Boost from source. Therefore, download the desired (in your case 1.65.1) boost version from the [boost version history](https://www.boost.org/users/history/) and [copy it to the cluster](https://doku.lrz.de/display/PUBLIC/Access+and+Login+to+the+Linux-Cluster#AccessandLogintotheLinuxCluster-AccessviaSecureShell).

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

###### PETSc

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

##### If you are using the preCICE module

Testing the module is not necessary. You can still clone the preCICE repository and run the solverdummies, if you want to make sure:

```bash
git clone https://github.com/precice/precice.git
cd precice/examples/solverdummies/cpp/
cmake .
make
salloc --ntasks=1  # needed due to MPI
./solverdummy ../precice-config.xml SolverOne & ./solverdummy ../precice-config.xml SolverTwo
```

##### If preCICE was build from source

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

#### Installing the Python bindings for Python 3 (with conda)

##### Preparing an environment

We will use conda for all python-related dependencies. Start with

```bash
module load anaconda3/2019.10
```

Now create an environment (here named `pyprecice`)

```bash
conda create -n pyprecice
```

If you are using conda the first time, then `$ conda activate pyprecice` might not work. Run `conda init bash`. Exit session end enter it again. Try again:

```bash
(base) $ conda activate pyprecice
(pyprecice) $
```

The brackets before the `$` indicate the active environment.

##### Installing the Python bindings

We first activate the environment and install some dependencies via conda:

```bash
(base) $ conda activate pyprecice
(pyprecice) $ git clone https://github.com/precice/python-bindings.git
(pyprecice) $ cd python-bindings
(pyprecice) $ git checkout v2.2.0.2  # if you want to use a release and not the develop version
(pyprecice) $ conda install cython numpy mpi4py
```

Then install the bindings:

```bash
(pyprecice) $ python setup.py install
```

##### Testing

Again, you can test your installation by running the solverdummy:

```bash
(pyprecice) $ salloc --ntasks=1
(base) $ conda activate pyprecice
(pyprecice) $ cd solverdummy
(pyprecice) $ python3 solverdummy.py precice-config.xml SolverOne & python3 solverdummy.py precice-config.xml SolverTwo
```

**Note:** after `salloc` you have to switch to the correct environment!

#### Installing FEniCS and fenicsprecice

##### Picking the right compiler and mpi implementation

Since FEniCS only support GCC, we will have to first unload the intel compiler and load gcc:

```bash
module unload intel-mpi/2019-intel intel/19.0.5
module load gcc/8 intel-mpi/2019-gcc
module load precice/2.2.0-gcc8-impi
```

##### Install FEniCS

We will again use conda and continue using the environment `pyprecice` from above:

```bash
(base) $ conda activate pyprecice
(pyprecice) $ conda install -c conda-forge fenics
```

You can do a quick test:

```bash
(pyprecice) $ python
Python 3.7.10 (default, Jun  4 2021, 14:48:32)
[GCC 7.5.0] :: Anaconda, Inc. on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> import fenics
>>> fenics.Expression("x[0] + x[1]", degree=0)
```

You might run into an error similar to this one:

```bash
In file included from /dss/dsshome1/lxc0E/ga25zih2/.conda/envs/fenicsproject/include/eigen3/Eigen/Core:96,
                 from /dss/dsshome1/lxc0E/ga25zih2/.conda/envs/fenicsproject/include/eigen3/Eigen/Dense:1,
                 from /dss/dsshome1/lxc0E/ga25zih2/.conda/envs/fenicsproject/include/dolfin/function/Expression.h:26,
                 from /gpfs/scratch/pr63so/ga25zih2/ga25zih2/tmpdtucmkcr/dolfin_expression_523698ac7e42b5ce64e60789704de9c6.cpp:13:
/dss/dsshome1/lrz/sys/spack/release/21.1.1/opt/x86_64/intel/19.0.5-gcc-uglchea/include/complex:305:20: note: field 'std::complex<double>::_ComplexT std::complex<double>::_M_value' can be accessed via 'constexpr std::complex<double>::_ComplexT std::complex<double>::__rep() const'
  305 |         return __x._M_value / __y;
```

Make sure to use `gcc`, not the intel compiler. Check via `module list`. If necessary `module unload intel...` and `module load gcc...`.

##### Install fenicsprecice

We will build fenicsprecice from source:

```bash
(base) $ conda activate pyprecice
(pyprecice) $ git clone https://github.com/precice/fenics-adapter.git
(pyprecice) $ cd fenics-adapter
(pyprecice) $ git checkout v1.1.0
(pyprecice) $ python3 setup.py install
```

For testing, please clone the tutorials and try to run them:

```bash
(pyprecice) $ git clone https://github.com/precice/tutorials.git
(pyprecice) $ cd tutorials
(pyprecice) $ git checkout v202104.1.1
(pyprecice) $ cd tutorials/partitioned-heat-conduction/fenics
(pyprecice) $ salloc --ntasks=1
(base) $ conda activate pyprecice
(pyprecice) $ ./run.sh -d & ./run.sh -n
```

**Quick-path to the tutorials:**

Run this, if you log in and everything has already been prepared as described above:

```bash
module unload intel-mpi/2019-intel intel-mkl/2019 intel/19.0.5
module load gcc/8 intel-mpi/2019-gcc precice/2.2.0-gcc8-impi
source activate pyprecice
```

### Cartesius (Dutch national supercomputer)

#### modules and environment

```bash
module load 2020
module load CMake/3.16.4-GCCcore-9.3.0 PETSc/3.12.4-foss-2020a-Python-3.8.2 Eigen/3.3.9-GCCcore-9.3.0 ScaLAPACK/2.1.0-gompi-2020a
```

After loading these modules you can proceed with the `cmake` build steps for preCICE.

For python bindings,

```bash
CPATH=<PRECICE_DIR>/include/ pip install pyprecice
```

Replace `PRECICE_DIR` with the installation prefix used for preCICE. Also, make sure that preCICE libraries locations are in `LD_LIBRARY_PATH` and `LIBRARY_PATH`.

## Archived systems

### Hazel Hen (Cray/Intel, Stuttgart)

{% warning %}
This page needs updates for preCICE v2.
{% endwarning %}

#### Building on Hazel Hen

##### Modules on Hazel Hen

```bash
module swap PrgEnv-cray PrgEnv-gnu
module load cray-python/3.6.1.1
module load cray-petsc # if distributed RBF are used.
module load tools/boost/1.66.0
```

##### Other dependencies

###### PETSc on Hazel Hen

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

### SuperMUC (Lenovo/Intel, Munich)

{% warning %}
This page needs updates for preCICE v2.
{% endwarning %}

:information_source: SuperMUC was shut down in 2019. This page may still be useful for other clusters. See also the instructions for [SuperMUC-NG](SuperMUC-NG).

#### Building with CMake

##### Build

Building preCICE on SuperMUC or other LRZ systems is very similar to building it locally. The main differences are that we can easily get most of the dependencies through the module system.

##### Basic building (without Python)

You may build preCICE without PETSc or Python and still use most of its features. See also the [general build instructions](installation-source-preparation).

(1) Load some modules (or directly put them in your `.bashrc`)

```bash
module load gcc/6
module swap mpi.ibm mpi.intel/5.1
module load petsc/3.8
module load boost/1.65_gcc
export BOOST_ROOT=$BOOST_BASE
```

(2) Get Eigen: [Download the latest version of Eigen](http://eigen.tuxfamily.org/index.php?title=Main_Page) and copy it to SuperMUC. Specify the path in your `.bashrc`, e.g.

```bash
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

Use the job system, to run the tests. Get a standard job script and run:

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

When using socket communication on SuperMUC (as well as other LRZ clusters), it is important to specify in the preCICE configuration file that the communication should happen through the Infiniband network (`network="ib0"`), instead of the local network (`network="lo"`).

### MAC Cluster (various architectures, Munich)

{% warning %}
This page needs updates for preCICE v2.
{% endwarning %}

:information_source: The MAC Cluster was shut down in 2018. However, these instructions may also be useful for users of other HPC systems.

#### General Information

Read first some information about the MAC-Cluster (update: decommissioned) and about Running parallel jobs with SLURM (update: page unavailable).

You may allocate an interactive shell like this:

```salloc --partition=snb --ntasks=1 --cpus-per-task=32```

Then you can run your executable in the interactive shell: e.g.

```mpiexec.hydra -ppn 1 -n 1 ./executable parameters ...```

Note that each node has 16 physical resp. 32 virtual cores. This means that the following combinations should be applied for scaling tests (to always reserve full nodes): (salloc ntasks, salloc cpus-per-task, mpiexec ppn, mpiexec n): (1,32,1,1), (2,16,2,2), (4,8,4,4), (8,4,8,8), (16,2,16,16), (32,2,16,32), (64,2,16,64), ...

#### Building preCICE

To build preCICE on the MAC Cluster you may follow the same [instructions for building for SuperMUC](installation-special-systems.html#supermuc-lenovointel-munich).
In SCons you need to set `platform=supermuc` also in the case of the MAC Cluster. Note that, in contrast to SuperMUC, you can access GitHub from the MAC Cluster.

You should build preCICE on the login node of the MAC Cluster partition that you are going to use.

#### Running the tests

In order to run the tests, [the same instructions as for SuperMUC](installation-special-systems.html#supermuc-lenovointel-munich) apply. After you load the correct modules, you may execute the tests in a compute node, from your `PRECICE_ROOT` directory:

```bash
salloc --partition=snb --ntasks=1 --cpus-per-task=32
srun ./tools/compileAndTest.py -t
exit
```

**Note:** Before preCICE v1.1.0, the `-t` option was named `-b`.

### MareNostrum (Lenovo/Intel, Barcelona)

{% warning %}
This page needs updates for preCICE v2.
{% endwarning %}

#### Build

See also the [general build instructions](installation-source-preparation).

* To be put in your `.bashrc`:

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

### Max Planck Computing and Data Facility (MPCDF) Cobra cluster

#### Installing dependencies

##### Eigen3

See the [Eigen dependency section](https://precice.org/installation-source-dependencies.html#eigen) as Eigen is not available as a module on this cluster.

#### Installing preCICE

On the Cobra cluster, you can easily install preCICE from source. Clone the repository or copy the code to the cluster, set the installation prefix paths as shown [in this section](https://precice.org/installation-source-preparation.html#installation-prefix), and then run the following commands:

```bash
module purge
module load gcc/9 impi/2019.7 cmake/3.18 petsc-real boost/1.74
module list

rm -rf build
mkdir -p build && cd build
cmake -DBUILD_SHARED_LIBS=ON -DMPI_CXX_COMPILER=mpigcc -DCMAKE_BUILD_TYPE=Debug -DPRECICE_PythonActions=OFF ..
make -j
```
