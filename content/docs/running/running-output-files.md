---
title: Output files
permalink: running-output-files.html
keywords: output, log, iterations, convergence, events
summary: "During runtime, preCICE writes different output files. On this page, we give an overview of these files and their content."
---

## Overview of output files

During a simulation, preCICE will create the following files and directories, depending on its configuration:

- `precice-run/` (during initialization)
- `precice-PARTICIPANT-iterations.log` (only in an [implicit coupling scheme](configuration-coupling.html))
- `precice-PARTICIPANT-convergence.log` (only from the `second` participant in an [implicit coupling scheme](configuration-coupling.html))
- `precice-accelerationInfo.log` (only if enabled in the source code)
- `precice-PARTICIPANT-watchpoint-NAME.log` (if [watchpoints](configuration-watchpoint.html) are defined)
- `precice-profiling/` (if [profiling](tooling-performance-analysis.html) is enabled)
- exports, optionally in a directory such as `precice-exports/` (if [exports](configuration-export.html) are defined)

where `PARTICIPANT` refers to the coupling participant, and `NAME` is user-defined.

Let's look at these files in detail.

## Exchange directory

This directory is created during initialization by the connector participant in a [communication](configuration-communication.html),
advertising the network addresses and ports that the requestor can connect to.
After the communication handshake is completed, the respective files are deleted.
Before [running a simulation](running-simple.html) again, remove this directory if not empty (e.g., previous failed initialization).

## Iterations log

Information per time window with number of coupling iterations etc. (only for implicit coupling). In case you use a quasi-Newton acceleration, this file also contains information on the state of the quasi-Newton system.

An example file (example from the 2D [perpendicular-flap tutorial](tutorials-perpendicular-flap.html)):

```log
  TimeWindow  TotalIterations  Iterations  Convergence  QNColumns  DeletedQNColumns  DroppedQNColumns
     1       4       4       1       3       0       0
     2       7       3       1       4       1       0
     3      10       3       1       6       0       0
     4      13       3       1       8       0       0
     5      16       3       1      10       0       0
...
```

- `TimeWindow` is the time window counter.
- `TotalIterations` is the total (summed up) number of coupling iterations.
- `Iterations` is the number of iterations preCICE used in each time window.
- `Convergence` indicates whether the coupling converged (`1`) or not (`0`) in each time window.
- `QNColumns` gives the amount of columns in the tall-and-skinny matrices V and W after convergence.
- `DeletedQNColumns` gives the amount of columns that were filtered out during this time window  (due to a QR filter). In this example no columns were filtered out.
- `DroppedQNColumns` gives the amount of columns that went out of scope during this time window (due to `max-iterations` or `time-windows-reused`). Here, for example, 5 columns went out of scope during the 6th time window.

