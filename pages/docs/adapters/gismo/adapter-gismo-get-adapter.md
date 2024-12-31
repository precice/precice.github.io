---
title: Get and use the G+Smo adapter
permalink: adapter-gismo-get-adapter.html
keywords: adapter, G+Smo, building
summary: "The G+Smo adapter is a submodule of the C++-based library G+Smo. You can obtain the adapter by configuring the appropriate CMake options and building the library from source."
---

This adapter provides a collection of examples demonstrating the use of a G+Smo solver adapted for preCICE. 

After downloading the G+Smo main library, clone the G+Smo adapter submodule:

```
cd gismo/build
cmake .. -DGISMO_OPTIONAL="<Other submodules>;gsPreCICE" 
```
Build and install the tutorial:

```
make <tutorial name> -j <number of threads>
make install <tutorial name>
```


