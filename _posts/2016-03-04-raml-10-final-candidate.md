---
layout: page
title: "RAML 1.0 Final Candidate"
date: 2016-03-04 13:11:43
comments: true
categories : [News , Updates]
author: Uri Sarid
tag:
---

We’re about to finalize the next version of RAML. Last month we published the result of many months of community feedback, development modeling, and API analysis, in which we figured out how [a rather small number of changes in RAML 1.0][1] (relative to its predecessor, RAML 0.8) could result in dramatic improvements to the modeling capabilities. The list resolves some gaps, enhances capabilities, and maintains the simplicity of RAML. This month, that list will turn into RAML 1.0.

 [1]: https://github.com/raml-org/raml-spec/issues?q=is:open%20is:issue%20milestone:v1.0

Why so few changes?

First, because RAML 0.8 has been working out quite well for an amazing spectrum of developers, companies, and entire enterprises. Quietly, behind the scenes and often with little fanfare, we've seen experimentation turn into adoption and finally into standardization. Much of it is behind the scenes, where the majority of APIs lie today. Some is in the open, as public APIs, though you can't always tell it's RAML that defines them and enables their lifecycle. Household names such as Cisco, Spotify, British Sky Broadcasting, SAP Hybris, Oracle's Mobile Cloud Service, Anheuser Busch, and Sonic Drive In are some of the notable names, but there are major banks, retailers, healthcare companies, car companies, major industrial manufacturers, and of course numerous smaller companies across the spectrum who have adopted it internally. In many cases they've written their own tools and projects, as have independent developers -- [hundreds have been open-sourced so far on github][2]. Despite its limitations as a first release, it's working quite nicely where it matters: in the real world, in the API economy.

 [2]: https://github.com/search?o=desc&q=raml&s=updated&type=Repositories

Which brings us to the second reason for so few changes: we've spent almost a year carefully studying the list of candidates that's been accumulating for the next version of RAML. This was born out of experience with APIs both internal and external, simple and complex, in fast-moving and in highly-conservative environments. About 50 candidates for changes were created and published as github issues, out of the feedback of the first year of RAML 0.8, and then we went to work on them, along two tracks. In one track, we studied which of them reflected the major pains people in the RAML and swagger and API Blueprint communities were experiencing. Were there things all of us were missing? Were there lessons to be learned from the other specs, as they had been learning from RAML? What could we tell by selecting the most popular public APIs and expressing them thoroughly in RAML, via MuleSoft's [100 APIs project][3], including schemas and functional tests? In a parallel track, a small team of developers was tasked with building a dynamic workbench in which we could all play with variations of a next-gen RAML and feel, concretely and viscerally, what it would be like to design or capture an API in various ways. To allow us to iterate rapidly, RAML itself had to be modeled precisely from the ground up, with all the tooling you'd expect for a productive API development and consumption lifecycle being auto-generated based on this model for RAML. Then we changed the model this way and that, and could immediately see the changes reflected in the tooling and hence in the API design and capture and usage experiences.

 [3]: https://anypoint.mulesoft.com/apiplatform/popular/#/portals

And that, in turn, explains the third reason for the simplicity of the RAML 1.0 proposal: because RAML's primary design principle is to be as simple as possible to write and to read, while encouraging simplicity and reusability of design. This could not be a pile-on of features. We had to resist bloat at all costs, and had to find solutions that not only didn't introduce complexity -- they'd eliminate it where possible, while making the overall experience even more powerful and delightful.

The result was expressed in the short list of candidates [published to github][1] in September. In summary, RAML 1.0 brings:

**Data types**: a unified, streamlined, and powerful way to model data wherever it appears in an API. We've eliminated the special syntax of "named parameters" (which applied to URI parameters, query parameters, headers, and form parameters). We've eliminated the need to remember the intricacies of XML and JSON Schema -- but you can still use XML and JSON Schema if you like, or use just sub-schemas from them, and embed them anywhere in a data type hierarchy. There is now one easy way to model data, as a set of reusable types, with a clean, easy, YAML-based syntax. An example of a RAML 1.0 API definition showing a few aspects of the new type system appears in the examples section at the bottom.

**Improved examples**: RAML finally allows documenting every part of the API with multiple examples, which can now be expressed in YAML, can be validated, and can be annotated to inject semantics about which example applies in which case.

**Annotations**: RAML is now extensible, allowing annotations to be declared and typed and then applied in various places in the RAML syntax, essentially as extra properties beyond those built into RAML.

**Overlays**: To add layers of metadata to an API without weighing down the interface itself, the non-structural aspects of the API -- descriptions, annotations, examples, etc -- can be separated from the main RAML file and kept in separate files that a RAML processor may overlay on the main RAML file without affecting its structure. This is useful for localizing human-readable documentation, or for vendor-specific and implementation-describing annotations that should not be in the contract between provider and consumer.

