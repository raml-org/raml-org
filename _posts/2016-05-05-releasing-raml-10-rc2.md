---
layout: page
title: "Releasing RAML 1.0 RC2"
date: 2016-05-05
author: christianvogel
categories : [News , Specification]
tags : [raml, rc2]
---

People that carefully watch our specification repository might have already realized that we were able to close all issues and merge the RAML 1.0 RC2 branch into its predecessor. Therefore, we are very happy to finally announce the official release of our next release candidate RAML 1.0 RC2.

### **So what does that actually mean and where are we going?**

The tremendous amount of work that participants from the community and RAML Workgroup put into this milestone got the 1.0 specification to a point where we consider making the RC2 our final version regarding its feature set. That means we will not make any more changes regarding functionality to the specification this release. Hence, between finalizing the specification and closing RAML 1.0 for GA, we will only work on several content improvements such as wordsmithing, English, adding more clarity in wording and examples, etc. But to move towards finalizing RAML 1.0, we will not be adding any new feature requests to this release, but instead will reserve them for our roadmap post 1.0\. We will work on the content changes for the next coming week before closing and officially release RAML 1.0.

[RC2 introduces a lot of changes compared to its predecessor](https://github.com/raml-org/raml-spec/wiki/RAML-1.0-RC1-vs-RC2) and these changes still need to be implemented into the parser, as well as fully tested. For this reason we’ll keep the RC2 parser in a separate branch until we are able to fully implement and test the changes.  The same is true with the [API Workbench](http://apiworkbench.com). Our goal is to provide you with a beta implementation of RC2 for both by the end of next week.

That does not mean you can not use RC2 right away. With our efforts to close RC2, one of our biggest goals was to provide you with a parser that you not only can use but also experiment and understand its implementation. The first published version only contained the compiled sources, and I am happy to announce that the team pushed a new version of the parser with its complete sources into the raml-js-parser-2 repository. This version includes all the changes for RC2, and we hope very much that people will use it and report issues as they are coming up. Currently, you can find the RC2 version either inside the [`rc2` branch](https://github.com/raml-org/raml-js-parser-2/tree/rc2) of that repository with the source code or use the pre-release information on how to get it from npm.

### **What about other tools that do not have support for RAML 1.0?**

As RC2 is our final version around functionality, it is highly possible that existing tools will be updated using reference implementation such as the workbench and JS parser. In fact, there are many tools that already have started to support RAML 1.0 including [raml2html](http://raml.org/projects/projects#q:raml2html), [raml2obj](http://raml.org/projects/projects#q:raml2obj), [API Designer](http://raml.org/projects/projects#q:API Console), [API Console](http://raml.org/projects/projects#q:API Console), [ramlo](http://raml.org/projects/projects#q:ramlo), [sphinx-raml](http://raml.org/projects/projects#q:sphinx-raml), and [raml-generator](http://raml.org/projects/projects#q:raml-generator).  This week, we will also open source the first version for a native Java parser, and followed shortly with an updated .Net parser to enable more and more projects to take advantage of RAML 1.0 support.

When RAML 1.0 is released we will also update the [Projects Library](http://raml.org/projects) to showcase which projects support RAML 1.0.

### **Want to upgrade to RAML 1.0 RC2?**

[See breaking changes between RAML 0.8 and RAML 1.0 RC2](https://github.com/raml-org/raml-spec/wiki/Breaking-Changes)