---
layout: page
title: "Guest Post: Clean Your APIs with RAML and SoapUI"
date: 2013-12-20
categories : [uncategorized]
author: Norberto L. Herz
tags:
---

_Federico Bongiovanni is a Development Engineering Manager at MuleSoft._ 

While I was visiting Brazil last week at the MuleSoft summit in [Sao Paulo](http://mulesoftsummitsaopaulo.splashthat.com/), somebody mentioned to me that SoapUI was now supporting [RAML](http://raml.org/). I took a look and quickly landed on this [blog post](http://olensmar.blogspot.com.ar/2013/12/a-raml-apihub-plugin-for-soapui.html) from Ole Lensmar, the creator of SoapUI. My first reaction was to be totally amazed. SoapUI is my favorite tool for testing web services. So I proceeded to install it, expecting something to not work at first try… but it worked seamlessly. After following the installation steps, in 5 minutes I had the RAML support just where I expected it.

Great! After that, I went ahead and imported a sample RAML file. Instantly I got the structure and skeletons for:

*   all the resources
*   all the actions
*   all my API!

It was respecting everything that was declared in my API spec. Even the examples and media types… so quick, so easy.

After that I was able to go ahead and make REST calls (because I already had an implementation of that API made with [APIkit](https://docs.mulesoft.com/apikit/)), create assertions, create a stress test and show some nice statistics changing at runtime. And all of that with a very few clicks: import RAML, create request, put some parameters… and voilá.

Kudos to Ole and the SoapUI team, this is an excellent contribution to the RAML community!