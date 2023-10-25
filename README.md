# ScheduleGeneration

A Project by Loick Marion and James McGillicuddy
UMass Amherst Class of 2025

10/18 --
Started work on new project. Plan to have a working schedule builder in which a student
can create a future schedule based off of imported classes, majors, minors, etc.

Currently, we plan to create a list of all classes, then parse through each major requirement
in order to select those of importance -- eg

TODOS:
Figure out what in the world node.js is
Make a working parser
Figure out a working list data type
Construct a very basic first model

IDEAS:
Make a directed acyclic graph (DAG), and topological sort it into a list
Organization of files, including .txts and typescript files
Reduce possible ways to pull classes (eg only pull CS, Math, Chem, etc when calling CS. No need for Art History.)

10/23 --
Worked on parser, managed to get a working one that could read from the Classes.txt file, and then place the parsed
information into a new _class object, which was then placed into the classList array, leaving us with a list
of all of the classes, with their information gatherable. Also worked on comprehension of node.js and was able to 
compile and run our code successfully, transforming the ts file into a js file.

TODOS:
Work on going from a string array of classes -- [[220],[230]] -- to a working graph/list/etc.
If possible get some more classes into the text file 

IDEAS:
Find a metric of prioritizing classes, priorty/weight -- explicit courses high, 0 prereq openings low
Given two requirements of major, what course should you take? (eg CS & Physics double major could take MATH233 & STATS515, 
but only needs to take MATH233 to fufill both) 
In text file, possibly separate majors in different files
Pick Electives at start

