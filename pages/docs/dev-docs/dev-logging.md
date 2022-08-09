---
title: Logging
keywords: pages, development
permalink: dev-docs-dev-logging.html
---

## Overview

Logging in preCICE is configured using the XML or [other configuration files](configuration-logging).
Some log levels are disabled based on the build type of the project and some terminate the program.
This is the full overview of all logs and assertions with decreasing severity:

Type | Enabled | Back-end | Description
--- | --- | --- | ---
Unreachable | in debug builds | cerr | Terminates the program when reaching impossible states.
Assertion | in debug builds | cerr | Ensures expected program state. Terminates the program.
Errors | always | Logger | User-errors only! Terminates the program
Warnings | always | Logger | Notifies about worrying states or deprecated configuration options.
Info | always on primary rank | Logger | Notifies about the state of the program and gives indication of what is happening.
Debug | in debug builds | Logger | Low-level information useful for developping and bug-search.
Trace | in debug builds | Logger | Function invokation information. Last resort before using a debugger. Sometimes debugging may also not be an option.

## Debug output and checks

Before using any of debugging/logging methods below you should set `PRECICE_TRACE()` at the beginning of the function.

- `PRECICE_TRACE(parameters)` prints the name and the parameters when entering a functions. It only prints the function name when leaving a function. This call should go to the very top of a function.
- `PRECICE_DEBUG(msg, args)` prints a debug message. Formatting arguments are optional.
- `PRECICE_WARN(msg, args)` prints a warning message. Formatting arguments are optional.
- `PRECICE_INFO(msg, args)` prints an info message. This is only visible on rank 0 by default. Formatting arguments are optional.
- `PRECICE_ERROR(msg, args)` unconditionally aborts the program. This should be used to catch user errors such as invalid configuration parameter combinations. Formatting arguments are optional.
- `PRECICE_CHECK(check, msg, args)` conditionally calls `PRECICE_ERROR` this is the preferred way of emitting an error based on a condition. Formatting arguments are optional.

Not based on a logger:

- `PRECICE_ASSERT(check, args)` conditionally prints the arguments, the stacktrace and aborts the program. This is used to detect inconsistent internal state due to programming errors. **A user should never see this.**
- `PRECICE_UNREACHABLE(msg)`

## Message style

We attempt to follow a git-like style with some extras:

- One line only _to prevent interleaved logs_
- Name actors and objects as best as possible, but don't provide internals such as IDs.
- For errors
  - What has happened?
  - Why is this a problem?
  - What can the user do to solve this issue?

Examples of errors:

```text
Data with name "DaTTa" used by mesh "MyCloud" is not defined. Please define a data tag with name="DaTTa".
No coupling scheme defined for participant "LonelyWolf". Please make sure to provide at least one <coupling-scheme:TYPE> in your precice-config.xml that couples this participant using the <participants .../> tag.
```

Examples of wanings:

```text
3D Mesh "MyCloud" does not contain triangles. Nearest projection mapping will map to primitives of lower dimension.
The relative convergence limit="1e-8" is close to the hard-coded numerical resolution="1e-9" of preCICE. This may lead to instabilities. The minimum relative convergence limit should be > "1e-9".  
```

## Formatting

We use the `fmtlib` for formatting the messages, which reimplements the python format syntax.
See the [offical syntax reference](https://fmt.dev/latest/syntax.html).

```cpp
// Simple message
PRECICE_INFO("Greetings!");
// Check with formatting
PRECICE_CHECK(a > 1, "A is \"{}\" should always be greater 1.", a);
// Simple messages with formatting
PRECICE_INFO("I am participant \"{}\"", _accessorName);
PRECICE_DEBUG("Primary connection {} {} already connected.", (requesting ? "from" : "to"), bm2n.remoteName);
// Indexed arguments
PRECICE_INFO("The mesh \"{0}\" does not like to be called "\{0}\". Not even the exporters respect mesh \"{0}\"", meshName);
// Long multi-line message with formatting
PRECICE_INFO("This message is long, but may not contain breaks. "
    "This is why I split it over multiple lines. "
    "The compiler will merge these string literals together for me. "
    "No worries");
```

## Enabling logging in a class

In order to use the aforementioned logging macros, you must declare a logger in the class/module.
Use `static` to prevent extensive copying of the logger.

Header stub:

```c++
#include "logging/Logger.hpp"

namespace precice {
namespace whatever {

class MyClass {

private:
  static logging::Logger _log{"whatever::MyClass"};
}

}}
```
