---
layout: page
title: "Announcing RAML 1.0 GA"
date: 2016-05-16 00:42:58
comments: true
categories : [News , Specification]
author: Nial Darbey
---

## Introduction

Since RAML was introduced to the world in its infant version 0.8 state, it has gained huge interest in the community. There has been adoption by large companies like Oracle and Amazon, and support for it now exists in popular tools like SoapUI, PostMan, Restlet, and RAMLfications.

Today we are excited to announce the release of RAML 1.0 GA ([release notes](https://github.com/raml-org/raml-spec/releases/tag/1.0)).

## What´s new?

The new feature set is extremely powerful and makes the case for RAML 1.0 really compelling. **Modularization** now comes in the shape of libraries which can be centralized outside of your API definition and thus reused across projects. **Data type declarations** are now written in YAML and are independent of the media types in use. **Examples** can now form part of the data type definitions, thus allowing you to keep your resource and operation declarations concise. **Annotations** give you tremendous new possibilities of client and server side processing of the API definition. They also represent a means to document your API in a concise and consistent manner. **Overlays and extensions** are modules which allow you to revisit your API definition in a separate document in order to modify and / or enhance either the resources and operations or merely information about them.

In the next section, we will introduce all the different new features in the context of an example. 

## Use Case

We have a fictitious e-commerce retail company: Álainn Cosmetics who builds a Mobile Shopping API that we focus our attention on in the next sections. Take a glance at the main definition.

[![Screen Shot 2016-05-15 at 7.51.31 PM](/post_images/Screen-Shot-2016-05-15-at-7.51.31-PM-1024x992.png)](/post_images/Screen-Shot-2016-05-15-at-7.51.31-PM.png)

Note the **#%RAML 1.0** header.

## Modules

[![Screen Shot 2016-05-15 at 5.38.00 PM](/post_images/Screen-Shot-2016-05-15-at-5.38.00-PM-1024x119.png)](/post_images/Screen-Shot-2016-05-15-at-5.38.00-PM.png)

We make use of the powerful [module](https://github.com/raml-org/raml-spec/blob/master/versions/raml-10/raml-10.md#modularization) usage feature with the **uses** node. This allows us to make reference to (local or remote) modules and apply namespaces to their usage in the document. Here we import traits and security definitions, which you are already familiar with. However, now we must alias the references with the keys _tra _and _sec. _You choose your alias and use it to qualify the reference throughout the document.

![Screen Shot 2016-05-15 at 5.18.02 PM](/post_images/Screen-Shot-2016-05-15-at-5.18.02-PM-1024x271.png)

Note how we prefix the reference to the searchable and imageable traits with _tra**.** _This helps avoid name conflicts as you could use multiple modules from various sources each with similarly named nodes. Reuse of type definitions, examples, resource types and traits are possible with modules.

[![Screen Shot 2016-05-15 at 6.24.54 PM](/post_images/Screen-Shot-2016-05-15-at-6.24.54-PM-1024x783.png)](/post_images/Screen-Shot-2016-05-15-at-6.24.54-PM.png)

Here, the whole traits section is defined in a separate Library. Note the **#%RAML 1.0 Library** declaration at the top. Remember, these must now be referenced using the namespace prefixes defined in the document which uses the Library. RAML 1.0 is completely modularized. Modules can use other modules.

## Data Types

RAML now allows us to [declare all body types in YAML format](https://github.com/raml-org/raml-spec/blob/master/versions/raml-10/raml-10.md#raml-data-types). We can declare custom types which are **objects**, **arrays** or **scalars**. **Properties** are like the fields in a Java class. They describe the members of **custom object types** that we define. Object types can extend other object types and multiple inheritance is allowed. Every declaration you make whether it be of type object, array or scalar can be constrained with facets. The minLength facet, for example, can restrict possible values of a string scalar to only those whose length matches minLength.

![Screen Shot 2016-05-15 at 5.19.27 PM](/post_images/Screen-Shot-2016-05-15-at-5.19.27-PM-1024x216.png)

The _GetItemsResponse _type is an object with two properties: _links_ and _collection_. The type of links is _ResourceLink_[], an array of the elsewhere defined _ResourceLink_ type. The type of collection is declared inline. It is an object with the properties size and items. The type of the items property is an array of _Item_.

![Screen Shot 2016-05-15 at 5.18.02 PM](/post_images/Screen-Shot-2016-05-15-at-5.18.02-PM-1024x271.png)

Before we look at the _ResourceLink_ and _Item_ definitions, watch how we use parameterization to resolve the reference to _GetItemsResponse_. The [resource type](https://github.com/raml-org/raml-spec/blob/master/versions/raml-10/raml-10.md#resource-types-and-traits) of /items is read-only-collection. We can use convention over configuration to determine the types of responses from each operation defined in the resource types.

![Screen Shot 2016-05-15 at 6.04.53 PM](/post_images/Screen-Shot-2016-05-15-at-6.04.53-PM-1024x376.png)

Because this extends base, the type of the response for the get operation is resolved dynamically by use of the **<<resourcePathName | !uppercamelcase>>** [function](https://github.com/raml-org/raml-spec/blob/master/versions/raml-10/raml-10.md#resource-type-and-trait-parameters). This means we have a consistent and concise way to reference each of the data types we have defined.

[![Screen Shot 2016-05-15 at 8.04.36 PM](/post_images/Screen-Shot-2016-05-15-at-8.04.36-PM-1024x587.png)](/post_images/Screen-Shot-2016-05-15-at-8.04.36-PM.png)

Returning to the definitions of _ResourceLink _and _Item_, watch how we elaborate on property definitions with the use of **facets** underneath them.

![Screen Shot 2016-05-15 at 5.19.48 PM](/post_images/Screen-Shot-2016-05-15-at-5.19.48-PM-1024x504.png)

Note how **optionality of properties** is stated with the **?** qualifier at the end of the property name. Using the **default** facet, we can supply default values for optional properties. The possible values of a string property can be restricted with the **enum** facet. [T](https://github.com/raml-org/raml-spec/blob/master/versions/raml-10/raml-10.md#type-expressions)ype expressions allow us to combine types. The type of the links property in _Item_ is defined as **(ResourceLink | ImageLink)[]**. This means that _links_ is an array of either _ResourceLink_ or _ImageLink_. 

## Examples

We can now [centralize all examples ](https://github.com/raml-org/raml-spec/blob/master/versions/raml-10/raml-10.md#defining-examples-in-raml)and couple them with their corresponding type definitions. Regardless of the media type in use, we define the examples in the same YAML format as the types.

[![Screen Shot 2016-05-15 at 6.11.17 PM](/post_images/Screen-Shot-2016-05-15-at-6.11.17-PM-1024x781.png)](/post_images/Screen-Shot-2016-05-15-at-6.11.17-PM.png)

Note how arrays are declared using a hyphen **-** . When the items in an array are objects, the hyphen is followed by the first property declaration with subsequent ones declared immediately below. The benefit of the approach we have adopted thus far (the combination of the dynamic resolution of types in resource type definitions based on a simple naming convention) is that we can have a very concise definition of the main part of the API. We can see all the resources and operations at a glance!

[![Screen Shot 2016-05-15 at 6.20.38 PM](/post_images/Screen-Shot-2016-05-15-at-6.20.38-PM-1024x831.png)](/post_images/Screen-Shot-2016-05-15-at-6.20.38-PM.png)

## Annotations

RAML 1.0 allows us to enhance the vocabulary of RAML itself with [annotations](https://github.com/raml-org/raml-spec/blob/master/versions/raml-10/raml-10.md#annotations). We exploit this feature here to inform the developers of the iPhone app about where to find hypermedia in the JSON responses we send back, and how their software should process them. **Annotation types** are defined in the same way as data types. The usage of annotations throughout the document is constrained by the values of the **allowedTargets** facet.

[![Screen Shot 2016-05-15 at 6.42.32 PM](/post_images/Screen-Shot-2016-05-15-at-6.42.32-PM-1024x743.png)](/post_images/Screen-Shot-2016-05-15-at-6.42.32-PM.png)

Here we constrain the usage of the _hypermedia-plan_ annotation so that it can only appear globally for the entire API or underneath a resource declaration. It is possible to declare annotations of a particular type like _hypermedia-plan_ by surrounding the declaration in parentheses (). 

## Overlays and Extensions

We now have a well-defined API with resources and operations, the types of their requests and responses as well as examples. We have the option to lace the declarations of the operations on the resources with the **(hypermedia-control)** annotation. Instead, we'll exploit a feature in RAML 1.0 that allows us to revisit all or part of the document and modify or enhance the definitions. This is done by **extending** the main definition with either an Overlay or an Extension. Overlays change only the non-behavioral aspects of the API definition, like documentation and descriptions. Extensions add to the behavior or an API definition. We can define more resources or add operations to existing ones with an extension.

![Screen Shot 2016-05-15 at 6.46.02 PM](/post_images/Screen-Shot-2016-05-15-at-6.46.02-PM-1024x326.png)

We exploit the Overlay module as a clean way of applying our hypermedia annotations to the API. Note how we are free to choose which nodes we want to extend. We are not obliged to revisit and redefine every node in the base definition.

## Summary

We have given you a glance at the enhanced power of RAML 1.0\. We encourage you to take a look at some of the capabilities in depth by [reading through the spec](https://github.com/raml-org/raml-spec/blob/master/versions/raml-10/raml-10.md). You can see the console for the RAML we defined in this blog [here](https://anypoint.mulesoft.com/apiplatform/alainn-cosmetics/#/portals/organizations/179e1a28-20ad-4d1f-b132-d3001f864368/apis/360/versions/70703/pages/103420) and the full RAML in our new [raml](https://github.com/raml-org/raml-examples/tree/master/others/alainn-mobile-shopping)[-examples](https://github.com/raml-org/raml-examples/tree/master/others/alainn-mobile-shopping) repository.