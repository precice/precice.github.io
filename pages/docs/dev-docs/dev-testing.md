---
title: Running and writing tests
keywords: pages, development, tests
permalink: dev-docs-dev-testing.html
---

## Overview

Testing preCICE is not straight-forward as we need to run tests in a parallel environment.
Hence, we needed to customize some parts of the framework.
The main components form layers of executables.

| Component | What it does | How to run it |
| -- | --- | --- |
| CTest | Runs pre-defined tests | `make test` or `ctest` |
| MPI | Executes the test framework in parallel | `mpirun -n4 ./testprecice` |
| Boost.test | The framework used to implement the tests | `./testprecice --list_content` |
| TestContext | The code extension used to express test parallelism | |

There are generally three kinds of tests:

1. **Unit tests** that test individual units. These range from testing simple maths to testing complex parallel re-partitioning logic.
2. **Integration tests** that test complete setups of serial/parallel solvers running in serial/parallel. These are implemented primarily using configurations and API calls.
3. **Binary tests** that run binaries and check output and error code. This includes running solverdummies of different API languages as well as checking if `precice-tools version` actually prints something. The rest of the section doesn't refer to this kind of test.

## Preparation

`ctest` executes each test using MPI, which can take anything between 100ms to 1s to initialize.
For over 1000 tests, this results in at least 100s spend in `MPI_Init`.
To reduce the time to start, try to reduce the environment setup by fixing some components.
In most cases, you will only want to run the tests on a single node.

For OpenMPI, try using shared memory communication and the new ob1 pml.

```bash
export OMPI_MCA_btl=self,vader OMPI_MCA_pml=ob1
```

For MPICH, try switching the libfabric provider to the reference implementation:

```bash
export FI_PROVIDER=sockets
```

For Intel MPI using oneAPI, the `sockets` provider of the included libfabric can be unstable, but the tcp provider seems to be a good default.

```bash
export FI_PROVIDER=tcp
```

## Running

Use `ctest` (or `make test`) to run all tests in isolation using ctest or `mpirun -np 4 ./testprecice` to run them directly.
The latter is only useful for running individual tests in a debugger.

Tests in CTest are named `precice.` followed by the full test name of boost test.
To get a list of all tests for scripting purposes, use `./testprecice --list_units`.
CTest additionally groups tests in labels. Use `./testprecice --list_labels` to display existing labels.

Some important options for `ctest` are:

- `-j` to run tests in parallel, which is highly recommended
- `-R TestQN` to run all tests with name matching `TestQN`
- `-E MPI` to runs all tests with names not matching `MPI`
- `-L mapping` to runs all tests with labels matching `mapping`
- `-VV` show the test output
- `--output-on-failure` show the test output only if a test fails
- `--repeat until-pass:2` allow each test to run twice to pass
- `--rerun-failed` runs only tests that failed last time `ctest` was used

To run individual tests directly, run the test directly using `mpirun -np 4 ./testprecice`.
Use `-t TestSuite/Test` to run a specific test, or `-t TestSuite` to run all tests of a TestSuite.

Some important options for `./testprecice` are:

- `--list_content` to show all tests and test suites as a tree
- `--list_units` to list the full names of all tests
- `--report_level` or `-r` with options `confirm|short|detailed|no`
- `--run_test` or `-t` with a unit test filter.
- `--[no_]color_output` or `-x[bool]` to enable or disable colored output.
- `--log_level=<all|success|test_suite|unit_scope|message>` to control the verbosity. This defaults to the value of the ENV `BOOST_TEST_LOG_LEVEL`.

Usage examples:

- `mpirun -np 4 ./testprecice -x` runs boost test with colored output.
- `mpirun -np 4 ./testprecice -x` runs boost test with colored output.
- `mpirun -np 4 ./testprecice -x -r detailed -t "+/+PetRadial+"` (replace all + by *, due to Doxygen) runs all `PetRadial\*` tests from all test suites using colored output and detailed reporting.