**Libraries**: To foster even more reuse and leverage of RAML's data types, resource types, traits, and security schemes, sets of reusable assets may be contained in RAML 1.0 libraries, then imported into an API definition using the standard RAML `!include` tag, with built-in namespacing.

**Improved security schemes**: OAuth support has been rounded out to fill the few gaps that were exposed; a new APIKey schema has been standardized for APIs that simply need tokens in the right places; new (custom) security schemes may now be strongly typed; and extension points with scripting hooks may be defined, attaching custom functionality where needed, e.g. to digitally sign requests.

Those are the more significant changes, but there are a number of smaller ones you can find in the github issues list. We hope you'll agree it's still streamlined, writeable as well as readable, and an even better construct for modeling practically-RESTful APIs.

If you like RAML 0.8, you can continue to use it, in most cases also with tools that expect RAML 1.0 with only minor changes; there are few breaking changes in 1.0. And if you like RAML 1.0 more, you can slowly evolve to it by starting to embrace its features. Of course, if you're starting from scratch, RAML 1.0 will make your API modeling even more effective and satisfying.

As always, let's continue the dialog in the forums, in github issues, and in the comments on this post. By the end of this month, the plan is to finalize and publish the RAML 1.0 spec... and that workbench mentioned above ;-)

-- Uri, on behalf of the RAML Workgroup

* * *

***Example 1: Data Types***

<pre>#%RAML 1.0

title: A CRUD API for Users and Groups
mediaType: application/json

types:

  ###############
  # Common:
  ###############

  Email:
    pattern: "^\\w+(\\.\\w+)?@company.com"

  StaticGroupNums:
    description: Predefined user groups
    enum: [ 12, 26, 30, 31, 32 ]

  DynamicGroupNum:
    description: Dynamically-defined user groups
    pattern: "D\\-\\d+"

  RecordId:
    usage: An id of any record in the system
    type: number

  Record-base:
    usage: Pattern for any record in the system
    properties:
      id:
        type: RecordId
        required: true
      created:
        type: date
        required: true

  ###############
  # User:
  ###############

  User-base:
    usage: The base type for user records
    properties:
      firstname:
        required: true
      lastname:
        required: true

  User-new:
    usage: Data for creating a new user
    type: User-base
    properties:
      HRAuth:
        description: Authorization received from HR
        required: true

  User-update:
    usage: Changeable properties of an existing user
    properties:
      firstname:
      lastname:

  User:
    usage: A user in the system
    type: [ User-base, Record-base ]
    properties:
      emails: Email[]

  ###############
  # Group:
  ###############

  Group-base:
    usage: The base type for group records
    properties:
      name:
        required: true

  Group-new:
    usage: Data for creating a new group
    type: Group-base
    properties:
      ITAuth:
        description: Authorization received from IT
        required: true

  Group-update:
    usage: Changeable properties of an existing group
    properties:
      name:

  Group:
    usage: A group in the system
    type: [ Group-base, Record-base ]
    properties:
      groupnum:
        type: StaticGroupNums | DynamicGroupNum
        required: true

resourceTypes:

  ###############
  # Collection:
  ###############

  collection:
    get:
      responses:
        200:
          body:
            properties:
              total:
                type: number
                required: true
              members: &lt;&lt;typename&gt;&gt;[]
    post:
      body:
        type: &lt;&lt;typename-new&gt;&gt;
      responses:
        201:
          headers:
            Location:
              required: true
          body:
            type: &lt;&lt;typename&gt;&gt;

  ###############
  # Member:
  ###############

  member:
    get:
      responses:
        200:
          body:
            type: &lt;&lt;typename&gt;&gt;
    patch:
      body:
        type: &lt;&lt;typename-update&gt;&gt;
      responses:
        200:
          body:
            type: &lt;&lt;typename&gt;&gt;
    delete:
      responses:
        204:

  deleteOnlyMember:
    delete:
      responses:
        204:

###############
# API:
###############

/users:
  description: All the users
  type:
    collection:
      typename: User
      typename-new: User-new
  /{userId}:
    description: A specific user
    uriParameters:
      userId: RecordId
    type:
      member:
        typename: User
        typename-update: User-update
    /groups:
      description: The groups to which this user belongs
      type:
        collection:
          typename: Group
          typename-new: RecordId
      /{groupId}:
        type: deleteOnlyMember
        delete:
          description: Remove this user from this group
