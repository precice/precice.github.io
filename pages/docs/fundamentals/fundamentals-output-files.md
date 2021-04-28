---
title: Output files
permalink: fundamentals-output-files.html
keywords: output, log, iterations, convergence, events
summary: "During runtime, preCICE writes different output files. On this page, we give an overview of these files and their content."
---

If the participant's name is `MySolver`, preCICE creates the following files:

## precice-MySolver-iterations.log

Information per time window with number of coupling iterations etc. (only for implicit coupling). In case you use a quasi-Newton acceleration, this file also contains information on the state of the quasi-Newton system.

An example file:

```log
TimeWindow  TotalIterations  Iterations  Convergence  QNColumns  DeletedQNColumns  DroppedQNColumns
1  6  6  1  5  0  0
2  9  3  1  7  0  0
3  12  3  1  9  0  0
4  14  2  1  10  0  0
5  16  2  1  11  0  0
6  18  2  1  7  0  5
7  20  2  1  6  0  2
```

* `TimeWindow` is the time window counter.
* `TotalIterations` is the total (summed up) number of coupling iterations.
* `Iterations` is the number of iterations preCICE used in each time window.
* `Convergence` indicates whether the coupling converged (`1`) or not (`0`) in each time window.
* `QNColumns` gives the amount of columns in the tall-and-skinny matrices V and W after convergence.
* `DeletedQNColumns` gives the amount of columns that were filtered out during this time window  (due to a QR filter). In this example no columns were filtered out.
* `DroppedQNColumns` gives the amount of columns that went out of scope during this time window (due to `max-iterations` or `time-windows-reused`). Here, for example, 5 columns went out of scope during the 6th time window.

Further reading: [quasi-Newton configuration](configuration-acceleration.html#quasi-newton-schemes).

## precice-MySolver-convergence.log

Information per iteration with current residuals (only for `second` participant in an implicit coupling).

An example file:

```log
TimeWindow  Iteration  ResRel(Temperature)  ResRel(Heat-Flux)
1  1  1.0000000000000000  1.0000000000000000
1  2  0.0009551938284061  0.4856546284783871
1  3  0.0008506916349598  0.0211064920997584
1  4  0.0000145046004076  0.0020145518273713
1  5  0.0000016534786952  0.0002524364641765
1  6  0.0000002133839605  0.0000423773334943
2  1  0.0008862176730224  0.0547823667891377
2  2  0.0000844808395569  0.0002313890428748
2  3  0.0000001593921083  0.0000214061446449
...
```

* `TimeWindow` is the time window counter.
* `Iteration` is the coupling iteration counter within each time window. So, in the first time window, 6 iterations were necessary to converge, in the second time window 3.
* And then two convergence measure are defined in the example. Two relative ones -- hence the `...Rel(...)`. The two columns `ResRel(Temperature)` and `RelRel(Force)` give the relative residual for temperature and heat flux, respectively, at the start of each iteration.

## precice-MySolver-events.json

Recorded events with timestamps. See page on [performance analysis](tooling-performance-analysis).

## precice-MySolver-events-summary.log

Summary of all events timings. See page on [performance analysis](tooling-performance-analysis).

## precice-postProcessingInfo.log

Advanced information on the numerical performance of the Quasi-Newton coupling (if used and enabled)

In preCICE [v1.3.0](https://github.com/precice/precice/releases/tag/v1.3.0) and earlier, instead of `precice-MySolver-events.json`, two performance output files were used: `precice-MySolver-events.log` and `precice-MySolver-eventTimings.log`.

In preCICE [v1.2.0](https://github.com/precice/precice/releases/tag/v1.2.0) and earlier, slightly different names were used: `iterations-MySolver.txt`,`convergence-MySolver.txt`, `Events-MySolver.log`,`EventTimings-MySolver.log`, and `postProcessingInfo.txt`.
