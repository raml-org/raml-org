# RAML.org Websites

> This repository contains the source code for the raml.org website written in Jekyll.

## To Install jekyll 
    
   please check the below links:
   
  1. [For mac](https://andytaylor.me/2012/11/03/installing-ruby-and-jekyll/ "for mac").
  2. [For ubuntu](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-jekyll-development-site-on-ubuntu-16-04 "For ubuntu"). 
 
## To Run the jekyll Site locally

1. Pull the code locally
2. change to the root directory of the `raml-org` project by running the command in your terminal

    ```
    cd raml-org
    ```

3. remove the below line in blogs/index.html in case you are testing locally 

   ```
   permalink: /blogs
   ```
   
4. run this command 

   ```
   bundle install
   ```
   
5. Run this command to build the jekyll site 
   
   ```
   jekyll serve --detach
   ```
   
   currently the site will run with port 4000. 
   say for example http://localhost:4000.
   
   if you want to run the site with port 80. First you need to stop services that are listening to port 80
   then run the below command:
   
   ```
   jekyll serve --port=80 --detach
   ```

## To run the jekyll site on the prod or stagging server

1. Pull the code on your server
2. goto root directory by running the command in your terminal
    
   ```
   cd raml-org
   ```
    
3. run this command 
 
   ```
   bundle install
   ```
   
4. Run this command to build the jekyll site 
      
   ```
   jekyll serve --host=<ip of the server> --port=80 --detach
   ```

## How to add projects to the projects page?

RAML.org includes a projects page that lists tools around RAML that either are community or commercial driven. If you think, your project should be in this list, please fork this repository, add it into the [projects.yml](_data/projects.yml) file, and send us a PR. We will review and let you know if we will be able to list it. 

Another way to make sure your project is linked to our projects page is through assigning [topics](https://github.com/blog/2309-introducing-topics) to your Github project. Links to each topics are below the list of projects on the projects page. The following topics are available:

| Topic | Description |
|:------|:------------|
| [raml-design](https://github.com/search?utf8=✓&q=topic%3Araml-design) | Includes projects that specifically support people with the design of RAML documents. |
| [raml-document](https://github.com/search?utf8=✓&q=topic%3Araml-document) | Includes projects that focus on the documentation of APIs using RAML documents. |
| [raml-build](https://github.com/search?utf8=✓&q=topic%3Araml-build) | Includes projects that focus on build client or server code based on RAML documents. |
| [raml-parser](https://github.com/search?utf8=✓&q=topic%3Araml-parser) | Includes projects that parses/validates RAML documents. |
| [raml-test](https://github.com/search?utf8=✓&q=topic%3Araml-test) | Includes projects that support people testing APIs based on RAML documents. |
| [raml-utilities](https://github.com/search?utf8=✓&q=topic%3Araml-utilities) | Includes other projects that do not fall into the other topics like converters. |

Topics need to be assigned and managed by the owner of a project. Additionally, we still recommend people to search on Github for more projects that might not have these topics assigned.  

## Contribution

RAML's website is in fact an open source project and your contribution is very much appreciated. Before you start, you should check for open issues or open a fresh issue to start a discussion around an idea that you'd like to see on our website or a bug. If you want to support us fixing issues, please follow the steps below:

1. Fork the repository on Github and make your changes on the `develop` branch (or branch off of it). 
2. [Run](#to-run-the-jekyll-site-locally) the website to see if you fixed the issue.
3. Send a pull request (with the develop branch as the target).

We will review your PR, comment if necessary, and merge it into our staging branch `stg`.

You can contribute to the following:

* spelling mistakes
* [new projects](how-to-add-projects-to-the-projects-page)
* blog posts
* and others, after carefully reviewing the issue you created
