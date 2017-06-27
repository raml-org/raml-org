---
layout: page
title: "[Guest Post] API First with RAML - Development and documentation of REST APIs"
date: 2015-06-22
categories : [Guest Posts]
author: christianvogel
tags:
comments: true
---

I am really happy to post a new article in our category [Guest Posts]. This time, Kai Spichale talks a little bit about the API first approach with RAML. I hope you will enjoy his article and thank you Kai for contributing!

* * *

*There is no standard to describe REST APIs but different formats and best practices emerged over time and profited from the experiences of their respective predecessors. The latest addition to this series is RAML, a "RESTful API Modeling Language" that is discussed in this article as an important tool for API First Development.*

Good APIs are characterized by different quality criteria. These include consistency, ease of use and appropriate abstractions. Moreover a useful API documentation must not be underestimated or neglected. The documentation should be simple, understandable, and usable by many other developers. SOAP-based web services have always been described through WSDL documents, in a human and machine readable format. The WSDL document represents a contract between API providers and API consumers. RAML is a modern WSDL counterpart specifically for REST APIs. The RAML Spec is an open standard that was developed by the RAML workgroup and with support from MuleSoft. Although HATEOAS is not explicitly supported, RAML is suitable for many web APIs that rely on resources, methods, and HTTP.

## Alternative formats for REST metadata

The need to uniformly describe and document REST APIs is not new. API designers can nowadays choose between different formats for REST metadata. Such documentation has usually the following contents: entry points, resource paths, and a description of the methods to access resources (GET, PUT, etc.) including method parameters. The documentation also includes the supported formats (JSON schema, XML schema), and the status and error codes. Before diving into RAML, this section gives an overview of the main alternatives:

[Swagger][1] is a JSON format for describing REST APIs, which was developed by Reverb. According to Google Trends, it is one of the most popular technologies in this list along with WADL. Swagger UI belonging to Swagger is a user interface based on HTML/JavaScript. This open source tool is used to render interactive documentations that allow to conduct ad hoc tests. The strength of Swagger is its [extensive ecosystem on GitHub][2]. This includes code generators for different languages. Specifically for Java you get annotations. A good example is the [Swagger Petstore][3].

 [1]: http://swagger.io
 [2]: https://github.com/swagger-api
 [3]: http://petstore.swagger.io/

[WADL][4] was proposed to the W3C by Sun Microsystems in 2009, but was never adopted as a standard. Tools for code generation, test execution, and documentation are for example Jersey and Apache CXF. An good example is the [Jersey documentation][5].

 [4]: https://wadl.java.net/
 [5]: https://jersey.java.net/documentation/latest/wadl.html

[API Blueprint][6] was developed by Apiary. The Markdown format is well documented and the associated parser is open source. Once described with API Blueprint, a REST API, you can generate server mocks and a documentation with the apiary.io platform. The value of this format results mainly from the combination with the apiary.io platform. A good example is the [Kreuzwerker blog][7].

 [6]: https://apiblueprint.org/
 [7]: https://kreuzwerker.de/en/blog/posts/api-blueprint

[ioDocs][8] was developed by Mashary. The open source technology is based on a JSON format describing REST APIs. Based on the description, you can generate an interactive API documentation suitable for learning and experimenting with the API. Although some parts of ioDocs are open source, you benefit from a bunch of functions only through the use of the Mashery platform. You get a good impression from [this example][9].

 [8]: http://www.mashery.com/product/io-docs
 [9]: http://developer.rottentomatoes.com/io-docs

## RAML - a user-centric language

After the overview of the most common formats for describing REST APIs, the question is, what makes RAML special or different. RAML is the latest addition to this series, and its developers profited much from its predecessors WADL and Swagger.

RAML uses the file format YAML in order to describe APIs, which brings several advantages: e.g. it is easy to read and write because it contains relatively few brackets and other structural characters (e.g. colons). Additionally, you can represent with YAML clear hierarchies. An API description always starts with the used RAML version, followed by other basic attributes such as title, base URI, and API version. Furthermore, you can specify a documentation with individual chapters:

    #% RAML 0.8
    title: Example REST API
    baseUri: http://localhost:8080/{version}
    version: v1
    

The API description is followed by the paths to the resources, such as */articles*. The next level consists of the HTTP methods. At each level you can add to a resource as many methods as necessary, but any method can be used only once per level:

    /articles:
     get:
     put:
     post:
     /{articleId}:
      get:
    

In this example, users of the API can retrieve one or multiple items (GET), can update an item (PUT), or add a new one (POST). In addition to these methods, you can also use URI parameters like */articles/{articleId}*. Individual articles can be referenced using the identifier *articleId*.

Query parameters can be defined for each method individually. These are: parameter name, type, description, and an example. In order to use such definitions for several methods without repetition, RAML offers so-called traits. Recurrent patterns can be organized as traits and referenced from different locations with the keyword *is*. Like this, you avoid unnecessary duplication. Another option for structuring and reuse are includes (*!include*). This technique allows you to outsource definitions to other files. In Listing 1 the query parameters have been modeled using the trait *searchable*.

**Listing 1**

    #% RAML 0.8
    title: Example API
    baseUri: http://localhost:8080/{version}
    version: v1
    
    traits:
     - searchable:
        query parameter:
         name:
          type: String
          description: The name of the article.
          example: smartwatch
          required: false
    
    /articles:
     description: Collection of articles
     get:
      is: [ searchable ]
     responses:
      200:
       body:
        application/json:
         scheme: |
          {
          "type": "array"
          "items": [
          {
           "type": "object"
           "properties":
            {
             "id": {"type": "integer"},
             "content": {"type": "string"}
            }
          }
         ]
        }
    