Further reading: [quasi-Newton configuration](configuration-acceleration.html#quasi-newton-schemes).

## Convergence log

Information per iteration with current residuals (only for `second` participant in an implicit coupling).

An example file (example from the 2D [perpendicular-flap tutorial](tutorials-perpendicular-flap.html)):

```log
  TimeWindow  Iteration  ResRel(Solid-Mesh:Displacement)  ResRel(Solid-Mesh:Force)
     1       1              inf   1.00000000e+00
     1       2   1.00000000e+00   5.00000000e-01
     1       3   5.00000000e-01   6.54332720e-03
     1       4   8.11693686e-04   2.69838168e-04
     2       1   3.44371401e-01   2.54887282e+00
     2       2   1.38165157e-01   2.61749833e-03
     2       3   3.17097088e-04   1.87206769e-03
     3       1   4.35700354e-01   5.15689928e-01
     3       2   1.37742944e-02   7.38243695e-03
     3       3   2.39573559e-04   4.28219646e-04
     4       1   3.69981564e-01   1.26171987e-01
     4       2   1.21284869e-03   1.22056631e-02
     4       3   8.56506268e-05   5.57929995e-04
     5       1   2.73443741e-01   7.65040124e-02
     5       2   2.45034099e-04   5.28876243e-03
     5       3   9.27789960e-05   6.07767123e-04
...
```

- `TimeWindow` is the time window counter.
- `Iteration` is the coupling iteration counter within each time window. So, in the first time window, 6 iterations were necessary to converge, in the second time window 3.
- And then two convergence measure are defined in the example. Two relative ones -- hence the `...Rel(...)`. The two columns `ResRel(Temperature)` and `RelRel(Force)` give the relative residual for temperature and heat flux, respectively, at the start of each iteration.

## Acceleration information

Advanced information on the numerical performance of the Quasi-Newton coupling (if used and enabled). Please note that this file is mainly meant for debugging. Nearly all information here can also be inspected through the iterations file above.

An example file (unrelated to the rest of the examples):

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

- `DOFs` number of degrees of freedom at the coupling interface, which equals the number of vertices times the number of variables. Please note that only variables relevant to the acceleration are taken into account.
- `time window` is the time window counter.
- `iterations` is the coupling iteration counter within each time window. So, in the first time window, 4 iterations were necessary to converge, in the second time window 3.
- `used cols` is the amount of the reused columns in the matrices V and W from previous time windows.
- `del cols` gives the amount of columns that were filtered out during this time window  (due to a QR filter).

To enable this log, uncomment the relevant lines in the destructor `~BaseQNAcceleration()` in [`precice/src/acceleration/BaseQNAcceleration.hpp`](https://github.com/precice/precice/blob/develop/src/acceleration/BaseQNAcceleration.hpp). And add the following lines at the beginning of the same file:

```cpp
#include <iomanip>
#include "utils/IntraComm.hpp"
```

In the end, you need to recompile preCICE to apply the change.

## Watchpoints

If [watchpoints](configuration-watchpoint.html) are configured, these are written with the name `precice-PARTICIPANT-watchpoint-NAME.log`,
in the working directory of the respective participant.

It has the format (example from the 2D [perpendicular-flap tutorial](tutorials-perpendicular-flap.html)):

```log
  Time  Coordinate0  Coordinate1  Displacement0  Displacement1  Force0  Force1
 0.00000000e+00   0.00000000e+00   1.00000000e+00   0.00000000e+00   0.00000000e+00   0.00000000e+00   0.00000000e+00
 1.00000000e-02   0.00000000e+00   1.00000000e+00   1.40209082e-03   2.53740150e-06   2.03655856e+01  -1.52020001e+01
 2.00000000e-02   0.00000000e+00   1.00000000e+00   1.45349259e-03   9.20233008e-05   1.39714999e+01   3.19717624e+01
 3.00000000e-02   0.00000000e+00   1.00000000e+00   2.24703291e-03   1.04481990e-04   1.06942430e+01   2.48601963e+01
 4.00000000e-02   0.00000000e+00   1.00000000e+00   3.46697879e-03   1.34304672e-04   9.60776463e+00   2.14353495e+01
...
```

## Profiling

Recorded events of all participants and ranks. See page on [performance analysis](tooling-performance-analysis.html) for more information.

These files have the format `PARTICIPANT-RANK-N.txt`. By default, they are stored in a `precice-profiling/` directory,
in the working directory of each participant. The respective performance analysis tools produce intermediate and result files as well.

## Exports

If [exports](configuration-export.html) are defined, preCICE writes such files in the directory of the participant that defines them,
or in the specific directory configured (in our examples and tutorials, we use `precice-exports/`).

Most commonly (with `<export:vtu />`), these are:

- `MESH-PARTICIPANT.init.vtu`: The initial state
- `MESH-PARTICIPANT.dtN.vtu`: One result file per coupling time window
- `MESH-PARTICIPANT.vtu.series`: A collection of the above

## History of output files

{% tip %}
This documentation concerns preCICE v{{ site.precice_version }}.
Read about [previous versions](fundamentals-previous-versions.html) or [how to upgrade](couple-your-code-porting-overview.html).
{% endtip %}

For older scripts that rely on these files, the following historical information might be useful:

- Before preCICE [v3.3.0](https://github.com/precice/precice/blob/develop/CHANGELOG.md#330):
  - `precice-profiling/PARTICIPANT-RANK-N.txt` were named `precice-profiling/PARTICIPANT-RANK-N.json`. The output files of the profiling post-processing tool were different.
- Before preCICE [v3.0.0](https://github.com/precice/precice/blob/develop/CHANGELOG.md#300):
  - `precice-profiling` was named `precice-events`, and `precice-PARTICIPANT-profiling.json` was `precice-PARTICIPANT-events.json`.
- Before preCICE [v2.3.0](https://github.com/precice/precice/blob/develop/CHANGELOG.md#230):
  - `precice-PARTICIPANT-iterations.log` and `precice-PARTICIPANT-convergence.log` had an arbitrary column format, instead of now fixed column width.
  - `precice-PARTICIPANT-convergence.log` had decimal format, instead of now fixed scientific format.
- Before preCICE [v2.1.0](https://github.com/precice/precice/blob/b86d874258d077fab68b36726f31b9b882289e22/CHANGELOG.md#210):
  - `precice-PARTICIPANT-events-summary.log` was only part of the screen output.
- Before preCICE [v1.4.0](https://github.com/precice/precice/blob/develop/CHANGELOG.md#140):
  - `precice-PARTICIPANT-events.json` was `precice-PARTICIPANT-events.log` and `precice-PARTICIPANT-eventTimings.log`.
- Before preCICE [v1.3.0](https://github.com/precice/precice/blob/develop/CHANGELOG.md#130):
  - `precice-PARTICIPANT-iterations.log` was named `iterations-PARTICIPANT.txt`
  - `precice-PARTICIPANT-convergence.log` was named `convergence-PARTICIPANT.txt`
  - `precice-accelerationInfo.log` was named `postProcessingInfo.txt` (and later `precice-postProcessingInfo.log`) included more advanced information on the numerical performance of the Quasi-Newton coupling (if used and enabled)
  - `profiling/` information was stored in `Events-PARTICIPANT.log` and `EventTimings-PARTICIPANT.log`
