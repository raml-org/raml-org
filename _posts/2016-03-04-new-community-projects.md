---
layout: page
title: "New community projects"
date: 2014-04-05
categories : [uncategorized]
author: Norberto L. Herz
tags:
comments: true
---

We're excited that RAML is catching on, the community is growing, and developers from all over the world are building and publishing new and exciting tools  for everyone to **use and contribute to.** We have published two of these tools (details below) on the [RAML projects page](http://raml.org/projects) this week, and hope you get a chance to try them out.

RAML to HTML

An easy-to-install and even-easier-to-use command line interface that takes a RAML file and generates documentation in a single HTML page (the only dependencies are [bootstrap](http://getbootstrap.com/) and [jQuery](http://jquery.com/)). The installation and usage instructions can be found [here](https://www.npmjs.org/package/raml2html), but due to its simplicity, I can just copy into two single lines:

    npm i -g raml2html

    raml2html example.raml > example.html

The generated page is clean and smart:

![Screen-Shot-2014-04-04-at-8.55.45-PM.png](/post_images/Screen-Shot-2014-04-04-at-8.55.45-PM.png "Screen-Shot-2014-04-04-at-8.55.45-PM.png")

_Screenshot of the page showing all resources and methods_

![Screen-Shot-2014-04-04-at-8.56.07-PM.png](/post_images/Screen-Shot-2014-04-04-at-8.56.07-PM.png "Screen-Shot-2014-04-04-at-8.56.07-PM.png")

_Screenshot of the page showing the method GET for the resource "songs"_

I said it was simple! Simple is good. You can find the [source code](https://github.com/kevinrenskers/raml2html) on Github and contribute to it (Personally, I would  love to see this project generating Markdown documentation too). Thanks to [@mixedCase](https://twitter.com/mixedCase) for this contribution.

ATOM RAML Package

I really hope you are already using [ATOM](https://atom.io/), _the hackable text editor _by [Github](https://github.com/) guys. If so, you will be happy to read that there is already a package for it that will help you when writing  RAML definitions. You can find the installation instructions and the code [here](https://github.com/n4ch03/atom-raml) for both **using and contributing.** The supported features thus far are Syntax Highlighting and Snippet code generation (just hitting tab when writing any HTTP verb).

[![Screen-Shot-2014-04-04-at-9.19.16-PM-300x217.png](/post_images/Screen-Shot-2014-04-04-at-9.19.16-PM-300x217.png "Screen-Shot-2014-04-04-at-9.19.16-PM-300x217.png")](/post_images/Screen-Shot-2014-04-04-at-9.19.16-PM.png)

**Idea for contributors: **Since ATOM is hackable, the same way it has a Markdown previewer, I'd love to see  dynamically generated HTML preview while I type (I guess that RAML to HTML project would be ideal to generate that HTML). Thanks to [@NachoEsmite](https://twitter.com/NachoEsmite) for this contribution.

Become a contributor

If you are thinking about great RAML tools, I would like to encourage you to **start contributing**. Here are a couple of recommendations:

*   Check GitHub for related projects: Sometimes it's better to contact another person working on the same idea you have.
*   Read and Open discussions in the [RAML Forum](http://forums.raml.org): You can find some interesting ideas, ask for opinions and reviews, publish your projects and invite contributors to join you.
*   Social Networking: If you haven't done it already, check Twitter to be up-to-date with the latests news from the community all around the world. #RAML is not being used by everyone, so I usually search for "RAML" and tweet with "#RAML".
*   If you have already developed a project and want it to be published in the [RAML projects list](http://raml.org/projects.html), just write to [mail:info@raml.org](info@raml.org)
*   Feel free to [contact me](http://twitter.com/nohorbee), if you have questions.

Cheers!