---
title: Building from source - Troubleshooting
permalink: installation-source-troubleshooting.html
keywords: configuration, basics, cmake, installation, building, source
---

## Troubleshooting

### Finding Boost

* Boost versions prior to 1.70.0 use the [`FindBoost` module](https://cmake.org/cmake/help/latest/module/FindBoost.html). For custom install prefixes, set the `BOOST_ROOT=/path/to/prefix` CMake option or environment variable.
* Boost version 1.70.0 and later ship with their own config module, which you can find in `<prefix>/lib/cmake/Boost-x.xx.x/`. To detect it in custom prefixes, set the `Boost_DIR=<prefix>/lib/cmake/Boost-x.xx.x/`. Have a look at `<prefix>/lib/cmake/Boost-x.xx.x/BoostConfig.cmake` for additional options.

### Finding Python and NumPy

The NumPy detection is directly connected to the detected python interpreter.
The easiest solution to force CMake to use a python installation is to set the CMake Variable `PYTHON_EXECUTABLE` when configuring preCICE for the first time.
This is also the method of choice when using a [virtual environment](https://docs.python.org/3/library/venv.html#venv-def) or `pyenv`.

Example:

```bash
cmake -DPRECICE_PythonActions=ON -DPYTHON_EXECUTABLE=/usr/bin/python3.8 .
```

### PETSc could not be found

Note: PETSc is an optional dependency, only needed for parallel RBF mapping, which you can switch off. Since preCICE v2.1.0, single-node-parallel RBF mapping is also possible without PETSc.

There are multiple problems than can lead to FindPETSc failing:

1. `PETSC_DIR`and `PETSC_ARCH` not set, or set incorrectly.  
   In this case, FindPETSc fails **before** running tests.
2. _Pre 1.5.0:_ Compiler CXX not set to the compiler wrapper provided by your MPI distribution.  
   In this case, FindPETSc fails **after** running tests.

Find more regarding PETSc-related issues on [our forum](https://precice.discourse.group/tag/petsc).

#### Tests fail

The end of your log output looks like this:

```log
-- petsc_lib_dir /.../.../.../petsc/arch-linux2-c-debug/lib
-- Recognized PETSc install with single library for all packages
-- Performing Test MULTIPASS_TEST_1_petsc_works_minimal
-- Performing Test MULTIPASS_TEST_1_petsc_works_minimal - Failed
-- Performing Test MULTIPASS_TEST_2_petsc_works_allincludes
-- Performing Test MULTIPASS_TEST_2_petsc_works_allincludes - Failed
-- Performing Test MULTIPASS_TEST_3_petsc_works_alllibraries
-- Performing Test MULTIPASS_TEST_3_petsc_works_alllibraries - Failed
-- Performing Test MULTIPASS_TEST_4_petsc_works_all
-- Performing Test MULTIPASS_TEST_4_petsc_works_all - Failed
-- PETSc could not be used, maybe the install is broken.
CMake Error at /.../.../.../.../cmake/share/cmake-3.10/Modules/FindPackageHandleStandardArgs.cmake:137 (message):
  PETSc could not be found.  Be sure to set PETSC_DIR and PETSC_ARCH.
  (missing: PETSC_EXECUTABLE_RUNS) (found suitable version "3.10.2", minimum
  required is "3.12")
Call Stack (most recent call first):
  /.../.../.../.../cmake/share/cmake-3.10/Modules/FindPackageHandleStandardArgs.cmake:378 (_FPHSA_FAILURE_MESSAGE)
  tools/cmake-modules/FindPETSc.cmake:343 (find_package_handle_standard_args)
  CMakeLists.txt:60 (find_package)

-- Configuring incomplete, errors occurred!
See also "/.../.../CMakeFiles/CMakeOutput.log".
See also "/.../.../CMakeFiles/CMakeError.log".
```

In this case the library, includes, etc. were found, however, the tests do not compile.
Check that the compiler is set to the compiler wrapper provided by your MPI distribution (e.g. with `CXX=mpicxx cmake [options]`). You may need to delete and recreate the `build` directory.
For further information check the log file `./CMakeFiles/CMakeError.log` for the error thrown by the compiler invocation.

This is fixed in preCICE v1.5.0. Please let us know if you still get this error.

#### No tests run

The end of your log output looks like this:

```log
CMake Error at /.../.../.../.../cmake/share/cmake-3.10/Modules/FindPackageHandleStandardArgs.cmake:137 (message):
  PETSc could not be found.  Be sure to set PETSC_DIR and PETSC_ARCH.
  (missing: PETSC_INCLUDES PETSC_LIBRARIES PETSC_EXECUTABLE_RUNS) (Required
  is at least version "3.12")
Call Stack (most recent call first):
  /.../.../.../.../cmake/share/cmake-3.10/Modules/FindPackageHandleStandardArgs.cmake:378 (_FPHSA_FAILURE_MESSAGE)
  tools/cmake-modules/FindPETSc.cmake:343 (find_package_handle_standard_args)
  CMakeLists.txt:60 (find_package)


-- Configuring incomplete, errors occurred!
See also "/.../.../CMakeFiles/CMakeOutput.log".
See also "/.../.../CMakeFiles/CMakeError.log".
```

In this case, the FindPETSc module cannot locate PETSc.

* Check the values of `PETSC_DIR` and `PETSC_ARCH`.
* Make sure `ls $PETSC_DIR/$PETSC_ARCH/include` does not result in an error.
