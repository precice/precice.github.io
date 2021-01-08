---
title: Tooling
keywords: pages, development
permalink: dev-docs-dev-tooling.html
---

## Formatting the code

The tool [clang-format](https://clang.llvm.org/docs/ClangFormat.html) applies a configured code style to C and C++ files.
It checks parent directories for a `.clang-format` file and applies the style to a given source file.
To keep the code-base consistent, please use `clang-format` version 8.
Scripts will explicitly use `clang-format-8` to prevent any problems.
Looking for precompiled binaries? Here is the [official APT repository](http://apt.llvm.org/).

We also use a custom formatting tool for XML files based on python 3 and the lxml package. So make sure to install it e.g. via `pip install --user lxml`.

To format the entire codebase, run our formatting tool:
```
cd path/to/precice
tools/formatting/format-all
```
This will automatically format all necessary files with the tool.


If you cannot find local binaries, you may use the dockerized version of the formatter.
It uses our CI [dockerimage](https://hub.docker.com/r/precice/ci-formatting/tags) dockerimage to format the code without having to worry about installing tools and their correct versions.
```
cd precice
tools/formatting/format-all-dockerized
```


To manually format a single file, you may use the tool form the shell:
```
clang-format -style=file -i FILES
```

Editor integration is available for:

- [Eclipse](https://marketplace.eclipse.org/content/cppstyle)
- [Emacs](https://clang.llvm.org/docs/ClangFormat.html#emacs-integration)
- [Vim](https://clang.llvm.org/docs/ClangFormat.html#vim-integration)
- [Visual Studio](https://clang.llvm.org/docs/ClangFormat.html#visual-studio-integration)

To [disable formatting](https://clang.llvm.org/docs/ClangFormatStyleOptions.html#disabling-formatting-on-a-piece-of-code) for a section of code use comments:
```
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

## clang-tidy

The tool clang-tidy runs static analysis on C and C++ files and reports warnings in clang error format (i.e. editors can parse them).
It checks parent directories for a `.clang-tidy` file and uses that configuration.

To prevent the hassle of passing all necessary flags to the tool, it can use a compilation database to look them up.
To generate this database using CMake, invoke cmake using `-DCMAKE_EXPORT_COMPILE_COMMANDS=ON`.
Then pass the build directory to clang-tidy using the `-p` flag.

Quick Setup:

- create a build dir `mkdir -p ~/tmp/precice && cd ~/tmp/precice`
- configure precice using `cmake -DCMAKE_EXPORT_COMPILE_COMMANDS=ON $PRICICE_ROOT` (this generates the needed `compile_commands.json`)
- `cd $PRECICE_ROOT`

How to use:
- Inspect a single file:  
  `clang-tidy -p ~/tmp/precice/ src/precice/impl/SolverInterfaceImpl.cpp` ( -p sets the dir where to find the file compile_commands.json)
- Inspect the entire source tree or apply fixes:  
  Use the `run-clang-tidy.py` to prevent header overlap etc.
  Installed as `/usr/share/clang/run-clang-tidy.py` or from the [mirror](https://github.com/llvm-mirror/clang-tools-extra/blob/master/clang-tidy/tool/run-clang-tidy.py).

## Cppcheck

The static analysis tool [Cppcheck](https://github.com/danmar/cppcheck/Cppcheck) can detect some errors and bad programming practice.
Simply run `cppcheck --enable=all .` inside `precice/src` or inside the directory you're working.


## Static analysis build

CMake can run various static analysis tools on sources after compiling them.
A quick way of setting up precice looks as follows:
```
$ mkdir -p ~/tmp/precice && cd ~/tmp/precice
$ cmake \
   -DCMAKE_BUILD_TYPE=Debug \
   -DCMAKE_EXPORT_COMPILE_COMMANDS=ON \
   -DCMAKE_CXX_CLANG_TIDY="clang-tidy;-p;." \
   -DCMAKE_CXX_CPPCHECK="cppcheck;--enable=all" \
   -DCMAKE_CXX_CPPLINT="cpplint.py" \
   -DCMAKE_CXX_INCLUDE_WHAT_YOU_USE="path/to/iwyu;-p;." \
   -DPRECICE_PythonActions=ON \
   -DPRECICE_MPICommunication=ON \
   -DPRECICE_PETScMapping=ON \
   $PRECICE_ROOT
$ make -j $(nproc)
```
As this build will run for a very long time, it may be a good idea to save the output to a log file. 
```
$ make -j $(nproc) 2>&1 | tee staticanalysis.log
```
If the log contains scrambled output, use:
```
$ make 2>&1 | tee staticanalysis.log
```
