---
layout: page
title: "A little pre-Christmas Update"
date: 2016-12-09
categories : [News, Tooling, Updates]
author: christianvogel
tags : [raml2html, documentation, testing, parser]
comments: true
---

On behalf of the RAML Workgroup, I am really excited to announce the release of the [RAML Test Compatability Kit (TCK)](https://github.com/raml-org/raml-tck) and a new [raml2html](https://github.com/raml2html/raml2html) version with RAML 1.0 support.

**What exactly is the RAML TCK?**

The RAML TCK has been developed to help people that create a parser for RAML in their favorite language to validate that their implementation complies with the RAML specification.

The RAML TCK  provides a set of RAML definitions in JSON format that are either valid or invalid. You can load these files and compare them against the output of your parser to see if both matches.

The RAML TCK is already been used successfully inside the [JS](https://github.com/raml-org/raml-js-parser-2) and [Java](https://github.com/raml-org/raml-java-parser) parser to identify issues early on during the most critical period in the past. During that time, the TCK repository grew with each issue found or raised by the community, and after some cleanup we are able to release it now.

As we are sure we haven't covered all the different corner cases, please feel free to contribute by forking the repo and sending a pull request. The details on how to contribute are outlined [here](https://github.com/raml-org/raml-tck/blob/master/README.md#contributing-tests). Also, if you have any questions, please don't hesitate to create an issue on the TCK repository.

Huge thanks to everyone who spent so much time building and adding files to the TCK.

**Release of raml2html v4**

With over 30k downloads in the last month on npm, raml2html is indeed one of the most popular tools in the RAML community. For the ones that never heard about it; raml2html allows you to generate HTML documentation from a RAML file.

It's our pleasure to announce that the RAML 1.0 support has been finally added with the release of raml2html v4. Please join me in a round of applause that hopefully reaches Kevin Renskers who created the initial version back in 2014 and brought in the RAML 1.0 support now.

I know that Kevin is still looking for contributors that help him to continue to improve the RAML 1.0 support, and also other areas (e.g.  the current template). If you love working on an open source project that is currently consumed by ten thousands of people, please get in touch with us using info@raml.org, or go to the [Github repo](https://github.com/raml2html/raml2html) and start sending pull requests.

We are looking forward to more contribution and tools with RAML 1.0 support in the future. We will definitely keep you up to date.