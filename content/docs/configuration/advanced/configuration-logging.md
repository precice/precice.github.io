---
title: Logging configuration
permalink: configuration-logging.html
keywords: configuration, logging, boost.log
summary: "By default, preCICE provides a meaningful logging output to stdout. In case you want to modify the default logging, this page describes how to do this."
---

## Introduction

Logging in preCICE is based on [boost.log](http://www.boost.org/doc/libs/release/libs/log/doc/html/index.html).

For debug logging, you need to [build preCICE](installation-source-configuration.html) either in debug mode or in release mode with `PRECICE_RELEASE_WITH_DEBUG_LOG` enabled. Please note that the Debian packages do not provide debug logging.

In principle, to modify the logging, you configure your own logging in the preCICE configuration file. We start here with a dummy example. Further below, you can find useful examples for certain use cases:

```xml
<precice-configuration>
  <log enabled="true">
    <sink type="stream" output="stdout" format="Hello %Message%" 
          filter="%Severity% > debug"  enabled="true" />
    <sink type="file" output="debug.log" filter="" enabled="false" />
  </log>
... 
```

This configures two sinks: the first one logs to stdout, uses a somehow absurd logging format and filters, so that the messages with a severity higher than debug are printed. The other, disabled one, uses an empty filter, thus printing all messages and writes them to a file. Beware: because of trace messages this file might become huge.

`<log>` has one attribute:

* `enabled` can be used to completely disable logging. It defaults to `true`.

Each sink has these attributes:

* `type` can be `stream` or `file`. Avoid file streams when using [a distributed filesystem](running-distributed).
* `output` can be `stdout` or `stdin` if `type=stream` or a filename if `type=file`.
* `format` is some boost.log [format string](http://www.boost.org/doc/libs/release/libs/log/doc/html/log/detailed/utilities.html#log.detailed.utilities.setup.filter_formatter).
* `filter` is a boost.log [filter string](http://www.boost.org/doc/libs/release/libs/log/doc/html/log/detailed/utilities.html#log.detailed.utilities.setup.filter_formatter). The default filter string is `%Severity% > debug`
* `enabled` is a boolean value. It can be one of `0, 1, yes, no, true, false` Note that if all sinks are disabled, the default sink is used. Use `<log enabled="false">` to completely disable logging.

The `<log>` tag is optional. If it is omitted, default values are used.
`type` and `output` are mandatory, all others attributes are optional.

## log.conf

Logging can also be configured using a file `log.conf` in the current working directory. This is the way to configure logging when you run tests via `testprecice`.

```text
[Debug]
Filter = (%Severity% > debug) or (%Module% contains "PetRadialBasisFctMapping")
Format = %Message%

[EverythingToFile]
Filter = 
Type = file
output = precice.log
```

The `[SectionHeaders]` are just for distinguishing the sections, the names are not used.

## Attributes

Attributes available to the filter and the formatter are:

Attribute |  Description
--- | ---
`Severity` | Severity, can be `trace`, `debug` , `info`, `warning`, `error`
`File` | The absolute path to the file at the log location.
`Line` | The line number of the log location.
`Function` | The function at the log location.
`Module` | The module at the log location. This is mostly the class holding the logger.
`Rank` | The MPI rank producing the log
`Participant` | The name of the current participant, e.g., `Fluid`

## Examples

* All info messages, but also trace and debug logging for the API of preCICE. This logging is very useful if you want to find out if the coupled simulation crashes in preCICE or in your solver.

```xml
<log>
    <sink type="stream" output="stdout"  filter= "(%Severity% > debug) or (%Severity% >= trace and %Module% contains ParticipantImpl)"  enabled="true" />   
</log> 
```

* The standard preCICE info output, but in a more compact format. This can be useful if preCICE works fine and you want to focus on your solver's output.

```xml
<log>
    <sink type="stream" output="stdout"  filter= "%Severity% > debug and %Rank% = 0" format="preCICE: %ColorizedSeverity% %Message%" enabled="true" />  
</log> 
```

* To debug where initialization hangs:

```xml
<log>
    <sink type="stream" output="stdout"  filter= "(%Severity% > debug) or (%Severity% >= debug and %Module% contains ParticipantImpl) or (%Severity% >= debug and %Module% contains partition) or (%Severity% >= debug and %Module% contains PointToPointCommunication)"  enabled="true" /> 
</log> 
```

* You want to look at your output in an editor and the colors ([ANSI escape codes](https://en.wikipedia.org/wiki/ANSI_escape_code)) destroy the formatting.

```xml
<log>
    <sink type="file" output="precice.log"  filter= "%Severity% > debug and %Rank% = 0" format="(%Rank%) [%Module%]:%Line% in %Function%: %Severity% %Message%" enabled="true" />   
</log> 
```

* You develop in preCICE and want also trace output for `PetRadialBasisFctMapping`.

```xml
<log>
    <sink type="stream" output="stdout"  filter= "(%Severity% > debug and %Rank% = 0) or (%Severity% >= trace and %Module% contains PetRadialBasisFctMapping)" enabled="true" />    
</log> 
```

* Filter according to participant and put the messages into different files.

```xml
  <log>
    <sink type="file" output="debug_Fluid.log" filter="%Participant% = Fluid" />
    <sink type="file" output="debug_Solid.log" filter="%Participant% = Solid" />
  </log>
```

Note, that the files `debug_Fluid.log` and `debug_Solid.log` are created in any case, so you may end up with empty files if everything has been filtered out.
