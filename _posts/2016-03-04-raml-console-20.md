---
layout: page
title: "RAML Console 2.0"
date: 2015-03-03
categories : [Tooling , Updates]
author: christianvogel
tags : [raml-console, tooling]
comments: true
---

MuleSoft has released a couple of new key features around their Anypoint Platform offering in February 2015. One in particular is interesting for the RAML community. The RAML console got a refreshed UI as well as new features which I will briefly explain here.Before we start, for everyone who does not know the console, let’s have a quick overview of it. The RAML console is an open source application and gives you a graphical insight of your API specification. It lists all resources and by clicking on the attached HTTP verbs on a specific resource you will be able to deep dive into the resource details. The detail page features a general description, descriptions of every possible HTTP status, examples and schemas on the response’s and/or request’s body, and other aspects you defined in your RAML specification.So what really is new? As I said - the UI was completely refreshed and got a more modern look & feel.  Below you can see before and after examples of the changes made:  

![Before](/post_images/96A2F870-4D10-4739-B5FC-D0E63F7952D7.png "Before") 

**Before**  

![after](/post_images/08A40F3D-83F0-417C-A8EF-A49CF32054F5.png "after") 

**After**  

The new console also introduces two other new functionalities. The first is the ability for users to add custom headers or query parameters as part of their calls to the target API. This feature enables you, for example, to get a specific response mime type by adding the `Accept` header, or client id and secret if you have an API implementation expecting you to send those credentials.

![](/post_images/F52032BC-C20F-4C8E-BAEE-7ED60EB441DE.png) 

The second new feature is another UI improvement. You are now able to see the documentation that is part of the RAML’s header, in an easy to browse pane separate from the specific resource descriptions. 

![](/post_images/32682258-D839-42E5-9CC6-554793D615E5.png)  

I hope you like the new capabilities and UI, and if you do miss something or have any constructive feedback, please let the MuleSoft team know on the project's Github repository (see [https://github.com/mulesoft/api-console](https://github.com/mulesoft/api-console)).Original post from MuleSoft: [http://blogs.mulesoft.org/release-anypoint-platform-api-2015-02/](http://blogs.mulesoft.org/release-anypoint-platform-api-2015-02/)