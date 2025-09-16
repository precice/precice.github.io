---
title: Optimization
keywords: pages, development
permalink: dev-docs-dev-optimization.html
---

This tutorial states when and how to optimize code written for preCICE.
In general, the code development process looks as follows:

- Implement new functionalities with best-practices of OOP.
- Test the implemented functionality for correctness.
- Profile the code and implemented functionality with a suitable profiling tool.
- Optimize the implementation based on profiling and start from point 2 again.

The important message is that code implementation and code optimization are separated from each other.

This separation derives from an 80-20 rule, i.e. the observation that approximately 80% of the runtime of a program are spent in only about 20% of its implemented code.
This implies that optimizations applied at the right place can save a lot of efforts and leave large parts of a program in a nice OOP design.
An additional observation is, that it is harder to check optimized code for correctness or find bugs in it, since it is usually not as reader-friendly than not optimized code.
Thus, the implemented functionality should be tested thoroughly before any optimizations are applied.
Finally, it is almost impossible to guess where a program will spend the majority of its runtime in the code, and thus, proper places for optimizations must be determined with the help of profiling tools such as cachegrind.
After the optimization the code needs to be tested again, of course, in order to clear out errors introduced in this step from the code.
An additional profiling step is also necessary, to really observe how the execution pattern of the program has changed due to the optimizations done.
This process can continue until a satisfying performance is achieved or the amount of work for further improvements of the performance are getting to big.
