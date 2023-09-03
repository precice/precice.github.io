---
title: Output files
permalink: running-output-files.html
keywords: output, log, iterations, convergence, events
summary: "During runtime, preCICE writes different output files. On this page, we give an overview of these files and their content."
---

If the participant's name is `MySolver`, preCICE creates the following files:

## precice-MySolver-iterations.log

Information per time window with number of coupling iterations etc. (only for implicit coupling). In case you use a quasi-Newton acceleration, this file also contains information on the state of the quasi-Newton system.

An example file:

{% version 2.3.0 %}
Starting from preCICE version 2.3.0, the formatting of the numbers in these log files changed from an arbitrary to a fixed column width.
{% endversion %}

```log
TimeWindow  TotalIterations  Iterations  Convergence  QNColumns  DeletedQNColumns  DroppedQNColumns
     1       5       5       1       0       0       0
     2      10       5       1       0       0       0
     3      15       5       1       0       0       0
     4      20       5       1       0       0       0
     5      24       4       1       0       0       0
     6      28       4       1       0       0       0
     7      32       4       1       0       0       0
...
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

{% version 2.3.0 %}
Starting from preCICE version 2.3.0, the formatting of the numbers in these log files changed from a decimal to a fixed scientific format.
{% endversion %}

```log
TimeWindow  Iteration  ResRel(Temperature)  ResRel(Heat-Flux)
     1       1  1.00000000e+00  1.00000000e+00
     1       2  2.36081866e-03  4.61532554e-01
     1       3  1.76770050e-03  2.20718535e-03
     1       4  8.24839318e-06  4.83731693e-04
     1       5  1.38649284e-06  3.03987119e-05
     2       1  2.02680329e-03  1.14463674e+00
     2       2  1.10152875e-03  4.53255279e-01
...
```

* `TimeWindow` is the time window counter.
* `Iteration` is the coupling iteration counter within each time window. So, in the first time window, 6 iterations were necessary to converge, in the second time window 3.
* And then two convergence measure are defined in the example. Two relative ones -- hence the `...Rel(...)`. The two columns `ResRel(Temperature)` and `RelRel(Force)` give the relative residual for temperature and heat flux, respectively, at the start of each iteration.

## precice-MySolver-events.json

Recorded events with timestamps. See page on [performance analysis](tooling-performance-analysis.html).

## precice-MySolver-events-summary.log

Summary of all events timings. See page on [performance analysis](tooling-performance-analysis.html).

## precice-accelerationInfo.log

Advanced information on the numerical performance of the Quasi-Newton coupling (if used and enabled). Please note that this file is mainly meant for debugging. Nearly all information here can also be inspected through the iterations file above.

An example file:

```log
--------
DOFs (global): 96
# time window 0 converged #
 iterations: 3
 used cols: 2
 del cols: 0
# time window 1 converged #
 iterations: 2
 used cols: 3
 del cols: 1
...
```

* `DOFs` number of degrees of freedom at the coupling interface, which equals the number of vertices times the number of variables. Please note that only variables relevant to the acceleration are taken into account.
* `time window` is the time window counter.
* `iterations` is the coupling iteration counter within each time window. So, in the first time window, 4 iterations were necessary to converge, in the second time window 3.
* `used cols` is the amount of the reused columns in the matrices V and W from previous time windows.
* `del cols` gives the amount of columns that were filtered out during this time window  (due to a QR filter).

To enable this log, uncomment the relevant lines in the destructor `~BaseQNAcceleration()` in [`precice/src/acceleration/BaseQNAcceleration.hpp`](https://github.com/precice/precice/blob/develop/src/acceleration/BaseQNAcceleration.hpp). And add the following lines at the beginning of the same file:

```cpp
#include <iomanip>
#include "utils/IntraComm.hpp"
```

In the end, you need to recompile preCICE to apply the change.

{% version 1.3.0 %}
In preCICE [v1.3.0](https://github.com/precice/precice/releases/tag/v1.3.0) and earlier, instead of `precice-MySolver-events.json`, two performance output files were used: `precice-MySolver-events.log` and `precice-MySolver-eventTimings.log`.
{% endversion %}

{% version 1.2.0 %}
In preCICE [v1.2.0](https://github.com/precice/precice/releases/tag/v1.2.0) and earlier, slightly different names were used: `iterations-MySolver.txt`,`convergence-MySolver.txt`, `Events-MySolver.log`,`EventTimings-MySolver.log`, and `postProcessingInfo.txt`.
{% endversion %}
