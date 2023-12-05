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

11/8 --
Reconfigured readFile to be synchronous, made the parser return a class list and also added a course map. Plan to
use courseMap immutably, while class list will change according to classes taken, added, or removed. Edited prereqs
in order to parse them into an array of strings, which will be used as keys in the courseMap in order to access
easily. Started work on node and graph classes which we plan to eventually return the final product (schedule). Eventually,
we want to use some sort of database to host our data, today we looked into Microsoft Azure SQL, however we need to
learn more about the use cases and how to use it correctly before we integrate it. Also, we figured out live
sharing in VSCode which was a literal life-saver. Loick was genuinely having heart palpatations until we figured
it out. Plan to spend some more time working after our final midterms finish up. 

11/13 --
Worked on some typescript essentials as we began to flesh out the graph class. Was able to get working nodes, now we
need to work on adding courses to the coursesUnlocked array. We plan to essentially iterate through the text file
(which we plan to eventually move to a database) and first add all classes to a classMap and a classList, which we 
have done. Then, from those lists, create nodes from each with all of their information, which has also been done. The task
ahead now is to "point" from a class node to the classes that are made available after the class is taken in our directed
graph. Once we have that, we should be able to generate a basic 4 class per semester schedule with no input classes, based
upon which classes are required. Longer term tasks include practice with front-end development, possibility for 12-19 credit
semesters, solutions to non-specific required classes, such as upper level electives and gen-eds, and then eventually
support for minors, double majors, etc. Progress has been great, and both developers have felt a great sense of learning
and accomplishment as we tackle a Real-World problem solving issue through the use of code development.

IDEAS:
State upper level classes as '3XX', '4XX', etc. When "clicked", a drop down appears will all available options. When
a class is chosen from the options, we can (through eventOnClick) add that course to the courseList and to our 
directed graph, essentially integrating it into the user's class schedule while also updating any prereqs it may hold.

11/29 --
Got back to work after Thanksgiving Break and started to figure out the inner working of Azure Database & SQL. We were able
to get a very small working model, and created a table with all of the CS courses (just major and number for now) that we had
already created. We plan on creating another table for prerequisites, in which we list every course on the left, and its prereqs
on the right. In this case, we can simply search for the course and all of its prerequisites will pop up. That is one task to do,
others include furthering our understanding of SQL & Azure, and how to connect it all to our program. Beyond that, we believe
that there is not that much more work to do, as James will start to focus on some front-end & server development, while Loick
looks into fleshing out the back-end code. We both will collaborate on both parts together, but we figured we could divide & conquer
in that area, as it is the least complex part and we both know how to do each part.

12/4 -- 
Decided to stop focusing on Azure as it had a high barrier of entry, and instead are going to look into something smaller and simpler
like SQLite. Was able to finish the graph algo, used a topo sort. Now focusing ahead onto working with the database, front-end website,
and smaller issues. We plan to work small and transition to big, i.e focus on just the CS major and once that works we can expand
further.