## JSON Schema

RAML takes advantage of another project and allows you to define JSON return values with schemas. These [JSON schemas][9] are similar to XSD for XML and ensure that the data is not only well-formed, but also valid. This means that the data structure cannot change arbitrarily, but must stick to a specific form. The JSON schemas used in RAML can be stored directly in the RAML file or in separate YAML files. Listing 2 shows how easy it is to include and reference external schemas. You can include either *.yaml* or *.raml* files.

**Listing 2**

    schemas:
     - !include article-schema.yaml
    
    /articles:
     get:
      responses:
       200:
        body:
         application/json:
          schema: articles
    

As an alternative to JSON schemas you can also specify JSON examples to describe the return values.

## Resource Types

Traits and includes have been introduced as techniques for structuring RAML documents. In this context, the so-called *resource types* should not be left out. Let us consider as an example the resource type *mySearchableCollection*. This type accepts only HTTP GET and associated query search parameters. A specific resource like */articles* could inherit from *mySearchableCollection* and take over its properties. When defining resource types and traits you can also use parameters that allow these to be used flexibly. For example, you could make the search parameters and the description text variable.

After this introduction to the description language RAML we will now focus on the definitions that can be applied in practice to develop test-driven REST APIs.

## API First Development

Using the [RAML tester][10] you can easily meet the technical prerequisites in order to automatically validate a REST-API against a RAML definition using JUnit tests. Listing 3 shows an example to accomplish this. The JUnit test shown here starts a Spring context and initiates an instance of class *MockMvc*. You can use this test double in order to test the REST API. The result of the API call can be verified as *ResultActions*. The *ResultActions* are comparable in their role to Hamcrest matchers. You can add any number of these objects with the method *andExpect()* in order to verify the result. This mechanism is used by the RAML tester, too. The RAML file is read by the class *guru.nidi.ramltester.RamlDefinition*. Subsequently, you create an appropriate *ResultAction* in the test with the methods *matches()* and *aggegating()* respectively.

 [10]: https://github.com/nidi3/raml-tester

**Listing 3**

    @RunWith(SpringJUnit4ClassRunner.class)
    @WebAppConfiguration
    @ContextConfiguration(Classes = SpringRestSampleApplication.class)
    public class ApiIntegrationTest {
    
        private static RamlDefinition api = RamlLoaders
            .fromClasspath(SpringRestSampleApplication.class)
            .load("api.raml")
            .assumingBaseUri("http://localhost:8080/v1");
    
        private static SimpleReportAggregator aggregator =
            new SimpleReportAggregator();
    
        @Autowired
        private WebApplicationContext context;
    
        private MockMvc mvc;
    
        @Before
        public void setUp () {
            mvc = MockMvcBuilders
                    .webAppContextSetup(context)
                    .build();
        }
    
        @Test
        public void retrieveArticlesOf2ndPage() throws Exception {
            mvc.perform(
                    get("/articles?page=1&size=2")
                    .accept(MediaType.parseMediaType("application/json")))
                .andExpect(api.matches().aggregating(aggregator))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andDo(MockMvcResultHandlers.print());
        }
    }
    

On the one hand his technical setup is used to ensure the correctness of the REST API, on the other hand it allows test-driven development (TDD). In this case, the name API First Development is quite suitable. In order to extend the GET method of the resource */articles* with a paging function, you would first extend the design of the API in the RAML definition. In this step you decide for example how to pass the paging information:

*   In the URI path: */articles/page/0*
*   In the URI query: */articles?page=0*

Since a page is not a resource in terms of REST, you would probably choose the second option. The next step is to write a new JUnit test that tests the GET method with the new paging function (e.g. */articles?page=1*). The test fails and the implementation can be extended according to the test. This process could go on, for example, in order to extend the RAML definition with a query parameter for the page size. The path for the test could then be */articles?page=1&size=2*. In the final step of TDD loop you would adjust the implementation until the test succeeds.

## Tool Support

Finally, a short note on the tools that simplify the work with RAML. For example, [raml2html][11] can generate HTML documents from RAML definitions. The generator used here is under MIT license and is based on Node.js. The installation and the execution are performed by

 [11]: https://github.com/kevinrenskers/raml2html

    npm i -g raml2html
    raml2html api.raml > api.html
    

Alternatively, you can use the [web application RAML 2 HTML for PHP][12] to publish API documentation. This is especially useful for open APIs, whose documentation is needed by a wide range of users.

 [12]: https://github.com/mikestowe/php-raml2html

It is also possible to generate RAML documents from JAX-RS Java code and vice versa. More details about this topic can be found [here][13].

 [13]: https://github.com/mulesoft/raml-for-jax-rs

An overview about the core RAML components and other related projects can be found at [raml.org/projects][14].

 [14]: http://raml.org/projects

## Summary

RAML is a lightweight description language for APIs based on JSON and HTTP. It allows APIs to be documented uniformly and structured. Recurrent patterns that are used at different locations in the API can be modeled with traits and resource types. By using YAML, the descriptions are easy to read and tree structures can be represented cleanly. As shown in this article, these API definitions can be validated with the RAML tester, for example in JUnit tests in combination with Spring MVC. This combination of technologies allows API First Development. Another reason in favor of using RAML are the different tools that simplify the work with RAML.

Kai Spichale

*Kai Spichale works a Software Architect at the adesso AG. His focus is designing and implementing Java-based software systems. He authored many technical articles and speaks regularly on national conferences.*