---
layout: page
title: "A Review of Austin"
date: 2015-12-14
categories : [uncategorized]
author: Mike Stowe
tags :
comments: true
---

A few weeks ago I had the privilege of attending and speaking at the API Strategy and Design Conference in Austin, TX. First and foremost, if you haven't been to Austin, and you get the chance to go - do. The key takeaway, Frank's - a hotdog joint where you can order ridiculous hotdogs and get cheesy fries with salsa (absolutely a delicious heart attack waiting to happen).

The other takeaways:

## APIs are Critical to Success

Businesses everywhere are realizing just how important APIs are to their success. No longer can businesses afford to be silo'd, but even the most isolated companies find themselves now implementing SaaS services and having to extend their platform.

The real takeaway is, if you don't invest in your API, you can be sure your competitors will invest in theirs. And developers and consumers alike are shifting to a platform as a services (PaaS) mindset.

## Models Are Key

During the hypermedia track, we took a look at the specifications out there (including Collection+JSON, HAL, Siren, CPHL, and others).

Once again, we all agreed on a simple concept, and that was hypermedia within APIs is not yet what it should be - and we need to find a way to move hypermedia forward and make it more extensive, flexible, and useful - going beyond providing links just for humans (ie developers to implement) by providing links that are truly diverse and machine readable.

One of the keys to this, [as I hypothesized][1], is transitioning from strict schemas (which will still work, but require more work on the server and client side) to models (which RAML 1.0 allows with it's Data Types). Models change how data is represented, provide concise information, and can be used by servers and clients alike across multiple languages - and content-types.

 [1]: http://www.slideshare.net/mikestowe/rest-to-the-future

## Designing an API is Hard

It's one thing to say we're going to have an API, but actually building an API is hard. During the API Definitions track we heard from those who believe specifications play a critical role in the creation of APIs, to those who struggled to see the benefits.

There was also much talk about the different specifications available, including of course RAML, as well as Swagger, API Blueprint, IO Docs, and WADL.

Jakub Nesetril, CEO of Apiary, had a simple take: It's about the tools.

Myself, and Tony Tam viewed it from a slightly different approach (see my description of [Spec Driven Development][2]), but essentially all three of us agreed that designing your API first is a key component to its success, and failure to design your API for the long-term results in an API that only lasts for the short-term (whether you meant it to be or not).

 [2]: http://www.mikestowe.com/2014/11/what-is-spec-driven-development.php

## Encompass the full Lifecycle

When choosing a specification, it's also important to choose one that gives you the most flexibility, and lets you encompass the full API lifecycle. This is something both RAML and Swagger excel at (and soon, RAML will even let you export Swagger), having a large ecosystem of both open source projects and vendor solutions to let you design, build, test, document, and share your API.

But you also need to encompass the full Software Development Lifecycle (SDLC), and only [RAML 1.0][3] lets you take advantage of code reuse, libraries, annotations, and overlays so that your specification can be used again and again for multiple vendors, and multiple development, QA, and production environments.

 [3]: http://www.slideshare.net/mikestowe/raml-10-release

## Get Involved

The ending keynote closed with the moderators reminding us that everyone is an expert in their own ways. Whether brand new to APIs, or having worked with APIs for years - good ideas (and bad ones) can come from anyone.

We need more people building tooling surrounding the different specifications (but preferably RAML), and more people trying things out and creating new techniques/ innovations (just do it on a dev/ personal environment- not in production).

After all, the only ones who can change our future is us. Or as my last slide quote read:

> "If you always do what you've always done, you'll always get what you always got." - Henry Ford

## Last but Not Least

If you haven't seen Tony Blank (from SendGrid) play the guitar - you need to get him to send you a video or go to one of his talks. Absolutely amazing, just like API Strat Austin was.

And if you missed out on getting [a free print copy of my book][4], you can always get the e-version (or buy a hard copy) [here][5].

 [4]: https://twitter.com/mamund/status/667837522500677632
 [5]: http://www.mikestowe.com/books