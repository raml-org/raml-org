---
layout: page
title: "Osprey is out!"
date: 2014-05-16
categories : [uncategorized]
author: Norberto L. Herz
tags:
---

**MuleSoft releases the first NodeJS RAML implementation and its name is Osprey.**

<p dir="ltr">
  I'm really happy to announce that we've made <a href="https://github.com/mulesoft/osprey">Osprey</a> available to the RAML community. Osprey is a NodeJS-based framework conceived with the mission of developing RESTful APIs in a really easy (and IMHO happy) way. Since it's based on the <a href="http://raml.org">RAML standard</a>, it responds to a conventional way of defining, creating and documenting RESTful APIs, which turns to be really convenient, especially because:
</p>

*   RAML Standard will make your API intuitive.
*   Automatic and interactive documentation will make your API **obvious**.
*   Ability to reuse RAML ecosystem tools (Designer, API Console) will make your life easier.

**Osprey is not alone.** While we were building Osprey (the brilliant Sherlock Holmes), we have also thought about an optional but extremely useful partner: **[Osprey-CLI][1]** (the loyal Dr. Watson) is a command line tool that will allow you to scaffold an Osprey application in the blink of an eye. Having said that, Osprey "suite" allows you to create your NodeJS REST API, interactive documentation with minimum effort, and, of course, a clear path for you to keep going from there. **And if it isn't enough, you can choose between these two flavours: javascript or coffeescript. **

 [1]: https://github.com/mulesoft/osprey-cli

<p dir="ltr">
  Before going further, it's important to mention that Osprey is open-source and Apache 2.0 licensed and can be found on the <a href="http://raml.org/projects.html">projects list of RAML official website</a>.
</p>

<p dir="ltr">
  <strong>Fundamentals.</strong> Osprey is based on NodeJS + Express framework. Taking advantage of running on the server side, answering http requests in a relatively "transparent for the developer" way, it allows to implement an API and hook it up with the custom logic behind it.
</p>

<p dir="ltr">
  Sounds good? Let’s translate this into a minimum piece of code to explain it better:
</p>

<pre>api = osprey.create('/api', app, {
 &nbsp;ramlFile: path.join(__dirname, '/assets/raml/api.raml'),
 &nbsp;logLevel: 'debug'
});</pre>

<p dir="ltr">
  So, the api variable will be representing an instance of an API:
</p>

*   Based on the /assets/raml/api.raml file.
*   Referencing "app", an Express Application.

By default, it will also:

*   Perform default validations based on defined parameters data-types and schemas.
*   Respond with mocks if not custom handler definition.
*   Publish the API Console.

You can disable these options by setting some osprey.create() parameters to false.

<p dir="ltr">
  Ok, That's easy, but what does <strong>"ability to extend the handlers to place my custom logic"</strong> mean?
</p>

Actually, it is the way of hooking the API up with your custom logic.

<pre>api.get('/teams/:teamId', function(req, res) {
 &nbsp;//// Your business logic here!
 &nbsp;res.send({ name: 'test' })
});</pre>

<p dir="ltr">
  This piece of code is basically defining that the handler for the resource "/teams:teamId" (a team), when invoked by "get", will be the anonymous function (receiving http request and response objects as parameters). <strong>Yes, I know, almost a no brainer</strong>. But let's clarify some important details:
</p>

*   Defining the handler doesn't destroy any of the out-of-the-box functionalities provided by Osprey  (such as, validations and default parameters). It is conceptually extending the default functionality.
*   The handler definition only overwrites the mocking functionality: This means that, by default (and if mocks are enabled), Osprey will respond to any particular request with a Mock (that's basically using the example provided on the RAML file). Once that the handler is defined, Osprey will respond with the result of the custom logic execution (in the sample code, "{name: 'test'}"). In that case, the example of the RAML file will only be shown on the API Console as part of the interactive documentation (under the example tab).

<p dir="ltr">
  <strong>Where do we start?</strong>
</p>

<p dir="ltr">
  We are working on a specific Osprey site with cool tutorials and step-by-step instructions. Meanwhile, you can follow the documentation provided on the GitHub readme files. Personally, I would start by:
</p>

*   Checking the sample included in Osprey repo (examples folder).
*   Running the sample, checking the API console, and even trying to write some custom code.
*   Scaffolding an application with Osprey-CLI and building your own API.

<p dir="ltr">
  <strong>What is next?</strong>
</p>

We will continue working in new versions of Osprey, and supporting the tool. You can contribute by opening issues on GitHub, writing code code by yourself, and submitting it through pull request, and contacting us via the [RAML forum][2]. Also, feel free to contact me [here][3]. **Credits** Thanks to the actual brain behind this implementation:[ Javier Centurion][4]. Happy APIs!

 [2]: http://forums.raml.org
 [3]: http://twitter.com/nohorbee
 [4]: https://twitter.com/jcenturion86