/groups:
  description: All the groups
  type:
    collection:
      typename: Group
      typename-new: Group-new
  /{groupId}:
    description: A specific group
    uriParameters:
      groupId: RecordId
    type:
      member:
        typename: Group
        typename-update: Group-update
    /users:
      description: The users belonging to this group
      type:
        collection:
          typename: User
          typename-new: User-new
      /{userId}:
        type: deleteOnlyMember
        delete:
          description: Remove this user from this group

</pre>

* * *

***Example 2: Data Types Using Libraries***

<pre>#%RAML 1.0
title: A CRUD API for Users and Groups
mediaType: application/json

uses:
  - Common: !include libraries/types/common.raml
  - User:   !include libraries/types/user.raml
  - Group:  !include libraries/types/group.raml
  - CRUD:   !include libraries/resourceTypes/crud.raml

/users:
  description: All the users
  type:
    CRUD.collection:
      typename: User.full
      typename-new: User.new
  /{userId}:
    description: A specific user
    uriParameters:
      userId: Common.RecordId
    type:
      CRUD.member:
        typename: User.full
        typename-update: User.update
    /groups:
      description: The groups to which this user belongs
      type:
        CRUD.collection:
          typename: Group.full
          typename-new: Common.RecordId
      /{groupId}:
        type: CRUD.deleteOnlyMember
        delete:
          description: Remove this user from this group
/groups:
  description: All the groups
  type:
    CRUD.collection:
      typename: Group.full
      typename-new: Group.new
  /{groupId}:
    description: A specific group
    uriParameters:
      groupId: Common.RecordId
    type:
      CRUD.member:
        typename: Group.full
        typename-update: Group.update
    /users:
      description: The users belonging to this group
      type:
        CRUD.collection:
          typename: User.full
          typename-new: User.new
      /{userId}:
        type: CRUD.deleteOnlyMember
        delete:
          description: Remove this user from this group
</pre>

* * *

***Example 3: `libraries/resourceTypes/crud.raml`***

<pre>#%RAML 1.0 Library

mediaType: application/json

resourceTypes:

  ###############
  # Collection:
  ###############

  collection:
    get:
      responses:
        200:
          body:
            properties:
              total:
                type: number
                required: true
              members: &lt;&lt;typename&gt;&gt;[]
    post:
      body:
        type: &lt;&lt;typename-new&gt;&gt;
      responses:
        201:
          headers:
            Location:
              required: true
          body:
            type: &lt;&lt;typename&gt;&gt;

  ###############
  # Member:
  ###############

  member:
    get:
      responses:
        200:
          body:
            type: &lt;&lt;typename&gt;&gt;
    patch:
      body:
        type: &lt;&lt;typename-update&gt;&gt;
      responses:
        200:
          body:
            type: &lt;&lt;typename&gt;&gt;
    delete:
      responses:
        204:

  deleteOnlyMember:
    delete:
      responses:
        204:
</pre>

* * *

***Example 4: `libraries/types/common.raml`***

<pre>#%RAML 1.0 Library

types:

  Email:
    pattern: "^\\w+(\\.\\w+)?@company.com"

  StaticGroupNums:
    description: Predefined user groups
    enum: [ 12, 26, 30, 31, 32 ]

  DynamicGroupNum:
    description: Dynamically-defined user groups
    pattern: "D\\-\\d+"

  RecordId:
    usage: An id of any record in the system
    type: number

  Record-base:
    usage: Pattern for any record in the system
    properties:
      id:
        type: RecordId
        required: true
      created:
        type: date
        required: true
</pre>

* * *

***Example 5: `libraries/types/user.raml`***

<pre>#%RAML 1.0 Library

uses:
  - Common: !include common.raml

types:

  base:
    usage: The base type for user records
    properties:
      firstname:
        required: true
      lastname:
        required: true

  new:
    usage: Data for creating a new user
    type: base
    properties:
      HRAuth:
        description: Authorization received from HR
        required: true

  update:
    usage: Changeable properties of an existing user
    properties:
      firstname:
      lastname:

  full:
    usage: A user in the system
    type: [ base, Common.Record-base ]
    properties:
      emails: Email[]
</pre>

* * *

***Example 6: `libraries/types/group.raml`***

<pre>#%RAML 1.0 Library

uses:
  - Common: !include common.raml

types:

  base:
    usage: The base type for group records
    properties:
      name:
        required: true

  new:
    usage: Data for creating a new group
    type: base
    properties:
      ITAuth:
        description: Authorization received from IT
        required: true

  update:
    usage: Changeable properties of an existing group
    properties:
      name:

  full:
    usage: A group in the system
    type: [ base, Common.Record-base ]
    properties:
      groupnum:
        type: StaticGroupNums | DynamicGroupNum
        required: true
</pre>