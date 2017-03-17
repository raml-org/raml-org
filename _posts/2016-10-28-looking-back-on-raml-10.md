---
layout: page
title: "Looking back on RAML 1.0"
date: 2016-10-28
categories : [Specification, Tooling, Updates]
author: christianvogel
tags : [raml, update]
---

It's been a while since the release of RAML 1.0, and we would like to do a reflection on where we are with regards to the specification, tools, and community.

## Specification

Since May, we got an immense number of positive feedback around the new features we introduced with RAML data types being the favorite change by far. Many people also helped the RAML Workgroup to identify hidden mistakes inside the specification and other missing clarification in certain areas so that we were able to release our first patch release in July.

We will continue to provide patch releases that increase the quality of the specification. The next upcoming release we currently plan between the end of October and mid-November. See more information [here](https://github.com/raml-org/raml-spec/milestone/6).

## Tools

Supporting the community with tools that make documenting APIs with RAML or creating APIs with RAML-first is crucial. Over the last months, the RAML community started to update their existing tools or even began to implement new ones based on the newest version of the specification. Let us review what is already available or work in progress.

Some of those projects are looking for active contribution or feedback. We encourage everyone to go and look around to see if they can help.

### Parser

A specification cannot live without a parser available in different languages. Since the RAML 1.0 release, the RAML ecosystem got parsers for [JavaScript](https://github.com/raml-org/raml-js-parser-2), [Java](https://github.com/raml-org/raml-java-parser), and [dotNet](https://github.com/raml-org/raml-dotnet-parser-2) already; whereas [Spotify's Python](https://github.com/spotify/ramlfications) parser is on its way and a new addition to the community around the [Go](https://github.com/go-raml/raml) language is in active development.

### Design

With the release in May, [MuleSoft](https://www.mulesoft.com/) contributed a new version of the JavaScript and Java parser that parses both 0.8 and 1.0; as well as an IDE called [API Workbench](https://github.com/mulesoft/api-workbench) (Atom plugin) to design, build, test, and document Web APIs with RAML. MuleSoft put a lot effort into improving these tools over the last few months, increasing the quality and applying the community feedback. They haven't stopped here. MuleSoft's [API Designer](https://github.com/mulesoft/api-designer) also got an update to support RAML 1.0 in parallel with the previous version 0.8.

Not only MuleSoft ramped up their support for RAML 1.0. For example,  [Restlet](https://studio.restlet.com/) and [StopLight](https://app.stoplight.io/) also support importing it into their designer, where you can continue defining your API specification visually. That is a great achievement.

###  Documentation

Besides [API Console](https://github.com/mulesoft/api-console) being already in GA with full support for RAML 1.0; the most downloaded documentation tool as of today also is on its way to being finished. [Raml2html](https://github.com/raml2html/raml2html) was downloaded 26,600 times last month and over 5,000 last week. The RAML Workgroup recognized the need to help and support the implementation for RAML 1.0 and even got Kevin Renskers back to make the necessary modification. Thanks Kevin for your hard effort. Please read more about the progress [here](https://github.com/raml2html/raml2html/issues/254).

There is also more on its way. For example, a project called [ramlo](https://github.com/PGSSoft/ramlo) from PGS Software that also generates a dynamic documentation page with features like mocking service. It is under development at the moment, but  PGS Software plans a first release candidate by the end of this month.

### Build

Generating client or server code from an existing RAML document makes building APIs easier. The RAML  ecosystem got its core tools like [Osprey](https://github.com/mulesoft/osprey), [raml-dotnet-tools](https://github.com/mulesoft-labs/raml-dotnet-tools), and [raml-for-jaxrs](https://github.com/mulesoft/raml-for-jax-rs) with all being either already updated or a PR on Github pending for the RAML 1.0 support. Whereas Osprey and raml-dotnet-tools are pretty advanced already, raml-for-jaxrs needs a bit more attention. I would encourage everyone to try and give feedback for this PR.

In addition to some of the core tools, Jumpscale is currently developing [go-raml](https://github.com/Jumpscale/go-raml) a code generator for client and server based on the Go programming language. Check out their repo!

### Others

Modeling data using RAML data types is one of the new features in RAML 1.0 and removes the need for defining them in a specific format like JSON schema. Although, RAML data types do not eliminate the necessity of these formats. Building your models in RAML and generate JSON schema that you can use in your existing ecosystem is paramount. As people asked for a tool that can generate JSON schema from RAML data types or the other way around; the team around the RAML Workgroup has built [ramldt2jsonschema](https://github.com/raml-org/ramldt2jsonschema) that will help with that.

Furthermore, RAML data types got its own [module](https://github.com/raml-org/typesystem-ts) to work with the data type system. It lets you even validate an instance against an existing RAML data type. This is vital for any mocking service or other server related tools to verify incoming requests against the types defined in RAML.

The last months went well with lots new tooling and exciting development, and we hope to see more coming up in the future. If you have any tool that you want to make others aware of, please do not hesitate to write us an email at info@raml.org. You can also leave us a tweet @ramlapi and let us know what tools you currently miss?

## Community

What is an essential part of any open source project? The community. We believe we have a very dedicated group that love what RAML provides and are keen to contribute making RAML a success. Since May, we have been active in several meetups such as [API Addicts](http://www.meetup.com/ApiAddicts/) or [London MuleSoft User Group](http://www.meetup.com/London-Mule-ESB-Meetup/), and also created our very first RAML dedicated [Meetup in SF](http://www.meetup.com/RAML-Meetup-San-Francisco-Bay-Area/) in cooperation with AvenueCode that we hope to host globally soon. The RAML MVP's were also busy presenting RAML on different conferences like [JAX London](https://jaxlondon.com/session/crafting-web-apis-that-others-love-an-introduction-to-raml-1-0/).

Additionally, there is much more going on in the RAML community such as the new [RAML MVP program](http://raml.org/mvp) designed to get you involved with the RAML community, share best practices, and network with RAML users from all over the world. We also had the first little hackathon with Spotify's Lynn Root on the Python parser in Washington DC, and by the end of this month we will send out our first newsletter that contains interesting news and updates as well as other useful information.

The next event is currently planned for November 10th in San Francisco. Guest speaker is Uri Sarid, CTO at MuleSoft, and creator of the RAML project. Please find more information [here](http://www.meetup.com/RAML-Meetup-San-Francisco-Bay-Area/events/234535357/).

Lots of good events and presentation from our MVPs. Thank you all!

Closing up, many ask us where we are and what's going on especially around the tooling area. I hope that this article could help give some insights, but there might be much more out. Let us know if there is anything we should be aware of either by email info@raml.org or by tweeting us @ramlapi.

Please bear in mind that as we grow it becomes more important that the community supports each other by helping where needed; even if it is simply reviewing implementation and give feedback to developers. It is your turn now!

The RAML Workgroup