---
title: License information
permalink: fundamentals-license.html
keywords: license, LGPLv3, CC-BY
summary: preCICE is free/open-source software, without imposing any license restrictions on the software you couple.
---

The coupling library preCICE is part of the preCICE ecosystem. While every preCICE user uses the core library,
users often use further components of the ecosystem, such as language bindings, adapters, and tutorial simulation setups.
Let's look into some details.

## preCICE is free/open-source software

We are a [team of researchers in academia](about.html) and we are funded by various public funding resources (Germany/EU). This funding is rarely specific to software development, so what you see here is mostly an outcome of our research, plus a lot of additional effort from the maintainers and the community (people like you).

Everything we develop is not only available with standard [open-source licenses](https://choosealicense.com/licenses/), but also developed in the open from the start on [GitHub](https://github.com/precice/). We develop methods in our research, which we implement in preCICE, and we want the community to be able to use our research outcomes.

For us, open-source does not mean lower quality standards: quite the opposite.
Our small team dedicates significant efforts on keeping everything tested, easy to use, and with high software quality standards.
This time investment is often not justified in the short term by the specific funding programs.
To raise some additional money to be able to partially fund positions to work specifically on software development (currently not the case), and to make the preCICE team a reliable partner, we offer [training](community-training.html) and [support](community-support-precice.html), with discounts for users in academia.

Since preCICE is academic software, we expect research relying on our work to [cite preCICE](fundamentals-literature-guide.html). We do the same with all software projects we use in our publications. We also welcome [code contributions](community-contribute-to-precice.html).

## Licenses

### Core library and language bindings

The coupling library itself is distributed under the [GNU LGPLv3](https://www.gnu.org/licenses/lgpl-3.0.en.html) license.
This should not be confused with the more restrictive GNU GPLv3 license.
The main difference is that you can link to preCICE from a proprietary code: the license restrictions of preCICE do not propagate to other codes.

The same holds for all language bindings.

### Adapters

The preCICE adapters are code examples or stand-alone software packages demonstrating or falicitating coupling existing simulation codes.
In principle, our adapters inherit the license of the code we are writing the adapters for.

Note that you do not need to use specific simulation codes or adapters to use preCICE. You can always just [couple your code](couple-your-code-overview.html) using preCICE itself.

### Tutorials

The preCICE tutorials are example simulation setups, which sometimes include code. All tutorials are available under the same LGPLv3 license as the core library.

### Documentation

The preCICE documentation (as seen on this website), is available under the [Creative Commons Attribution 4.0 International license](https://creativecommons.org/licenses/by/4.0/). This means you can copy parts of the documentation into your own work, but you need to attribute it to the preCICE developers (including `precice.org`).

## Legal questions

For all legal questions, see our [contact details](about.html#impressum).
