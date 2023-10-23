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

Idea for next time:
Make a directed acyclic graph (DAG), and topological sort it into a list
Organization of files, including .txts and typescript files
Reduce possible ways to pull classes (eg only pull CS, Math, Chem, etc when calling CS. No need for Art History.)
