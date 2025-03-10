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

```cpp
#include "utils/Event.hpp"
using precice::utils::Event;

// An event automatically stopps when it leaves scope
void bar()
{
  Event e("init");
  // do some stuff
}

// You can manually stop it to measure a section only
void foo()
{ 
  // ...

  Event e("selection");
  // do some stuff to measure
  e.stop();

  // ...
}
```

## Fundamental events

Events are grouped into two classes:

* Fundamental events are recorded by default and should be interesting for the user.
* All other events are recorded only if the profiling mode is `all`.

To mark an event as fundamental use:

```cpp
Event e("important", profiling::Fundamental);
```

## Synchronization

Some events make only sense to measure if all ranks of the solver are synchronized beforehand.
This is the case for most events that rely on communication.

To synchronize an event use:

```cpp
Event e("communicating", profiling::Synchronize);
```

Then enable it in [the configuration](tooling-performance-analysis.html).

## Attaching data

You can attach integer data to events if you are interested in profiling some important information such as amount of connections, amount of vertices, cache hits or similar.

```cpp
#include "utils/Event.hpp"
using precice::utils::Event;

// An event automatically stops when it leaves scope
void step()
{
  Event e("stepping");
  // do some stuff
  // attach some data
  e.addData("Steps", 4);
}
```

## Internals

The EventTimings classes use a singleton instance to save Events and the global start / stop time.
To start the measurement call `precice::utils::EventRegistry::instance().initialize(_accessorName)`  and `precice::utils::EventRegistry::instance().finalize()` to stop.
This is done by precice and normally should not be needed to call explicitly.
Keep in mind that multiple calls to initialize or finalize may mess up global timings.

Usually an event is auto started when instantiated. You can use `Event e("name", false, false)` to override that and use \c e.start() to start it later. An Event can also act as a barrier, see the Event constructuor. Multiple calls to `start()` or `stop()` have no effect.
