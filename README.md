# RAML.org Website

This repository contains the source code for the raml.org website written in Jekyll.

# To Install jekyll 
    
   please check the below links:
   
  1. [For mac](https://andytaylor.me/2012/11/03/installing-ruby-and-jekyll/ "for mac").
  2. [For ubuntu](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-jekyll-development-site-on-ubuntu-16-04 "For ubuntu"). 
 
 

# To Run the jekyll Site locally

1. Pull the code locally
2. change to the root directory of the `raml-website` project by running the command in your terminal

    ```
    cd raml-website
    ```
    
3. run this command 

   ```
   bundle install
   ```
   
4. Run this command to build the jekyll site 
   
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
   
   
   
   
# To run the jekyll site on the prod or stagging server

1. Pull the code on your server
2. goto root directory by running the command in your terminal
    
   ```
   cd raml-website
   ```
    
3. run this command 
 
   ```
   bundle install
   ```
   
4. Run this command to build the jekyll site 
      
   ```
   jekyll serve --host=<ip of the server> --port=80 --detach
   ```
       
       
       
       
   
   

   
