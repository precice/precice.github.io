---
title: Timings in preCICE
keywords: pages, development
permalink: dev-docs-dev-eventtimings.html
---

## Usage

preCICE includes functionality to measure timings of sections in the code.
This is based on the [EventTimings](https://github.com/precice/EventTimings) project.

To add an event to a piece of code:

1. `#include "utils/Event.hpp"`
2. create an event

An event is stopped when it goes out of scope. You may also manually stop an event.

Example:

````cpp
#include "utils/Event.hpp"
using precice::utils::Event;

void foo()
{
  Event e("advance");
  // do some stuff
  e.stop();
  // e is also stopped automatically at destruction
}
````

## Internals

The EventTimings classes use a singleton instance to save Events and the global start / stop time.
To start the measurement call `precice::utils::EventRegistry::instance().initialize(_accessorName)`  and `precice::utils::EventRegistry::instance().finalize()` to stop.
This is done by precice and normally should not be needed to call explicitly.
Keep in mind that multiple calls to initialize or finalize may mess up global timings.

Usually an event is auto started when instantiated. You can use `Event e("name", false, false)` to override that and use \c e.start() to start it later. An Event can also act as a barrier, see the Event constructuor. Multiple calls to `start()` or `stop()` have no effect.
