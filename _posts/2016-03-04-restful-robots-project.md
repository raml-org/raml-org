---
layout: page
title: "The RESTful Robots Project"
date: 2014-09-16
categories : [uncategorized]
author: Uri Sarid
tags :
---

## A Deep Dive into IoT, RAML, and Robot APIs

I've been thinking a lot recently about the Internet of Things (IoT), in its numerous variations. Like all popular memes, it's used and abused in numerous ways. But a core concept is to connect to the network things that are not traditionally thought of as connected – toasters, locomotives, roads, even network devices themselves (think Software Defined Networking, or SDN). Some of those things are dumb, but useful: temperature sensors, pedometers, trip switches, lightbulbs. But I wanted to think on the other side of the spectrum: what are some things that are smart, or at least that can do a lot more than just turn on or off or send out a reading? Where can I find truly creative ideas for interesting things that are even more interesting when networked?

If creativity is important, there's no better place to start than [Maker Faire](http://makerfaire.com/). If you haven't been to one, or been to one recently, I highly encourage you to look for one coming to your area, and take at least a good half day to explore it. That's what I did recently with our 12 year old son. It was crazy fun, stimulating and provocative, and we found just the thing for the internet of things: a robot. Not just any robot, mind you. The day before, [Robotis](http://www.robotis.com/xe/), maker of some incredibly humanoid robots, had just released its [Darwin Mini](http://www.robotis.com/xe/ROBOTIS_DARWIN_MINI_en), and put it on display and on sale exclusively through [Maker Shed](http://www.makershed.com/products/darwin-mini). Unlike its bigger cousins, this cost "only" $500 each, and a few minutes of watching them perform convinced me to take a couple home with me, to... um... experiment. (Cue that horrible Tom Lehrer song.)

