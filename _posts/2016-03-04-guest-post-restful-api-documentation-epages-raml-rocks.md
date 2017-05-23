---
layout: page
title: "[Guest Post] RESTful API documentation @ePages. RAML rocks!"
date: 2015-06-25
categories : [Guest Posts , Tooling]
author: christianvogel
tags: [guest posts, raml-parser, tooling]
comments: true
---

Currently we are compiling a series of guest posts where we ask happy RAML user to tell their stories about how they are using RAML, or their tools they developed and contributed to the RAML community. In our very first post in this series, I am happy to have [ePages](http://www.epages.com/us/ "ePages") to talk about their experience and the tool they developed. If you want to talk about your story or tool, why not sending us an email to info@raml.org.

_[ePages](http://www.epages.com/us/ "ePages") is one of the world’s leading providers for online shop software in the cloud. More than 140,000 businesses in over 70 countries are already using the ePages shop software._ To simply connect third party applications to the ePages software, we’re developing a REST API based on JSON. We wanted to ensure that there will be a proper documentation for this REST API. So we made ourselves familiar with RAML (RESTful API Modeling Language), which is a useful tool to describe RESTful APIs in a structured and easy way. RAML allows to define simple patterns that help reduce repetitions in an API. Resources and methods can be displayed easily and filled with custom details. It also allows to include Markdown-formatted descriptions or entire markdown documentation sections. We wanted to publish the API documentation online - no sooner said than done: one of our developers was very committed to support this project. He built a Jekyll-based static html generation tool, to create documentation from Markdown files. One of the main requirements for our API documentation was to automatically import RAML files into the documentation tool, to easily bridge development and documentation and to avoid double work. To achieve this, he developed a Ruby-based open source library, the [raml_parser](https://github.com/ePages-de/raml_parser "raml_parser"). The raml_parser reads RAML files and returns the respective information. On top of that, he came up with a Jekyll plugin using the raml_parser to generate an API console that now enriches our documentation.

![API_console](/post_images/API_console-300x251.png "API_console")

We noticed very soon, that our inhouse documentation tool compared with simply editing Markdown and RAML files enriches our working environment and makes work far easier. _Author: Birgit Bader - Technical Writer @ ePages_