---
title: Understanding preCICE errors
permalink: troubleshooting-preCICE-error-messages.html
keywords: error messages, tests
summary: "This page tries to help you understanding preCICE error messages."
---

In this page you can find some description for common errors.

**Note:** In preCICE v2.1, [all the error messages were rewritten](https://github.com/precice/precice/issues/698) and many of them now offer next steps. A good reason to upgrade!

## Receive failed

```
ERROR: Receive failed: read: End of file
``` 

This error means that the connection for communication crashed while preCICE was sending or receiving data. This happened most probably because the other participant, which you couple to, has crashed. Therefore, please look at the output of the other participant to see what went wrong. 

## Serial and parallel simulations

```
ERROR: You cannot use a master with a serial participant.
```

This error means that you have defined the `<master: ... />` tag in the `precice-config.xml` for a participant that you run in serial.

Note: One user has reported falsely getting this error while using MPICH, which they solved by changing to OpenMPI. We are investigating this.


More will follow soon
