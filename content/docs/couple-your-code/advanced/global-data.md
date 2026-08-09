---
title: Global data
permalink: couple-your-code-global-data.html
keywords: api, adapter, data, global
summary: "Define and exchange global data not accociated to a mesh."
---

Global data is not natively supported, but there is a simple workaround.

Every solver defines a mesh with a single vertex at `(0,0,0)` and uses it to read/write data.

```xml
<data:scalar name="GlobalData" />

<mesh name="GlobalA" dimensions="3">
  <use-data name="GlobalData" />
</mesh>

<mesh name="GlobalB" dimensions="3">
  <use-data name="GlobalData" />
</mesh>

<participant name="A" >
  <provide-mesh name="GlobalMeshA" />
  <write-data   mesh="GlobalMeshA" name="GlobalData" />
</participant>

<participant name="B" >
  <provide-mesh name="GlobalMeshB" />
  <receive-mesh name="GlobalMeshA" />
  <read-data    mesh="GlobalMeshB" name="GlobalData" />
  <mapping:nearest-neighbor constraint="consistent" direction="read" from="GlobalMeshA" to="GlobalMeshB"/>
</participant>
```
