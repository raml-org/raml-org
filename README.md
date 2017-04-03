# RAML.org Website

This repository contains the source code for the raml.org website written in Jekyll.

# To Run the jekyll Site locally

1. Pull the code in your local
2. goto root directory by running the command in your terminal
    ```
    cd raml-website
    ```
3. run this command 

  ```
   bundle install
   ```
4. Run this command to build the jekyll site 
   
   ~~~~
   jekyll serve --detach
   ~~~~
   
   currently the site will run with port 4000. 
   say for example http://localhost:4000.
   
   if you want to run the site with port 80. First you need to stop services that are listening to port 80
   then run the below command:
   
   ~~~~
   jekyll serve --port=80 --detach
   ~~~~
   
   
   
   
# To run the jekyll site on the prod or stagging server

   1. Pull the code in your server
   2. goto root directory by running the command in your terminal
    
    ```
    cd raml-website
    ```
    
   3. run this command 
       ~~~~
       bundle install
       ~~~~
   4. Run this command to build the jekyll site 
      
       ~~~~
       jekyll serve --host=<ip of the server> --port=80 --detach
       ~~~~
       
       
       
       
   
   

   