Controlling verbosity:

The log level of the test executable sets the log level of preCICE.
This can be controlled using the environment variable `BOOST_TEST_LOG_LEVEL`.

This can be used to control the log level of tests run by CTest.

```console
export export BOOST_TEST_LOG_LEVEL=all
ctest -VV -R mapping
```

To integrate with custom tooling, use the output of `./testprecice --list_units`.
A good example is the following command, running each test in parallel and its own directory under `./run/#/`.
[GNU parallel](https://www.gnu.org/software/parallel/man.html) uses every line of the input (in our case tests) as a job, replaces `{#}` with the number of the job, and replaces `{}` with the job content. The file `jobs.log` contains all jobs and their exit codes.

```console
./testprecice --list_units | parallel --group --joblog jobs.log "mkdir -p 'run/{#}' && mpirun -wdir 'run/{#}' -n 4 ../../testprecice -t {}"
```

## Writing

To learn, how to write new unit tests, have a look at `src/testing/tests/ExampleTests.cpp`. Most of the rules below also apply to integration tests, but there are some important exceptions that you should keep in mind (see below).

Quick reference:

### Grouping tests

```cpp
BOOST_AUTO_TEST_SUITE(NameOfMyGroup)
BOOST_AUTO_TEST_SUITE_END()
```

### Starting tests

```cpp
BOOST_AUTO_TEST_CASE(NameOfMyTest)
{
  PRECICE_TEST(1_rank);
```

### preCICE test specification

Unit tests:

- Unit test case running on 1 rank: `PRECICE_TEST(1_rank);`
- Unit test case running on 2 ranks, with no intra-communication setup: `PRECICE_TEST(2_ranks);`
- Unit test case running on 2 ranks with intra-communication setup: `PRECICE_TEST(""_on(2_ranks).setupMasterSlaves());`
- Unit test case running on 2 ranks with intra-communication setup and events initialized: `PRECICE_TEST(""_on(2_ranks).setupMasterSlaves(), require::Events);`

Integrations tests:

- Integration test with Solver A on 1 rank and B on 2 ranks: `PRECICE_TEST("A"_on(1_rank), "B"_on(2_ranks));`
- Integration test with Solver A on 2 rank and B on 2 ranks: `PRECICE_TEST("A"_on(2_ranks), "B"_on(2_ranks));`
- Integration test with Solver A, B and C on 1 rank each: `PRECICE_TEST("A"_on(1_rank), "B"_on(1_rank), "C"_on(1_rank));`

### Test context

The [test context](https://precice.org/doxygen/develop/classprecice_1_1testing_1_1TestContext.html) provides context of the currently running test.
Inforamation is accessible directly and checkable as a predicate.
You can safely pass this per reference (`const precice::testing::TestContext&`) to other functions.

Attribute | Accessor | Predicate
Communicator size | `context.size` | `context.hasSize(2)`
Communicator rank | `context.rank` | `context.isMaster()`, `context.isRank(2)`
Participant name | `context.name` | `context.isNamed("A")`

In addition to this, you can also use the context to [connect the masters](https://precice.org/doxygen/develop/classprecice_1_1testing_1_1TestContext.html#a85f8b4146ceb4de0afdedee97c865c0f) of 2 partiticpants.

### Writing integration tests

If you are writing a new integration test there are the following important differences to unit tests:

- the preCICE integration tests are located under `./tests`
- each test goes into an individual `.cpp` file.
- suites are organized in folder hierarchies within `./tests`
- common functionality in a suite may be provided in a `helpers.cpp` file

Please use the script [createTest.py](https://github.com/precice/precice/blob/develop/tools/building/createTest.py) for the generation of a skeleton for a new test. It will take care of setting everything up in the required format. The documentation of the script is accessed by calling the `python3 createTest.py --help`.
As an example, refer to existing integration tests in `./tests`.
