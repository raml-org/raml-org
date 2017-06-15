---
layout: page
title: "New API Modeling Framework now available as open source"
date: 2017-04-20
categories : [News, Specification, Tooling, Updates]
author: christianvogel
tags : [AMF , OAI , Linux Foundation , Open Source , RAML , MuleSoft]
comments: true
---

Today, MuleSoft joined the OAI and open sourced a new API tool called the [API Modeling Framework (AMF)](https://raml-org.github.io/api-modeling-framework/).

We are excited to make AMF available to the community, bringing together the RAML and OpenAPI ecosystems. AMF provides an approach to developing API that provides for parsing, interacting with, and generating API descriptions in any API description language.

Currently, there are several API description languages, like RAML and OpenAPI Specification (OAS). Without a way to provide tooling that can easily understand any API description language or a mechanism to go back and forth between languages easily, developers had to make a choice. AMF changes that.

We built a way to parse and generate any API specification (e.g. RAML or OAS) in a few steps. AMF makes RAML and OAS interoperable.

## How it works

AMF provides a common programmatic interface that lets developers interact with any API specification, whether it is written in OAS or RAML. AMF operates similarly to how the HTML DOM allows programmatic interaction with an HTML document, Developers can use AMF to build strong validation and introspect the API, infer behavior or analyze the impact of changes; and they can programmatically access, manipulate, and emit API specifications.

Using AMF you can parse a RAML document into a common data model stored in a data graph (see image below).

![](https://lh4.googleusercontent.com/YvEzkTZAO6reG9EDJMlldPk7Q4X0MrLjnotI6WWzC4CQL7dLW2n6A69RdHFukznWUevQigWKT8gDPmxZ_yoTdDpiqHKrPrkfQZ6HuW9Mk2hZE9wCchT7WUymjnY5mKaeEkGgerE)

This model can be queried and manipulated, then serialized back into a valid OAS document (for example).

There has been prior attempts to provide similar functionality, like Apiary’s [API Elements](https://github.com/apiaryio/api-elements), however those efforts did not provide all the querying features required to understand the relationships between all parts of an API specification. In contract, AMF was developed on proven W3C standardizations, relying on [RDF](https://www.w3.org/RDF/)  internally to generate and query a complete model of the API specification.

Currently, the AMF is available as an alpha version and under the Apache 2 license, It is available for download or preview as a [playground web application](https://mulesoft-labs.github.io/amf-playground).

Long term we are exploring ways to provide implementations in multiple programming languages. Currently we use Clojure to be able to easily provide a version for JS and Java, but we’d love to hear your feedback.