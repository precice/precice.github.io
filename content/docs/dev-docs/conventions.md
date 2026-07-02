---
title: General coding conventions
keywords: pages, development
permalink: dev-docs-dev-conventions.html
summary: This page describes general and coding conventions used in preCICE.
---

## General guidelines

- Main rule: orient yourself on the already written code.
- CamelCase notation is used, no underlines please.
- Make sure your code compiles before you commit.
- Pay attention to compiler generated warnings and try to fix them.
- In case you can't fix a unused variable warning, e.g. with range based for loops, you can use `std::ignore = vertex; // Silence unused variable warning`.
- Use `std::vector::empty()` to check for emptiness, not `vector.size() == 0`. `empty()` is guaranteed to be O(1) for all STL container classes. Furthermore, it says what you are actually doing.
- Use `#pragma once` as an include guard.
- Use `std::make_shared` for creating smart pointers. Why: [Difference in make_shared and normal shared_ptr in C++](https://stackoverflow.com/questions/20895648/difference-in-make-shared-and-normal-shared-ptr-in-c).

## Indentation and formatting

As a rule of thumb again: Orient yourself on the already written code!

There is a settings file for `clang-format`. See the page on [Tooling](dev-docs-dev-tooling.html#formatting-the-code") for more information on clang-format.

Regarding indentation, we follow the [BSD-style](https://en.wikipedia.org/wiki/Indentation_style#Allman_style).

We do not indent namespaces since three or so levels of nested namespaces fill the offset without adding any viable information.

Using Emacs you get the indentation style using this snippet.

```el
(setq c-basic-offset 2)
(c-add-style "my-cc-style"
             '("bsd" (c-offsets-alist . (
                                         (innamespace . 0)
                                         (namespace-open . 0)
                                         (namespace-close . 0)
                                         (cpp-macro . 0) ; indent macros like the surrounding code
                                         ))))
(setq c-default-style "my-cc-style")
```

## Documentation

We use [Doxygen](http://doxygen.org) for source code documentation. A generic documentation template for a class, function or variable:

```c++
/// A brief doc string, just one line
/** Some more elaborate description following, it is optional
* @param[in] i Parameter going into the function
* @param[out] o Parameter coming from the function
* @param[in,out] x One more parameter, used for input and output
*/
void foo(int i, double o, bool x);
```

For a one-line documentation you should use

```c++
/// Eat an apple
void eat(Apple a);
```

For more information, see the page on \ref tooling.

## Dimension-ordering

Under dimension-ordering, the ordering of some indices associated to a multi-dimensional structure (e.g., cell) in a specific way is understood. The index 0 is associated to the object which has coordinates nearest to 0 for all
dimensions. Index 1 is given to the object with coordinates nearest to zero, besides for dimension 1. The following example illustrates the ordering. The example shows the numbering of sub-cells in a 2D cube:

```text
      ---------
      | 2 | 3 |
dim 2 |-------|
  ^   | 0 | 1 |
  |   ---------  
   --> dim 1
```
