---
title: Tooling
keywords: pages, development
permalink: dev-docs-dev-tooling.html
---

## Setting up pre-commit

To use, [install pre-commit](https://pre-commit.com/#install) and run `pre-commit install` at the root of the project.
You can now force the formatting on all files with `pre-commit run -a`.

This will also run all pre-commit hooks before each commit, preventing dirty commits in the repository.

Custom pre-commit hooks for preCICE are included in the repository [precice/precice-pre-commit-hooks](https://github.com/precice/precice-pre-commit-hooks).
This currently provides a stand-alone hook for the precice config formatter.
The repository provides tags in the form `X.Y` where `X` is the major preCICE version and `Y` is the version of the hook repo.

## Formatting the code

To manually format the code, use pre-commit.
Do not use the formatting included in your IDE.
`clang-format` doesn't produce the same output for different versions, pre-commit keeps the version fixed.

```bash
pre-commit run -va clang-format
```

To [disable formatting](https://clang.llvm.org/docs/ClangFormatStyleOptions.html#disabling-formatting-on-a-piece-of-code) for a section of code use comments:

```bash
int formatted_code;
// clang-format off
    void    unformatted_code  ;
// clang-format on
void formatted_code_again;
/* clang-format off */
    void         unformatted_code  ;
/* clang-format on */
void formatted_code_yet_again;
```

## Formatting preCICE configuration files

To manually format configuration files, use pre-commit.

```bash
pre-commit run -va format-precice-config
```

To format your `precice-config.xml`, you can use the script `format_precice_config.py` which is part of the [preCICE pre-commit hooks](https://github.com/precice/precice-pre-commit-hooks) (without needing to install the pre-commit hooks) and depends on the lxml package (install it with `pip install lxml` in a [virtual environment](https://docs.python.org/3/library/venv.html#creating-virtual-environments)). To format a file in place:

```bash
format_precice_config.py precice-config.xml
```

The script returns 0 on success, 1 on error, and 2 if a file was modified.

You may want to define an alias for convenience:

```bash
function preciceConfigFormat(){
  /path/to/format_precice_config.py "${1:-precice-config.xml}"
}
```

## clang-tidy

The tool `clang-tidy` runs static analysis on C and C++ files and reports warnings in clang error format (i.e. editors can parse them).
It checks parent directories for a `.clang-tidy` file and uses that configuration.

We use a custom script in order to run `clang-format` on the entire preCICE code base. In order to use the script, install `run-clang-tidy` (part of `clang`) and `clang++`. Afterwards, the script can be executed using

```bash
cd path/to/precice
tools/linting/run_clang_tidy.sh
```

which will report potential errors on the console. Executing the script can be done using a `make` target called `make tidy` as well. Some errors can be fixed by `clang-tidy` itself. In order to let `clang-tidy` fix errors, add the `-fix` option [in the script](https://github.com/precice/precice/blob/develop/tools/linting/run_clang_tidy.sh).

## Cppcheck

The static analysis tool [Cppcheck](https://github.com/danmar/cppcheck) can detect some errors and bad programming practice.
Simply run `cppcheck --enable=all .` inside `precice/src` or inside the directory you're working.

## Static analysis build

CMake can run various static analysis tools on sources after compiling them.
A quick way of setting up precice looks as follows:

```bash
mkdir -p ~/tmp/precice && cd ~/tmp/precice
cmake \
   -DCMAKE_BUILD_TYPE=Debug \
   -DCMAKE_EXPORT_COMPILE_COMMANDS=ON \
   -DCMAKE_CXX_CLANG_TIDY="clang-tidy;-p;." \
   -DCMAKE_CXX_CPPCHECK="cppcheck;--enable=all" \
   -DCMAKE_CXX_CPPLINT="cpplint.py" \
   -DCMAKE_CXX_INCLUDE_WHAT_YOU_USE="path/to/iwyu;-p;." \
   -DPRECICE_FEATURE_PYTHON_ACTIONS=ON \
   -DPRECICE_FEATURE_MPI_COMMUNICATION=ON \
   -DPRECICE_FEATURE_PETSC_MAPPING=ON \
   $PRECICE_ROOT
make -j $(nproc)
```

As this build will run for a very long time, it may be a good idea to save the output to a log file.

```bash
make -j $(nproc) 2>&1 | tee staticanalysis.log
```

If the log contains scrambled output, use:

```bash
make 2>&1 | tee staticanalysis.log
```
