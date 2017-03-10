---
layout: page
title: "[Update] RAML 1.0 Current Status"
date: 2016-02-29
comments: true
categories : [News , Updates]
author: christianvogel
tag:
---

As our journey to finalize RAML 1.0 continues, let us do a short stop talking about our the next release candidate RC2. When we released the very first release candidate (RC1) for RAML 1.0 back in November, who would have thought that we get the tremendous amount of feedback in the form of excellent reviews for the newly added features, but also in a fair amount of constructive feedback. For us, that was already a huge success and has shown us that we are on the right track. Now that we collected all the feedback for RC1, we need to do another analysis on all the open issues around that, decide what to do with them in RC2, before we start working to incorporate these changes.

The RAML community is an essential and very critical part to make RAML successful. We understand that very well, therefore, listening to every single feedback from you. Out of all these, one of the constructive feedback we got was around our process visibility and the ability to better track any changes to the specification. Especially now that we move from one release candidate to another. We had our reasons for doing it in a different way but recognize the need to change our mind in favor for the better. As of today, you can track our progress on the respective Github repository for the RAML specification [here][1]. So far, you have only seen the content for the prior 0.8 version, but now you can switch to our newly created branch called `raml-10` to see the content for both; 0.8 and 1.0. As we are moving to RC2, there is also a version branch called `raml-10-rc2` that we use to continue iterate through fixing spelling or grammar mistakes, improving content in general, and adding the changes tracked [here][2] before merging it back to the main `raml-10` branch. Moreover, you know what the best is about all that, you can help us to improve the content from now on as well. As per our new [contribution guidelines][3], you can just fork the RC2 version branch, introduce fixes as long as they are spelling or grammar mistakes, and create a pull request that one of the RAML Workgroup members reviews before it gets merged. So we not only provide better visibility, but also a level of contribution where you can help us to improve the content. In parallel with moving to be more visible through the new process, we also redirect any request to the original web page that hosted the documentation for RAML 1.0 RC1 to our Github repository.

 [1]: https://github.com/raml-org/raml-spec/
 [2]: https://github.com/raml-org/raml-spec/labels/raml10-rc2
 [3]: https://github.com/raml-org/raml-spec#how-can-i-contribute

So far so good, what changes can you expect in RC2 and how long till GA? As for GA, we cannot predict that without knowing the full impact on RC2. Although, we think that it will not take too long after we release RC2. The reason is that most significant changes are introduced in RC2. Having a milestone release in form of a release candidate before GA enables our community to have a last proofread before finally releasing RAML 1.0. We promise to update you on any dates as soon as possible. Please bear with use just a bit more.

Regarding what you can expect in RC2, the following is just a small list of changes:

*   Any issues labeled with [raml10-rc2][2] on raml-org/raml-spec
*   Some issues labeled with [raml10-rc1][4] that are still open
*   Improved content by not only fixing spelling and grammar mistakes but also the overall experience navigating through the spec, and more
*   Improved introduction section that focuses on people without any knowledge about RAML
*   And probably other smaller improvements

 [4]: https://github.com/raml-org/raml-spec/labels/raml10-rc1

In summary, you can expect quite some changes to not only the specification but also the way we are engaging with our community. We also added a [Wiki page][5] on our raml-spec repository to summarize the plan and the branch structure we use for RC2.

 [5]: https://github.com/raml-org/raml-spec/wiki/RAML-1.0-RC2---Plan

The RAML Workgroup