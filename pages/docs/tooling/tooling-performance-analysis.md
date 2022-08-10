---
title: Performance analysis
permalink: tooling-performance-analysis.html
keywords: tooling, json, performance, events, analysis, cpu time
summary: "preCICE comes with an internal performance analysis framework"
---

## Working with events

preCICE uses the [EventTimings](https://github.com/precice/EventTimings) library to profile major logical blocks of work.
The library generates files during the finalization step of each participant and writes them to their current working directories.

For a participant called `MySolver`, the files are called as follows:

* `precice-MySolver-events.json`
* `precice-MySolver-events-summary.log`

## The events summary file

The events summary file contains a table of events, their occurrences and some statistics on their runtime.
This can be helpful to quickly identify where the preCICE library spends most of its time.

It is especially helpful to focus on [noteworthy events](#noteworthy-events).

This is an example output:

```text
Run finished at Wed Aug  1 09:41:10 2018
Global runtime       = 12859ms / 12s
Number of processors = 4
# Rank: 0

  Event |      Count |  Total[ms] |    Max[ms] |    Min[ms] |    Avg[ms] |       T[%] |
---------------------------------------------------------------------------------------
_GLOBAL |          1 |      12859 |      12859 |      12859 |      12859 |         99 |
advance |          1 |         84 |         84 |         84 |         84 |          0 |

   Name |        Max |  MaxOnRank |        Min |  MinOnRank |    Min/Max |
--------------------------------------------------------------------------
_GLOBAL |      12859 |          0 |      12859 |          0 |          1 |
advance |        119 |          2 |         83 |          1 |          0 |
```

`T[%]` prints the relative runtime. Note that this can be more than 100% summed up, since events can be nested, like in the example above.

## The events JSON file

The events JSON file contains the full picture of events and attached data.

You can use the [events2trace](https://raw.githubusercontent.com/precice/EventTimings/master/extra/events2trace.py) tool to convert events to the [trace format](https://docs.google.com/document/d/1CvAClvFfyA5R-PhYUmn5OOQtYMH4h6I0nSsKchNAySU/view).
The tool allows to merge the events output of multiple participants into a single output in the trace format.
This trace format can then be visualized using the following tools:

* [speedscope.app](https://www.speedscope.app/)
* [ui.perfetto.dev](https://ui.perfetto.dev)
* [`chrome://tracing/`](chrome://tracing/) in Chromium browsers [_(see full list)_](https://en.wikipedia.org/wiki/Chromium_(web_browser)#Active)

An example trace visualization using `chrome://tracing/` of the elastictube1d example looks as following:

![Trace example](images/docs/tooling/elastictube1d-events.png)

You can also evaluate the data in the events files yourself.
Please pay special attention to the timestamps as they are based on the system clock.
Larger clusters are often subject to clock-drift, so you need to shift and normalize the time-scales yourself.

## Noteworthy events

Noteworthy events are

1. The communication buildup, which can become very expensive on clusters. This is generally bound to the filesystem. This is not a problem for The main latency here is the distributed file-system.
