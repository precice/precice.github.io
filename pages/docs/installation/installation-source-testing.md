---
title: Building from source
permalink: installation-source-testing.html
keywords: configuration, basics, cmake, installation, building, source
summary: "Usually the first paragraph of the page. If not create one or simple leave the field blank"
---

## Testing

To test preCICE after building, run `ctest` inside the build directory.
This will execute 3 types of tests: 
* Component-wise unit tests
* Integration tests
* Compilation and run tests based on example programs

For technical reasons, unit and integration tests require preCICE to be compiled with MPI enabled.

To display log output for tests use `ctest -VV` or `ctest --output-on-failure`.
To change the log level of the output, set the environment variable `export BOOST_TEST_LOG_LEVEL=all|test_suite|warning`.
Please note that debug and trace logs require preCICE to be build using the debug build type.
