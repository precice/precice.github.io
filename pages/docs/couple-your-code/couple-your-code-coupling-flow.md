---
title: Coupling flow
permalink: couple-your-code-coupling-flow.html
keywords: api, adapter, coupling schemes, communication, advance
summary: "TODO"
---

TODO

Similar to section in new reference paper


 In a serial coupling (without using this method), the second participant calls `initialize()` and (if it has to receive data) waits for the first participant to also reach `advance()`, in order to get the first data. In this sense, the second participant always gets initial data in a serial coupling. In order to force that the first participant receives data from the second, both participants need to call `initializeData()`. Compare this with Figure 33 (page 46) of [Benjamin Uekermann's dissertation](https://mediatum.ub.tum.de/doc/1320661/document.pdf):

[[images/serial-vs-parallel-coupling.png]]
