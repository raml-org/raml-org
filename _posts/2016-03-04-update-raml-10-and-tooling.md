---
layout: page
title: "Update on RAML 1.0 and Tooling"
date: 2015-12-01
comments: true
categories : [News , Tooling , Updates ]
author: Uri Sarid , christianvogel
tag:
---

Wow, the 2 weeks since our last blog posts have been amazing, again. We've received an incredible amount of great feedback for the RAML 1.0 RC specification itself, and for the tooling (especially API Workbench), via email, and twitter, and the RAML.org forum, and github, even in person. Reading all these has been a real pleasure, and had demonstrated not only that things are on the right track with 1.0 and the tooling but also generally the value that a very broad community gets from RAML and its ecosystem. So where are things now -- how close are we to finalizing 1.0?

It's been a month since the 1.0 RC was published, and it's now looking like it'll take another couple of weeks or so to fully finalize it. We're making a lot of improvements in the wording and in the specificity, correcting some typos and examples, disambiguating in a few remaining places, and also tweaking some functionality based on this very constructive feedback. Here are highlights of those tweaks and improvements:

*   the standard for the date format will change from RFC2616 to RFC3339 (see [the forum discussion][1], [issue 202][2], and [issue 15][3])
*   we're simplifying further how one specifies annotation values (see [issue 196][4])
*   we will add a section on overloading to prescribe how RAML 1.0 handles overlapping resources and methods (see [issue 199][5])
*   we're clarifying the "deprecation for schemas" wording so it's manifest that JSON and XML Schema support is not going away, just the keywords "schema” and "schemas" are deprecated in favor of "type" and "types" (see [issue 200][6])
*   we're improving how libraries are included into RAML specs via `uses` (see [issue 207][7] and [issue 204][8])

 [1]: http://forums.raml.org/t/proposal-alternative-date-type-in-raml/941/6
 [2]: https://github.com/raml-org/raml-spec/issues/202
 [3]: https://github.com/raml-org/raml-spec/issues/15
 [4]: https://github.com/raml-org/raml-spec/issues/196
 [5]: https://github.com/raml-org/raml-spec/issues/199
 [6]: https://github.com/raml-org/raml-spec/issues/200
 [7]: https://github.com/raml-org/raml-spec/issues/207
 [8]: https://github.com/raml-org/raml-spec/issues/204

You have full visibility on all the issues mentioned above and more on the [dedicated raml-spec Github account][9]. To incorporate all this great feedback, we're going to postpone a bit the finalization of RAML 1.0 until later in December, and make sure we get it right.

 [9]: https://github.com/raml-org/raml-spec/issues

**And on the tooling front?**

Naturally, with the tweaked RAML 1.0 spec, we also need to tweak the parsers -- plus we've been working with consumers of the parsers to improve and finalize their APIs. Look for those parsers ([JavaScript][10] and [Java][11]) to get updated and finalized later in December as well.

 [10]: https://github.com/raml-org/raml-js-parser-2
 [11]: https://github.com/raml-org/raml-java-parser-2

As for other tools -- look for the latest announcements regarding API Workbench later this week on the [MuleSoft blog][12] as well as other RAML 1.0 tooling and projects we'll be adding to the [projects page][13].

 [12]: http://blogs.mulesoft.com/
 [13]: http://raml.org/projects/projects