The goal of this endeavor, like my [previous one](https://github.com/usarid/spherest) with the [Sphero robotic ball](http://www.gosphero.com/sphero-2-0/), was to figure out how to expose its capabilities as accessibly as possible, ideally HTTP on the internet, and let luck and imagination take it from there. In general, I’m a big believer in “if you build it they will come” for APIs. If we can encourage Makers and vendors to open up access to their products, and crowdsource the effort for any that don’t do it on their own, serendipity will do the rest: when an interesting application of those products comes up, you’ll be quite certain that there’s an API for that.

This was Sunday afternoon, and we opened the boxes just as soon as we got home. There were no robots in there. Well, at least no more than there are tomatoes in a packet of tomato seeds. There were hundreds of tiny parts, and a nice thick manual, that could be turned into robots, given time and, it turned out, a lot of luck. Forgot to align each individual servo before you delicately screw it in? All will seem well until you turn it on at the end, watch it writhe in uncoordinated pain, and damage itself beyond repair. Didn't realize all those identical-looking wires actually come in 3 different sizes? Enjoy unassembling and reassembling. And make sure those hundreds of transparent 1mm rivets don't hit the carpet or you may never see them again. At 3am I realized this robot project wasn't going to end well. Fortunately, the company was kind enough to exchange them for a couple of already-assembled robots, which I promptly named Flo and Spec, and when I recently built a 3rd robot myself, named Bandito (assembly time down to 6 hours), it worked the first time. Nice.

OK, so now to connect the robots to the network. The available options to send them commands in real time were limited to… exactly one, as far as I could tell: the [Robotis Darwin Mini app for Android](https://play.google.com/store/apps/details?id=com.robotis.darwinmini). That's fun for a while, but surely that's not the IoT. It’s a great start, because it shows that it’s technically possible to command them in real time, but it’s not enough plumbing. What's needed is an API, available over the network (not just my bluetooth network), to really open up possibilities. So I’d need to build an app to bridge between what the robots could do, namely respond to bluetooth commands, and what I wanted them to do, respond to HTTP requests over the internet.  And that's where the real adventure began...

I've never done any bluetooth communications, to a robot or to anything else, so first I reached out to the company. They were friendly, but they would not release the source code for their Android app, not even the sections that showed how to communicate to the robot. I posted on their discussion forums, but didn't get far. They did eventually send me a few links, for example to a page describing the packets the robot expects to receive, which were really useful – but only halfway there. I needed to know the second step: how to fill in the values. And as someone famous once said, it's problematic to leap over a chasm in two steps.

Fortunately, Calvin Yoo at Robotis sent me some more tantalizing clues: an example of an actual packet, with a bit of explanation of what some of the values mean. I pulled in a few other sources: in Android KitKat, you can [turn on bluetooth sniffing](http://profandroid.com/network/bluetooth/sniffing.html), and dump a log of bluetooth traffic, so I played with their app with logging turned on, and transferred the logs to my Mac using [adb](http://developer.android.com/tools/help/adb.html). I then used Wireshark to examine these rosetta stones for clues. Also very valuable was the "motion file" that controls the robot. It's a set of instructions that start from basic commands like "sit" and "pushup" and eventually define them in terms of servo motor positions and timings. Robotis gives you tools to create these motion files and sync them into the robot, but the default one that comes already loaded into the robot, and includes around forty commands, was good enough for my needs. What I was trying to do was to create an API on the network where you would tell it "sit" and it would receive the appropriate command from those forty, over bluetooth. (The link I had was actually to the Korean motion file, so I used Google Translate extensively to understand it, before I realized there was an [English motion file](http://support.robotis.com/en/baggage_files/darwinmini/darwin_mini_exemple_en.zip) too.)

Comparing the official instructions, Calvin's clues, and the stuff in the motion files with the packets I was seeing in Wireshark allowed me to assemble a working hypothesis for what I need to send:

<pre dir="ltr">
ff ff fd 00 c8 07 00 03 42 00 01 00 da 61 ==> initial position
ff ff fd 00 c8 07 00 03 42 00 03 00 d9 ed ==> sit
ff ff fd 00 c8 07 00 03 42 00 05 00 d9 f9 ==> greeting 1
ff ff fd 00 c8 07 00 03 42 00 16 00 da 13 ==> do a situp
ff ff fd 00 c8 07 00 03 42 00 nL nH cL cH ==> do command n
  where n is in hex as 2 bytes, low byte first
  and c is a CRC checksum on all preceding packet bytes
</pre>

_(If you're curious, the first 4 bytes are fixed; the next byte is the number 200 in hex – some sort of ID, not sure of what; the next 2 bytes are the number of remaining bytes in the packet, 7 in our case; then 1 byte that indicates we're writing rather than reading; then 2 bytes that mean to actually execute, so they never  change in our case; then come the 2 bytes that indicate which command; and finally, a CRC checksum. All 2-byte values are given as low byte followed by high byte.)_

But how to send this ?

Where I wanted to go, eventually, was to send it from our Mule integration engine, but that required figuring out how to work with a Java bluetooth library, and that had issues of its own... (Note: this was just solved by one of our engineering gurus. We'll blog about that soon too.) So I started with the excellent, simple bluetooth library for node.js, available on npm: [bluetooth-serial-port](https://www.npmjs.org/package/bluetooth-serial-port). The steps are:

1.  Pair your robot with your laptop via bluetooth, as usual.

2.  Then invoke the library's super-useful command to list the paired devices, filter out the robot devices, and figure out which you want to talk to. Each has an address, e.g. `B8-63-BC-00-12-16`, and a channel on which it communicates. I defined, somewhat arbitrarily, a robot's id to be the last 4 characters of its address, e.g. `1216`, so I can address different robots by specifying this id, and I don't have to remember 12-character codes.

3.  When you know the robot's address and channel, you can ask the library whether it's connected or not, and if not then connect to it.

4.  Once connected, you create a binary packet, using node's Buffer object and its super-useful "hex" encoding, and write it to the bluetooth serial port.

I quickly [rewrote](https://github.com/usarid/robonode/blob/master/src/addCRC.js) the Robotis-provided CRC checksum in JavaScript, fired up node, sent the binary packet, and **it worked**! My little robotic friend sat down, did some pull-ups, bowed gracefully... it was awesome. We have communication! I felt like that scene in _Close Encounters of the Third Kind_ when contact is made with the aliens. (And I'm dating myself, again.)

With this bridge crossed, I turned to defining a full API, and that was pure joy: I designed it in [RAML](http://raml.org/) using MuleSoft’s [API Designer](https://anypoint.mulesoft.com/apiplatform/), turned on the mocking service and played with the API Console to get a feeling for it.

![robonode-designer-1024x524.png](/post_images/robonode-designer-1024x524.png "robonode-designer-1024x524.png")

I even created [a simple API notebook](https://api-notebook.anypoint.mulesoft.com/notebooks/#109f445875d5646ec8f8) for scripting multiple motions to the robot: a simple demonstration of its flexibility, a choreographed set of feats of strength and fancy dance moves, followed by a deep bow. And that's when I hit the next wall, and the API Notebook proved its value, as it had in the past – by using it to write real-world usecases, I realized that I'd need to know how long a command takes to execute, so I can send the next command right after the previous one was done. My API had no notion of execution time, and I had no idea how to get that information. Back to hacking...

I tried to ask the robot whether it was done executing. The bluetooth library had an ability to read as well as write, the Robotis site indicated how to interpret read packets, and it even had some clue about asking the robot whether it's moving (I think). But even though sending the request to the robot and logging the bytes it emitted did yield some information, I could not figure out how to interpret it, and it didn't seem to correlate to whether the robot was still moving or not. That's a dead end, for now. _(Plea, especially to Robotis: I'd love some help figuring this out, at some point.)_

Instead, sleuthing around the Robotis site, I came across a hint: when defining motions with their tools, you cannot specify a time granularity finer than 0.08m seconds. And the motion file has XML strings like:

<pre dir="ltr">
&lt;steps&gt;
&nbsp;&nbsp;&nbsp;&lt;step frame="25" pose="-80.86 82.91 2.93 -1.17 ... 13.18 -13.18 0 0" /&gt;
&nbsp;&nbsp;&nbsp;&lt;step frame="75" pose="-56.84 57.13 ... 13.18 -13.18 0 0" /&gt;
&nbsp;&nbsp;&nbsp;...
&nbsp;&nbsp;&nbsp;&lt;step frame="400" pose="0 0 -73.24 73.24 0 0 0 0 ... 13.18 -13.18 0 0" /&gt;
&lt;/steps&gt;
</pre>

Well, a reasonable guess might be: each frame corresponds to 8ms, each step tells the robot the intended orientations of its various servos at a certain frame and hence at a certain time, and by looking at the last step and multiplying the frame number by 8ms, you get the length of time all the steps should take. The rest of the motion file helps you work the steps back to the command, with a few more guesses, e.g. there is an intermediate object called a "flow" defined as

<pre dir="ltr">
&lt;Flow name="Greet1" return="-1"&gt;
&nbsp;&nbsp;&nbsp;&lt;units&gt;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;unit main="Greet1" mainSpeed="1" loop="1" exit=""
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;exitSpeed="1" callSite="False" /&gt;
&nbsp;&nbsp;&nbsp;&lt;/units&gt;
&lt;/Flow&gt;
</pre>

and I assumed that you should multiply the step time by the value of "mainSpeed" and by the number of iterations indicated by the value of "loop" and add up all the units in the flow. Given a motion file, I could then calculate how long every command was supposed to take, and if I made a final assumption that the robot's current motion file was the default motion file I had access to, I'd be done. _(Another plea: if anyone, especially Robotis, can tell me how to ask the robot what its current motion file is, I'm happy to improve my implementation and eliminate this assumption. Which would be very cool: you could use Robotis' tools to create your own motion files, e.g. to do some elaborate dances and such, then invoke them from the API.)_

Armed with the knowledge of how long commands are supposed to take, I modified my API to add sync and async modes: in the default sync mode, the API calls now wait the appropriate number of ms before returning, so when they return you know the command has completed. This is convenient for making calls sequentially, but you might prefer to send a call and go on to do something else, and just set a callback to execute the next step once the allotted time has passed. So the async option in the API will return immediately, and in the response you can find the time in ms when the robot will actually be finished and be ready for the next command.

There's one more step. With node running on my machine, and the robots paired and turned on, I can talk to them from curl on the command line, I can script commands from various API notebooks and choreograph multiple robots together, and of course I can now mash up this API with others so, e.g. I can drive them through tweets or through texts (e.g. using Twilio) or anything else. I can do that, but you can't, because my API is running on my laptop on port 3000 behind my firewall and you can't get to it (hopefully). To allow you and others to access it, during demos I like to run [ngrok](https://ngrok.com/) on my laptop, to establish a tunnel from the public internet to my laptop's port 3000\. ngrok is beautifully implemented, so I paid "Mr ngrok" a bit of money to permanently reserve a spot on ngrok.com, to which I pointed a subdomain on my ramlicio.us domain, and that way I can be sure that calls to my subdomain are always routed to my laptop and hence to my robots whenever they're on and my node app is running. And **now** I can truly claim that my robotic thing 1 and thing 2 are connected to **the** network.

I packaged this all up with a short readme and [published it to github](https://github.com/usarid/robonode). Which leaves me wondering what's the next step? Perhaps a robot arena set up somewhere in the physical world, with a few robots, a server running ngrok, my node app (or the Mule app we're writing), and a webcam to show the action, all accessible by anyone on the internet? Or maybe a network of such robot arenas, much like there are networks of webcams, with different setups in each arena and maybe other connected devices (Sphero balls come to mind), perhaps with extra sensors on the robots (Robotis sells several), and mashups between these arenas and other services or between the arenas themselves – think robot social networks...

The possibilities are endless, but fortunately this blog post is not. I'm looking forward to more robotic action soon, and I'll be sure to blog about what I find. Here’s the final API notebook. It’s live, in the sense that you can play it and send commands right now… but my robots would have to be connected and my app would have to be running. Or you could get your own robots, run my app, and give this a try yourself!

## A Deep Dive into IoT, RAML, and Robot APIs

I've been thinking a lot recently about the Internet of Things (IoT), in its numerous variations. Like all popular memes, it's used and abused in numerous ways. But a core concept is to connect to the network things that are not traditionally thought of as connected – toasters, locomotives, roads, even network devices themselves (think Software Defined Networking, or SDN). Some of those things are dumb, but useful: temperature sensors, pedometers, trip switches, lightbulbs. But I wanted to think on the other side of the spectrum: what are some things that are smart, or at least that can do a lot more than just turn on or off or send out a reading? Where can I find truly creative ideas for interesting things that are even more interesting when networked?

If creativity is important, there's no better place to start than [Maker Faire](http://makerfaire.com/). If you haven't been to one, or been to one recently, I highly encourage you to look for one coming to your area, and take at least a good half day to explore it. That's what I did recently with our 12 year old son. It was crazy fun, stimulating and provocative, and we found just the thing for the internet of things: a robot. Not just any robot, mind you. The day before, [Robotis](http://www.robotis.com/xe/), maker of some incredibly humanoid robots, had just released its [Darwin Mini](http://www.robotis.com/xe/ROBOTIS_DARWIN_MINI_en), and put it on display and on sale exclusively through [Maker Shed](http://www.makershed.com/products/darwin-mini). Unlike its bigger cousins, this cost "only" $500 each, and a few minutes of watching them perform convinced me to take a couple home with me, to... um... experiment. (Cue that horrible Tom Lehrer song.)

The goal of this endeavor, like my [previous one](https://github.com/usarid/spherest) with the [Sphero robotic ball](http://www.gosphero.com/sphero-2-0/), was to figure out how to expose its capabilities as accessibly as possible, ideally HTTP on the internet, and let luck and imagination take it from there. In general, I’m a big believer in “if you build it they will come” for APIs. If we can encourage Makers and vendors to open up access to their products, and crowdsource the effort for any that don’t do it on their own, serendipity will do the rest: when an interesting application of those products comes up, you’ll be quite certain that there’s an API for that.

This was Sunday afternoon, and we opened the boxes just as soon as we got home. There were no robots in there. Well, at least no more than there are tomatoes in a packet of tomato seeds. There were hundreds of tiny parts, and a nice thick manual, that could be turned into robots, given time and, it turned out, a lot of luck. Forgot to align each individual servo before you delicately screw it in? All will seem well until you turn it on at the end, watch it writhe in uncoordinated pain, and damage itself beyond repair. Didn't realize all those identical-looking wires actually come in 3 different sizes? Enjoy unassembling and reassembling. And make sure those hundreds of transparent 1mm rivets don't hit the carpet or you may never see them again. At 3am I realized this robot project wasn't going to end well. Fortunately, the company was kind enough to exchange them for a couple of already-assembled robots, which I promptly named Flo and Spec, and when I recently built a 3rd robot myself, named Bandito (assembly time down to 6 hours), it worked the first time. Nice.

OK, so now to connect the robots to the network. The available options to send them commands in real time were limited to… exactly one, as far as I could tell: the [Robotis Darwin Mini app for Android](https://play.google.com/store/apps/details?id=com.robotis.darwinmini). That's fun for a while, but surely that's not the IoT. It’s a great start, because it shows that it’s technically possible to command them in real time, but it’s not enough plumbing. What's needed is an API, available over the network (not just my bluetooth network), to really open up possibilities. So I’d need to build an app to bridge between what the robots could do, namely respond to bluetooth commands, and what I wanted them to do, respond to HTTP requests over the internet.  And that's where the real adventure began...

I've never done any bluetooth communications, to a robot or to anything else, so first I reached out to the company. They were friendly, but they would not release the source code for their Android app, not even the sections that showed how to communicate to the robot. I posted on their discussion forums, but didn't get far. They did eventually send me a few links, for example to a page describing the packets the robot expects to receive, which were really useful – but only halfway there. I needed to know the second step: how to fill in the values. And as someone famous once said, it's problematic to leap over a chasm in two steps.

Fortunately, Calvin Yoo at Robotis sent me some more tantalizing clues: an example of an actual packet, with a bit of explanation of what some of the values mean. I pulled in a few other sources: in Android KitKat, you can [turn on bluetooth sniffing](http://profandroid.com/network/bluetooth/sniffing.html), and dump a log of bluetooth traffic, so I played with their app with logging turned on, and transferred the logs to my Mac using [adb](http://developer.android.com/tools/help/adb.html). I then used Wireshark to examine these rosetta stones for clues. Also very valuable was the "motion file" that controls the robot. It's a set of instructions that start from basic commands like "sit" and "pushup" and eventually define them in terms of servo motor positions and timings. Robotis gives you tools to create these motion files and sync them into the robot, but the default one that comes already loaded into the robot, and includes around forty commands, was good enough for my needs. What I was trying to do was to create an API on the network where you would tell it "sit" and it would receive the appropriate command from those forty, over bluetooth. (The link I had was actually to the Korean motion file, so I used Google Translate extensively to understand it, before I realized there was an [English motion file](http://support.robotis.com/en/baggage_files/darwinmini/darwin_mini_exemple_en.zip) too.)

Comparing the official instructions, Calvin's clues, and the stuff in the motion files with the packets I was seeing in Wireshark allowed me to assemble a working hypothesis for what I need to send:

<pre dir="ltr">
ff ff fd 00 c8 07 00 03 42 00 01 00 da 61 ==> initial position
ff ff fd 00 c8 07 00 03 42 00 03 00 d9 ed ==> sit
ff ff fd 00 c8 07 00 03 42 00 05 00 d9 f9 ==> greeting 1
ff ff fd 00 c8 07 00 03 42 00 16 00 da 13 ==> do a situp
ff ff fd 00 c8 07 00 03 42 00 nL nH cL cH ==> do command n
  where n is in hex as 2 bytes, low byte first
  and c is a CRC checksum on all preceding packet bytes
</pre>

_(If you're curious, the first 4 bytes are fixed; the next byte is the number 200 in hex – some sort of ID, not sure of what; the next 2 bytes are the number of remaining bytes in the packet, 7 in our case; then 1 byte that indicates we're writing rather than reading; then 2 bytes that mean to actually execute, so they never  change in our case; then come the 2 bytes that indicate which command; and finally, a CRC algorithm. All 2-byte values are given as low byte followed by high byte.)_

But how to send this ?

Where I wanted to go, eventually, was to send it from our Mule integration engine, but that required figuring out how to work with a Java bluetooth library, and that had issues of its own... (Note: this was just solved by one of our engineering gurus. We'll blog about that soon too.) So I started with the excellent, simple bluetooth library for node.js, available on npm: [bluetooth-serial-port](https://www.npmjs.org/package/bluetooth-serial-port). The steps are:

1.  Pair your robot with your laptop via bluetooth, as usual.

2.  Then invoke the library's super-useful command to list the paired devices, filter out the robot devices, and figure out which you want to talk to. Each has an address, e.g. `B8-63-BC-00-12-16`, and a channel on which it communicates. I defined, somewhat arbitrarily, a robot's id to be the last 4 characters of its address, e.g. `1216`, so I can address different robots by specifying this id, and I don't have to remember 12-character codes.

3.  When you know the robot's address and channel, you can ask the library whether it's connected or not, and if not then connect to it.

4.  Once connected, you create a binary packet, using node's Buffer object and its super-useful "hex" encoding, and write it to the bluetooth serial port.

I quickly [rewrote](https://github.com/usarid/robonode/blob/master/src/addCRC.js) the Robotis-provided CRC algorithm in JavaScript, fired up node, sent the binary packet, and **it worked**! My little robotic friend sat down, did some pull-ups, bowed gracefully... it was awesome. We have communication! I felt like that scene in _Close Encounters of the Third Kind_ when contact is made with the aliens. (And I'm dating myself, again.)

With this bridge crossed, I turned to defining a full API, and that was pure joy: I designed it in [RAML](http://raml.org/) using MuleSoft’s [API Designer](https://anypoint.mulesoft.com/apiplatform/), turned on the mocking service and played with the API Console to get a feeling for it.

![robonode-designer-1024x524.png](/post_images/robonode-designer-1024x524.png "robonode-designer-1024x524.png")

I even created [a simple API notebook](https://api-notebook.anypoint.mulesoft.com/notebooks/#109f445875d5646ec8f8) for scripting multiple motions to the robot: a simple demonstration of its flexibility, a choreographed set of feats of strength and fancy dance moves, followed by a deep bow. And that's when I hit the next wall, and the API Notebook proved its value, as it had in the past – by using it to write real-world usecases, I realized that I'd need to know how long a command takes to execute, so I can send the next command right after the previous one was done. My API had no notion of execution time, and I had no idea how to get that information. Back to hacking...

I tried to ask the robot whether it was done executing. The bluetooth library had an ability to read as well as write, the Robotis site indicated how to interpret read packets, and it even had some clue about asking the robot whether it's moving (I think). But even though sending the request to the robot and logging the bytes it emitted did yield some information, I could not figure out how to interpret it, and it didn't seem to correlate to whether the robot was still moving or not. That's a dead end, for now. _(Plea, especially to Robotis: I'd love some help figuring this out, at some point.)_

Instead, sleuthing around the Robotis site, I came across a hint: when defining motions with their tools, you cannot specify a time granularity finer than 0.08m seconds. And the motion file has XML strings like:

<pre dir="ltr">
&lt;steps&gt;
&nbsp;&nbsp;&nbsp;&lt;step frame="25" pose="-80.86 82.91 2.93 -1.17 ... 13.18 -13.18 0 0" /&gt;
&nbsp;&nbsp;&nbsp;&lt;step frame="75" pose="-56.84 57.13 ... 13.18 -13.18 0 0" /&gt;
&nbsp;&nbsp;&nbsp;...
&nbsp;&nbsp;&nbsp;&lt;step frame="400" pose="0 0 -73.24 73.24 0 0 0 0 ... 13.18 -13.18 0 0" /&gt;
&lt;/steps&gt;
</pre>

Well, a reasonable guess might be: each frame corresponds to 8ms, each step tells the robot the intended orientations of its various servos at a certain frame and hence at a certain time, and by looking at the last step and multiplying the frame number by 8ms, you get the length of time all the steps should take. The rest of the motion file helps you work the steps back to the command, with a few more guesses, e.g. there is an intermediate object called a "flow" defined as

<pre dir="ltr">
&lt;Flow name="Greet1" return="-1"&gt;
&nbsp;&nbsp;&nbsp;&lt;units&gt;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;unit main="Greet1" mainSpeed="1" loop="1" exit=""
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;exitSpeed="1" callSite="False" /&gt;
&nbsp;&nbsp;&nbsp;&lt;/units&gt;
&lt;/Flow&gt;
</pre>

and I assumed that you should multiply the step time by the value of "mainSpeed" and by the number of iterations indicated by the value of "loop" and add up all the units in the flow. Given a motion file, I could then calculate how long every command was supposed to take, and if I made a final assumption that the robot's current motion file was the default motion file I had access to, I'd be done. _(Another plea: if anyone, especially Robotis, can tell me how to ask the robot what its current motion file is, I'm happy to improve my implementation and eliminate this assumption. Which would be very cool: you could use Robotis' tools to create your own motion files, e.g. to do some elaborate dances and such, then invoke them from the API.)_

Armed with the knowledge of how long commands are supposed to take, I modified my API to add sync and async modes: in the default sync mode, the API calls now wait the appropriate number of ms before returning, so when they return you know the command has completed. This is convenient for making calls sequentially, but you might prefer to send a call and go on to do something else, and just set a callback to execute the next step once the allotted time has passed. So the async option in the API will return immediately, and in the response you can find the time in ms when the robot will actually be finished and be ready for the next command.

There's one more step. With node running on my machine, and the robots paired and turned on, I can talk to them from curl on the command line, I can script commands from various API notebooks and choreograph multiple robots together, and of course I can now mash up this API with others so, e.g. I can drive them through tweets or through texts (e.g. using Twilio) or anything else. I can do that, but you can't, because my API is running on my laptop on port 3000 behind my firewall and you can't get to it (hopefully). To allow you and others to access it, during demos I like to run [ngrok](https://ngrok.com/) on my laptop, to establish a tunnel from the public internet to my laptop's port 3000\. ngrok is beautifully implemented, so I paid "Mr ngrok" a bit of money to permanently reserve a spot on ngrok.com, to which I pointed a subdomain on my ramlicio.us domain, and that way I can be sure that calls to my subdomain are always routed to my laptop and hence to my robots whenever they're on and my node app is running. And **now** I can truly claim that my robotic thing 1 and thing 2 are connected to **the** network.

I packaged this all up with a short readme and [published it to github](https://github.com/usarid/robonode). Which leaves me wondering what's the next step? Perhaps a robot arena set up somewhere in the physical world, with a few robots, a server running ngrok, my node app (or the Mule app we're writing), and a webcam to show the action, all accessible by anyone on the internet? Or maybe a network of such robot arenas, much like there are networks of webcams, with different setups in each arena and maybe other connected devices (Sphero balls come to mind), perhaps with extra sensors on the robots (Robotis sells several), and mashups between these arenas and other services or between the arenas themselves – think robot social networks...

The possibilities are endless, but fortunately this blog post is not. I'm looking forward to more robotic action soon, and I'll be sure to blog about what I find. Here’s the final API notebook. It’s live, in the sense that you can play it and send commands right now… but my robots would have to be connected and my app would have to be running. Or you could get your own robots, run my app, and give this a try yourself!

## A Deep Dive into IoT, RAML, and Robot APIs

I've been thinking a lot recently about the Internet of Things (IoT), in its numerous variations. Like all popular memes, it's used and abused in numerous ways. But a core concept is to connect to the network things that are not traditionally thought of as connected – toasters, locomotives, roads, even network devices themselves (think Software Defined Networking, or SDN). Some of those things are dumb, but useful: temperature sensors, pedometers, trip switches, lightbulbs. But I wanted to think on the other side of the spectrum: what are some things that are smart, or at least that can do a lot more than just turn on or off or send out a reading? Where can I find truly creative ideas for interesting things that are even more interesting when networked?

If creativity is important, there's no better place to start than [Maker Faire](http://makerfaire.com/). If you haven't been to one, or been to one recently, I highly encourage you to look for one coming to your area, and take at least a good half day to explore it. That's what I did recently with our 12 year old son. It was crazy fun, stimulating and provocative, and we found just the thing for the internet of things: a robot. Not just any robot, mind you. The day before, [Robotis](http://www.robotis.com/xe/), maker of some incredibly humanoid robots, had just released its [Darwin Mini](http://www.robotis.com/xe/ROBOTIS_DARWIN_MINI_en), and put it on display and on sale exclusively through [Maker Shed](http://www.makershed.com/products/darwin-mini). Unlike its bigger cousins, this cost "only" $500 each, and a few minutes of watching them perform convinced me to take a couple home with me, to... um... experiment. (Cue that horrible Tom Lehrer song.)

The goal of this endeavor, like my [previous one](https://github.com/usarid/spherest) with the [Sphero robotic ball](http://www.gosphero.com/sphero-2-0/), was to figure out how to expose its capabilities as accessibly as possible, ideally HTTP on the internet, and let luck and imagination take it from there. In general, I’m a big believer in “if you build it they will come” for APIs. If we can encourage Makers and vendors to open up access to their products, and crowdsource the effort for any that don’t do it on their own, serendipity will do the rest: when an interesting application of those products comes up, you’ll be quite certain that there’s an API for that.

This was Sunday afternoon, and we opened the boxes just as soon as we got home. There were no robots in there. Well, at least no more than there are tomatoes in a packet of tomato seeds. There were hundreds of tiny parts, and a nice thick manual, that could be turned into robots, given time and, it turned out, a lot of luck. Forgot to align each individual servo before you delicately screw it in? All will seem well until you turn it on at the end, watch it writhe in uncoordinated pain, and damage itself beyond repair. Didn't realize all those identical-looking wires actually come in 3 different sizes? Enjoy unassembling and reassembling. And make sure those hundreds of transparent 1mm rivets don't hit the carpet or you may never see them again. At 3am I realized this robot project wasn't going to end well. Fortunately, the company was kind enough to exchange them for a couple of already-assembled robots, which I promptly named Flo and Spec, and when I recently built a 3rd robot myself, named Bandito (assembly time down to 6 hours), it worked the first time. Nice.

OK, so now to connect the robots to the network. The available options to send them commands in real time were limited to… exactly one, as far as I could tell: the [Robotis Darwin Mini app for Android](https://play.google.com/store/apps/details?id=com.robotis.darwinmini). That's fun for a while, but surely that's not the IoT. It’s a great start, because it shows that it’s technically possible to command them in real time, but it’s not enough plumbing. What's needed is an API, available over the network (not just my bluetooth network), to really open up possibilities. So I’d need to build an app to bridge between what the robots could do, namely respond to bluetooth commands, and what I wanted them to do, respond to HTTP requests over the internet.  And that's where the real adventure began...

I've never done any bluetooth communications, to a robot or to anything else, so first I reached out to the company. They were friendly, but they would not release the source code for their Android app, not even the sections that showed how to communicate to the robot. I posted on their discussion forums, but didn't get far. They did eventually send me a few links, for example to a page describing the packets the robot expects to receive, which were really useful – but only halfway there. I needed to know the second step: how to fill in the values. And as someone famous once said, it's problematic to leap over a chasm in two steps.

Fortunately, Calvin Yoo at Robotis sent me some more tantalizing clues: an example of an actual packet, with a bit of explanation of what some of the values mean. I pulled in a few other sources: in Android KitKat, you can [turn on bluetooth sniffing](http://profandroid.com/network/bluetooth/sniffing.html), and dump a log of bluetooth traffic, so I played with their app with logging turned on, and transferred the logs to my Mac using [adb](http://developer.android.com/tools/help/adb.html). I then used Wireshark to examine these rosetta stones for clues. Also very valuable was the "motion file" that controls the robot. It's a set of instructions that start from basic commands like "sit" and "pushup" and eventually define them in terms of servo motor positions and timings. Robotis gives you tools to create these motion files and sync them into the robot, but the default one that comes already loaded into the robot, and includes around forty commands, was good enough for my needs. What I was trying to do was to create an API on the network where you would tell it "sit" and it would receive the appropriate command from those forty, over bluetooth. (The link I had was actually to the Korean motion file, so I used Google Translate extensively to understand it, before I realized there was an [English motion file](http://support.robotis.com/en/baggage_files/darwinmini/darwin_mini_exemple_en.zip) too.)

Comparing the official instructions, Calvin's clues, and the stuff in the motion files with the packets I was seeing in Wireshark allowed me to assemble a working hypothesis for what I need to send:

<pre dir="ltr">
ff ff fd 00 c8 07 00 03 42 00 01 00 da 61 ==> initial position
ff ff fd 00 c8 07 00 03 42 00 03 00 d9 ed ==> sit
ff ff fd 00 c8 07 00 03 42 00 05 00 d9 f9 ==> greeting 1
ff ff fd 00 c8 07 00 03 42 00 16 00 da 13 ==> do a situp
ff ff fd 00 c8 07 00 03 42 00 nL nH cL cH ==> do command n
  where n is in hex as 2 bytes, low byte first
  and c is a CRC checksum on all preceding packet bytes
</pre>

_(If you're curious, the first 4 bytes are fixed; the next byte is the number 200 in hex – some sort of ID, not sure of what; the next 2 bytes are the number of remaining bytes in the packet, 7 in our case; then 1 byte that indicates we're writing rather than reading; then 2 bytes that mean to actually execute, so they never  change in our case; then come the 2 bytes that indicate which command; and finally, a CRC checksum. All 2-byte values are given as low byte followed by high byte.)_

But how to send this ?

Where I wanted to go, eventually, was to send it from our Mule integration engine, but that required figuring out how to work with a Java bluetooth library, and that had issues of its own... (Note: this was just solved by one of our engineering gurus. We'll blog about that soon too.) So I started with the excellent, simple bluetooth library for node.js, available on npm: [bluetooth-serial-port](https://www.npmjs.org/package/bluetooth-serial-port). The steps are:

1.  Pair your robot with your laptop via bluetooth, as usual.

2.  Then invoke the library's super-useful command to list the paired devices, filter out the robot devices, and figure out which you want to talk to. Each has an address, e.g. `B8-63-BC-00-12-16`, and a channel on which it communicates. I defined, somewhat arbitrarily, a robot's id to be the last 4 characters of its address, e.g. `1216`, so I can address different robots by specifying this id, and I don't have to remember 12-character codes.

3.  When you know the robot's address and channel, you can ask the library whether it's connected or not, and if not then connect to it.

4.  Once connected, you create a binary packet, using node's Buffer object and its super-useful "hex" encoding, and write it to the bluetooth serial port.

I quickly [rewrote](https://github.com/usarid/robonode/blob/master/src/addCRC.js) the Robotis-provided CRC checksum in JavaScript, fired up node, sent the binary packet, and **it worked**! My little robotic friend sat down, did some pull-ups, bowed gracefully... it was awesome. We have communication! I felt like that scene in _Close Encounters of the Third Kind_ when contact is made with the aliens. (And I'm dating myself, again.)

With this bridge crossed, I turned to defining a full API, and that was pure joy: I designed it in [RAML](http://raml.org/) using MuleSoft’s [API Designer](https://anypoint.mulesoft.com/apiplatform/), turned on the mocking service and played with the API Console to get a feeling for it.

![robonode-designer-1024x524.png](/post_images/robonode-designer-1024x524.png "robonode-designer-1024x524.png")

I even created [a simple API notebook](https://api-notebook.anypoint.mulesoft.com/notebooks/#109f445875d5646ec8f8) for scripting multiple motions to the robot: a simple demonstration of its flexibility, a choreographed set of feats of strength and fancy dance moves, followed by a deep bow. And that's when I hit the next wall, and the API Notebook proved its value, as it had in the past – by using it to write real-world usecases, I realized that I'd need to know how long a command takes to execute, so I can send the next command right after the previous one was done. My API had no notion of execution time, and I had no idea how to get that information. Back to hacking...

I tried to ask the robot whether it was done executing. The bluetooth library had an ability to read as well as write, the Robotis site indicated how to interpret read packets, and it even had some clue about asking the robot whether it's moving (I think). But even though sending the request to the robot and logging the bytes it emitted did yield some information, I could not figure out how to interpret it, and it didn't seem to correlate to whether the robot was still moving or not. That's a dead end, for now. _(Plea, especially to Robotis: I'd love some help figuring this out, at some point.)_

Instead, sleuthing around the Robotis site, I came across a hint: when defining motions with their tools, you cannot specify a time granularity finer than 0.08m seconds. And the motion file has XML strings like:

<pre dir="ltr">
&lt;steps&gt;
&nbsp;&nbsp;&nbsp;&lt;step frame="25" pose="-80.86 82.91 2.93 -1.17 ... 13.18 -13.18 0 0" /&gt;
&nbsp;&nbsp;&nbsp;&lt;step frame="75" pose="-56.84 57.13 ... 13.18 -13.18 0 0" /&gt;
&nbsp;&nbsp;&nbsp;...
&nbsp;&nbsp;&nbsp;&lt;step frame="400" pose="0 0 -73.24 73.24 0 0 0 0 ... 13.18 -13.18 0 0" /&gt;
&lt;/steps&gt;
</pre>

Well, a reasonable guess might be: each frame corresponds to 8ms, each step tells the robot the intended orientations of its various servos at a certain frame and hence at a certain time, and by looking at the last step and multiplying the frame number by 8ms, you get the length of time all the steps should take. The rest of the motion file helps you work the steps back to the command, with a few more guesses, e.g. there is an intermediate object called a "flow" defined as

<pre dir="ltr">
&lt;Flow name="Greet1" return="-1"&gt;
&nbsp;&nbsp;&nbsp;&lt;units&gt;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;unit main="Greet1" mainSpeed="1" loop="1" exit=""
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;exitSpeed="1" callSite="False" /&gt;
&nbsp;&nbsp;&nbsp;&lt;/units&gt;
&lt;/Flow&gt;
</pre>

and I assumed that you should multiply the step time by the value of "mainSpeed" and by the number of iterations indicated by the value of "loop" and add up all the units in the flow. Given a motion file, I could then calculate how long every command was supposed to take, and if I made a final assumption that the robot's current motion file was the default motion file I had access to, I'd be done. _(Another plea: if anyone, especially Robotis, can tell me how to ask the robot what its current motion file is, I'm happy to improve my implementation and eliminate this assumption. Which would be very cool: you could use Robotis' tools to create your own motion files, e.g. to do some elaborate dances and such, then invoke them from the API.)_

Armed with the knowledge of how long commands are supposed to take, I modified my API to add sync and async modes: in the default sync mode, the API calls now wait the appropriate number of ms before returning, so when they return you know the command has completed. This is convenient for making calls sequentially, but you might prefer to send a call and go on to do something else, and just set a callback to execute the next step once the allotted time has passed. So the async option in the API will return immediately, and in the response you can find the time in ms when the robot will actually be finished and be ready for the next command.

There's one more step. With node running on my machine, and the robots paired and turned on, I can talk to them from curl on the command line, I can script commands from various API notebooks and choreograph multiple robots together, and of course I can now mash up this API with others so, e.g. I can drive them through tweets or through texts (e.g. using Twilio) or anything else. I can do that, but you can't, because my API is running on my laptop on port 3000 behind my firewall and you can't get to it (hopefully). To allow you and others to access it, during demos I like to run [ngrok](https://ngrok.com/) on my laptop, to establish a tunnel from the public internet to my laptop's port 3000\. ngrok is beautifully implemented, so I paid "Mr ngrok" a bit of money to permanently reserve a spot on ngrok.com, to which I pointed a subdomain on my ramlicio.us domain, and that way I can be sure that calls to my subdomain are always routed to my laptop and hence to my robots whenever they're on and my node app is running. And **now** I can truly claim that my robotic thing 1 and thing 2 are connected to **the** network.

I packaged this all up with a short readme and [published it to github](https://github.com/usarid/robonode). Which leaves me wondering what's the next step? Perhaps a robot arena set up somewhere in the physical world, with a few robots, a server running ngrok, my node app (or the Mule app we're writing), and a webcam to show the action, all accessible by anyone on the internet? Or maybe a network of such robot arenas, much like there are networks of webcams, with different setups in each arena and maybe other connected devices (Sphero balls come to mind), perhaps with extra sensors on the robots (Robotis sells several), and mashups between these arenas and other services or between the arenas themselves – think robot social networks...

The possibilities are endless, but fortunately this blog post is not. I'm looking forward to more robotic action soon, and I'll be sure to blog about what I find. Here’s the final API notebook. It’s live, in the sense that you can play it and send commands right now… but my robots would have to be connected and my app would have to be running. Or you could get your own robots, run my app, and give this a try yourself!

## A Deep Dive into IoT, RAML, and Robot APIs

I've been thinking a lot recently about the Internet of Things (IoT), in its numerous variations. Like all popular memes, it's used and abused in numerous ways. But a core concept is to connect to the network things that are not traditionally thought of as connected – toasters, locomotives, roads, even network devices themselves (think Software Defined Networking, or SDN). Some of those things are dumb, but useful: temperature sensors, pedometers, trip switches, lightbulbs. But I wanted to think on the other side of the spectrum: what are some things that are smart, or at least that can do a lot more than just turn on or off or send out a reading? Where can I find truly creative ideas for interesting things that are even more interesting when networked?

If creativity is important, there's no better place to start than [Maker Faire](http://makerfaire.com/). If you haven't been to one, or been to one recently, I highly encourage you to look for one coming to your area, and take at least a good half day to explore it. That's what I did recently with our 12 year old son. It was crazy fun, stimulating and provocative, and we found just the thing for the internet of things: a robot. Not just any robot, mind you. The day before, [Robotis](http://www.robotis.com/xe/), maker of some incredibly humanoid robots, had just released its [Darwin Mini](http://www.robotis.com/xe/ROBOTIS_DARWIN_MINI_en), and put it on display and on sale exclusively through [Maker Shed](http://www.makershed.com/products/darwin-mini). Unlike its bigger cousins, this cost "only" $500 each, and a few minutes of watching them perform convinced me to take a couple home with me, to... um... experiment. (Cue that horrible Tom Lehrer song.)

The goal of this endeavor, like my [previous one](https://github.com/usarid/spherest) with the [Sphero robotic ball](http://www.gosphero.com/sphero-2-0/), was to figure out how to expose its capabilities as accessibly as possible, ideally HTTP on the internet, and let luck and imagination take it from there. In general, I’m a big believer in “if you build it they will come” for APIs. If we can encourage Makers and vendors to open up access to their products, and crowdsource the effort for any that don’t do it on their own, serendipity will do the rest: when an interesting application of those products comes up, you’ll be quite certain that there’s an API for that.

This was Sunday afternoon, and we opened the boxes just as soon as we got home. There were no robots in there. Well, at least no more than there are tomatoes in a packet of tomato seeds. There were hundreds of tiny parts, and a nice thick manual, that could be turned into robots, given time and, it turned out, a lot of luck. Forgot to align each individual servo before you delicately screw it in? All will seem well until you turn it on at the end, watch it writhe in uncoordinated pain, and damage itself beyond repair. Didn't realize all those identical-looking wires actually come in 3 different sizes? Enjoy unassembling and reassembling. And make sure those hundreds of transparent 1mm rivets don't hit the carpet or you may never see them again. At 3am I realized this robot project wasn't going to end well. Fortunately, the company was kind enough to exchange them for a couple of already-assembled robots, which I promptly named Flo and Spec, and when I recently built a 3rd robot myself, named Bandito (assembly time down to 6 hours), it worked the first time. Nice.

OK, so now to connect the robots to the network. The available options to send them commands in real time were limited to… exactly one, as far as I could tell: the [Robotis Darwin Mini app for Android](https://play.google.com/store/apps/details?id=com.robotis.darwinmini). That's fun for a while, but surely that's not the IoT. It’s a great start, because it shows that it’s technically possible to command them in real time, but it’s not enough plumbing. What's needed is an API, available over the network (not just my bluetooth network), to really open up possibilities. So I’d need to build an app to bridge between what the robots could do, namely respond to bluetooth commands, and what I wanted them to do, respond to HTTP requests over the internet.  And that's where the real adventure began...

I've never done any bluetooth communications, to a robot or to anything else, so first I reached out to the company. They were friendly, but they would not release the source code for their Android app, not even the sections that showed how to communicate to the robot. I posted on their discussion forums, but didn't get far. They did eventually send me a few links, for example to a page describing the packets the robot expects to receive, which were really useful – but only halfway there. I needed to know the second step: how to fill in the values. And as someone famous once said, it's problematic to leap over a chasm in two steps.

Fortunately, Calvin Yoo at Robotis sent me some more tantalizing clues: an example of an actual packet, with a bit of explanation of what some of the values mean. I pulled in a few other sources: in Android KitKat, you can [turn on bluetooth sniffing](http://profandroid.com/network/bluetooth/sniffing.html), and dump a log of bluetooth traffic, so I played with their app with logging turned on, and transferred the logs to my Mac using [adb](http://developer.android.com/tools/help/adb.html). I then used Wireshark to examine these rosetta stones for clues. Also very valuable was the "motion file" that controls the robot. It's a set of instructions that start from basic commands like "sit" and "pushup" and eventually define them in terms of servo motor positions and timings. Robotis gives you tools to create these motion files and sync them into the robot, but the default one that comes already loaded into the robot, and includes around forty commands, was good enough for my needs. What I was trying to do was to create an API on the network where you would tell it "sit" and it would receive the appropriate command from those forty, over bluetooth. (The link I had was actually to the Korean motion file, so I used Google Translate extensively to understand it, before I realized there was an [English motion file](http://support.robotis.com/en/baggage_files/darwinmini/darwin_mini_exemple_en.zip) too.)

Comparing the official instructions, Calvin's clues, and the stuff in the motion files with the packets I was seeing in Wireshark allowed me to assemble a working hypothesis for what I need to send:

<pre dir="ltr">
ff ff fd 00 c8 07 00 03 42 00 01 00 da 61 ==> initial position
ff ff fd 00 c8 07 00 03 42 00 03 00 d9 ed ==> sit
ff ff fd 00 c8 07 00 03 42 00 05 00 d9 f9 ==> greeting 1
ff ff fd 00 c8 07 00 03 42 00 16 00 da 13 ==> do a situp
ff ff fd 00 c8 07 00 03 42 00 nL nH cL cH ==> do command n
  where n is in hex as 2 bytes, low byte first
  and c is a CRC checksum on all preceding packet bytes
</pre>

_(If you're curious, the first 4 bytes are fixed; the next byte is the number 200 in hex – some sort of ID, not sure of what; the next 2 bytes are the number of remaining bytes in the packet, 7 in our case; then 1 byte that indicates we're writing rather than reading; then 2 bytes that mean to actually execute, so they never  change in our case; then come the 2 bytes that indicate which command; and finally, a CRC algorithm. All 2-byte values are given as low byte followed by high byte.)_

But how to send this ?

Where I wanted to go, eventually, was to send it from our Mule integration engine, but that required figuring out how to work with a Java bluetooth library, and that had issues of its own... (Note: this was just solved by one of our engineering gurus. We'll blog about that soon too.) So I started with the excellent, simple bluetooth library for node.js, available on npm: [bluetooth-serial-port](https://www.npmjs.org/package/bluetooth-serial-port). The steps are:

1.  Pair your robot with your laptop via bluetooth, as usual.

2.  Then invoke the library's super-useful command to list the paired devices, filter out the robot devices, and figure out which you want to talk to. Each has an address, e.g. `B8-63-BC-00-12-16`, and a channel on which it communicates. I defined, somewhat arbitrarily, a robot's id to be the last 4 characters of its address, e.g. `1216`, so I can address different robots by specifying this id, and I don't have to remember 12-character codes.

3.  When you know the robot's address and channel, you can ask the library whether it's connected or not, and if not then connect to it.

4.  Once connected, you create a binary packet, using node's Buffer object and its super-useful "hex" encoding, and write it to the bluetooth serial port.

I quickly [rewrote](https://github.com/usarid/robonode/blob/master/src/addCRC.js) the Robotis-provided CRC algorithm in JavaScript, fired up node, sent the binary packet, and **it worked**! My little robotic friend sat down, did some pull-ups, bowed gracefully... it was awesome. We have communication! I felt like that scene in _Close Encounters of the Third Kind_ when contact is made with the aliens. (And I'm dating myself, again.)

With this bridge crossed, I turned to defining a full API, and that was pure joy: I designed it in [RAML](http://raml.org/) using MuleSoft’s [API Designer](https://anypoint.mulesoft.com/apiplatform/), turned on the mocking service and played with the API Console to get a feeling for it.

![robonode-designer-1024x524.png](/post_images/robonode-designer-1024x524.png "robonode-designer-1024x524.png")

I even created [a simple API notebook](https://api-notebook.anypoint.mulesoft.com/notebooks/#109f445875d5646ec8f8) for scripting multiple motions to the robot: a simple demonstration of its flexibility, a choreographed set of feats of strength and fancy dance moves, followed by a deep bow. And that's when I hit the next wall, and the API Notebook proved its value, as it had in the past – by using it to write real-world usecases, I realized that I'd need to know how long a command takes to execute, so I can send the next command right after the previous one was done. My API had no notion of execution time, and I had no idea how to get that information. Back to hacking...

I tried to ask the robot whether it was done executing. The bluetooth library had an ability to read as well as write, the Robotis site indicated how to interpret read packets, and it even had some clue about asking the robot whether it's moving (I think). But even though sending the request to the robot and logging the bytes it emitted did yield some information, I could not figure out how to interpret it, and it didn't seem to correlate to whether the robot was still moving or not. That's a dead end, for now. _(Plea, especially to Robotis: I'd love some help figuring this out, at some point.)_

Instead, sleuthing around the Robotis site, I came across a hint: when defining motions with their tools, you cannot specify a time granularity finer than 0.08m seconds. And the motion file has XML strings like:

<pre dir="ltr">
&lt;steps&gt;
&nbsp;&nbsp;&nbsp;&lt;step frame="25" pose="-80.86 82.91 2.93 -1.17 ... 13.18 -13.18 0 0" /&gt;
&nbsp;&nbsp;&nbsp;&lt;step frame="75" pose="-56.84 57.13 ... 13.18 -13.18 0 0" /&gt;
&nbsp;&nbsp;&nbsp;...
&nbsp;&nbsp;&nbsp;&lt;step frame="400" pose="0 0 -73.24 73.24 0 0 0 0 ... 13.18 -13.18 0 0" /&gt;
&lt;/steps&gt;
</pre>

Well, a reasonable guess might be: each frame corresponds to 8ms, each step tells the robot the intended orientations of its various servos at a certain frame and hence at a certain time, and by looking at the last step and multiplying the frame number by 8ms, you get the length of time all the steps should take. The rest of the motion file helps you work the steps back to the command, with a few more guesses, e.g. there is an intermediate object called a "flow" defined as

<pre dir="ltr">
&lt;Flow name="Greet1" return="-1"&gt;
&nbsp;&nbsp;&nbsp;&lt;units&gt;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;unit main="Greet1" mainSpeed="1" loop="1" exit=""
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;exitSpeed="1" callSite="False" /&gt;
&nbsp;&nbsp;&nbsp;&lt;/units&gt;
&lt;/Flow&gt;
</pre>

and I assumed that you should multiply the step time by the value of "mainSpeed" and by the number of iterations indicated by the value of "loop" and add up all the units in the flow. Given a motion file, I could then calculate how long every command was supposed to take, and if I made a final assumption that the robot's current motion file was the default motion file I had access to, I'd be done. _(Another plea: if anyone, especially Robotis, can tell me how to ask the robot what its current motion file is, I'm happy to improve my implementation and eliminate this assumption. Which would be very cool: you could use Robotis' tools to create your own motion files, e.g. to do some elaborate dances and such, then invoke them from the API.)_

Armed with the knowledge of how long commands are supposed to take, I modified my API to add sync and async modes: in the default sync mode, the API calls now wait the appropriate number of ms before returning, so when they return you know the command has completed. This is convenient for making calls sequentially, but you might prefer to send a call and go on to do something else, and just set a callback to execute the next step once the allotted time has passed. So the async option in the API will return immediately, and in the response you can find the time in ms when the robot will actually be finished and be ready for the next command.

There's one more step. With node running on my machine, and the robots paired and turned on, I can talk to them from curl on the command line, I can script commands from various API notebooks and choreograph multiple robots together, and of course I can now mash up this API with others so, e.g. I can drive them through tweets or through texts (e.g. using Twilio) or anything else. I can do that, but you can't, because my API is running on my laptop on port 3000 behind my firewall and you can't get to it (hopefully). To allow you and others to access it, during demos I like to run [ngrok](https://ngrok.com/) on my laptop, to establish a tunnel from the public internet to my laptop's port 3000\. ngrok is beautifully implemented, so I paid "Mr ngrok" a bit of money to permanently reserve a spot on ngrok.com, to which I pointed a subdomain on my ramlicio.us domain, and that way I can be sure that calls to my subdomain are always routed to my laptop and hence to my robots whenever they're on and my node app is running. And **now** I can truly claim that my robotic thing 1 and thing 2 are connected to **the** network.

I packaged this all up with a short readme and [published it to github](https://github.com/usarid/robonode). Which leaves me wondering what's the next step? Perhaps a robot arena set up somewhere in the physical world, with a few robots, a server running ngrok, my node app (or the Mule app we're writing), and a webcam to show the action, all accessible by anyone on the internet? Or maybe a network of such robot arenas, much like there are networks of webcams, with different setups in each arena and maybe other connected devices (Sphero balls come to mind), perhaps with extra sensors on the robots (Robotis sells several), and mashups between these arenas and other services or between the arenas themselves – think robot social networks...

The possibilities are endless, but fortunately this blog post is not. I'm looking forward to more robotic action soon, and I'll be sure to blog about what I find. Here’s the final API notebook. It’s live, in the sense that you can play it and send commands right now… but my robots would have to be connected and my app would have to be running. Or you could get your own robots, run my app, and give this a try yourself!