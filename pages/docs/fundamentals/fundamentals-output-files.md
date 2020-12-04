---
title: Output files
permalink: fundamentals-output-files.html
keywords: output, log, iterations, convergence, events
summary: "During runtime, preCICE writes different output files. On this page, we give an overview of these files and their content."
---

If the participant's name is `MySolver`, preCICE creates the following files:

## precice-MySolver-iterations.log

Information per time window with number of coupling iterations etc. (only for implicit coupling)

In case you use a quasi-Newton acceleration, this file also contains information on the state of the quasi-Newton system:
* `QNColumns` gives the amount of columns in the tall-and-skinny matrices V and W after convergence
* `DeletedQNColumns` gives the amount of columns that were filtered out during this time window  (due to a QR filter)
* `DroppedQNColumns` gives the amount of columns that went out of scope during this time window (due to `max-terations` or `time-windows-reused`)

Further reading: [quasi-Newton configuration](configuration-acceleration.html#quasi-newton-schemes). 

## precice-MySolver-convergence.log

Information per iteration with current residuals (only for `second` participant in an implicit coupling)

## precice-MySolver-events.json

Recorded events with timestamps. See page on [performance analysis](tooling-performance-analysis).

## precice-MySolver-events-summary.log

Summary of all events timings. See page on [performance analysis](tooling-performance-analysis).

## precice-postProcessingInfo.log

Advanced information on the numerical performance of the Quasi-Newton coupling (if used and enabled) 

In preCICE [v1.3.0](https://github.com/precice/precice/releases/tag/v1.2.0) and earlier, instead of `precice-MySolver-events.json` two performance output files were used: `precice-MySolver-events.log` and `precice-MySolver-eventTimings.log`.

In preCICE [v1.2.0](https://github.com/precice/precice/releases/tag/v1.2.0) and earlier, slightly different names were used: `iterations-MySolver.txt`,`convergence-MySolver.txt`, `Events-MySolver.log`,`EventTimings-MySolver.log`, and `postProcessingInfo.txt`.
