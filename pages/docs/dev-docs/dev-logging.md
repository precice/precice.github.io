---
title: Logging
keywords: pages, development
permalink: dev-docs-dev-logging.html
---

## Debug Output and Checks

Before using any of debugging/logging methods below you should set `PRECICE_TRACE()` at the beginning of the function.

- `PRECICE_TRACE(parameters)` prints the name and the parameters when entering a functions. It only prints the function name when leaving a function. This call should go to the very top of a function.
- `PRECICE_DEBUG(stream)` prints a debug message.
- `PRECICE_WARN(stream)` prints a warning message.
- `PRECICE_INFO(stream)` prints an info message. This is only visible on rank 0 by default.
- `PRECICE_ERROR(message)` unconditionally aborts the program. This should be used to catch user errors such as invalid configuration parameter combinations.
- `PRECICE_CHECK(check, errorMessage)` conditionally calls `PRECICE_ERROR` this is the preferred way of emitting an error based on a condition.

Related but based on a logger:
- `PRECICE_ASSERT(check)` unconditionally prints the stacktrace and aborts the program. This is used to detect inconsistent internal state due to programming errors. A user should never see this. This does not require a logger.

## Usage

In order to use the aforementioned logging macros, you must declare a logger.

Header stub:
```
#include "logging/Logger.hpp"

namespace precice {
namespace whatever {

class MyClass {

private:
  static logging::Logger _log{"whatever::MyClass"};
}

}}
```
