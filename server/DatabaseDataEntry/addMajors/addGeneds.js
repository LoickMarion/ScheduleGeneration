const importedModule = require('./databaseCommands.js');
const { insertCourseTable, insertMajorReq, insertCoursesPerReq, insertPrereqTable } = importedModule;

//major, requirement, number needed, specific, can be satisfied by an out of major course
const gened_reqs = [
    ['GENED', 'ENGLWRIT112', 1, true, false],
    ['GENED', 'BASIC_MATH', 1, false, true],
    ['GENED', 'BIOLOGICAL_WORLD', 1, false, true],
    ['GENED', 'PHYSICAL_WORLD', 1, false, true],
    ['GENED', 'AT||AL', 1, false, true],
    ['GENED', 'HS', 1, false, true],
    ['GENED', 'SB', 1, false, true],
    ['GENED', 'SW', 1, false, true],
    ['GENED2', 'ANALYTIC_REASONING', 1, false, true],
    ['GENED2', 'DG', 1, false, true],
    ['GENED2', 'DU', 1, false, true]   
]

const gened_classes = [
    ['ENGLWRIT','112', true,true,3],
    ['ANTHRO','103', true,true,3],
    ['BIOLOGY','105', true,true,3],
    ['BIOLOGY','110', true,true,3],
    ['BIOLOGY','151', true,true,3],
    ['FOOD-SCI','150', true,true,3],
    ['ASTRON','100', true,true,4],
    ['FOOD-SCI','120', true,true,4],
    ['GEOGRAPH','110', true,true,4],
    ['GEOL','100', true,true,4],
    ['GEOL','101', true,true,4],
    ['GEOL','285', true,true,4],
    ['ANTHRO','101', true,true,4],
    ['BIOLOGY','105', true,true,3],
    ['BIOLOGY','110', true,true,3],
    ['BIOLOGY','151', true,true,3],
    ['FOOD-SCI','150', true,true,4],
    ['PHIL','160', true,true,4],
    ['MUSIC','101', true,true,4],
    ['MUSIC','110', true,true,4],
    ['ENGLISH','115', true,true,4],
    ['COMP-LIT','100', true,true,4],
    ['COMP-LIT','141', true,true,4],
    ['HISTORY','101', true,true,4],
    ['HISTORY','115', true,true,4],
    ['HISTORY','120', true,true,4],
    ['CLASSICS','102', true,true,4],
    ['ANTHRO','150', true,true,4],
    ['ECON','103', true,true,4],
    ['ENGLISH','150', true,true,4],
    ['EDUC','101', true,true,4],
    ['EDUC','167', true,true,4]
]
const ENGLWRIT112 = [
    ['GENED','ENGLWRIT112', 'ENGLWRIT112']
]

const BASIC_MATH = [
    ['GENED','BASIC_MATH','MATH100'],
    ['GENED','BASIC_MATH','MATH101'],
    ['GENED','BASIC_MATH','MATH102'],
    ['GENED','BASIC_MATH','MATH104'],
    ['GENED','BASIC_MATH','MATH121'],
    ['GENED','BASIC_MATH','MATH127'],
    ['GENED','BASIC_MATH','MATH131']
]

const BIOLOGICAL_WORLD = [
    ['GENED','BIOLOGICAL_WORLD','ANTHRO103'],
    ['GENED','BIOLOGICAL_WORLD','BIOLOGY105'],
    ['GENED','BIOLOGICAL_WORLD','BIOLOGY110'],
    ['GENED','BIOLOGICAL_WORLD','BIOLOGY151'],
    ['GENED','BIOLOGICAL_WORLD','FOOD-SCI150']
]

const PHYSICAL_WORLD = [
    ['GENED','PHYSICAL_WORLD', 'ASTRON100'],
    ['GENED','PHYSICAL_WORLD', 'CHEM111'],
    ['GENED','PHYSICAL_WORLD', 'FOOD-SCI120'],
    ['GENED','PHYSICAL_WORLD', 'GEOGRAPH110'],
    ['GENED','PHYSICAL_WORLD', 'GEOL101'],
    ['GENED','PHYSICAL_WORLD', 'PHYSICS151'],
    ['GENED','PHYSICAL_WORLD', 'PHYSICS152'],
    ['GENED','PHYSICAL_WORLD', 'PHYSICS181'],
    ['GENED','PHYSICAL_WORLD', 'PHYSICS182']
]

const ATorAL = [
    ['GENED','AT||AL','COMP-LIT100'],
    ['GENED','AT||AL','COMP-LIT141'],
    ['GENED','AT||AL','ENGLISH115'],
    ['GENED','AT||AL','MUSIC101'],
    ['GENED','AT||AL','PHIL160']
]

const HS = [
    ['GENED','HS','HISTORY101'],
    ['GENED','HS','HISTORY115'],
    ['GENED','HS','HISTORY120'],
    ['GENED','HS','CLASSICS102'],
    ['GENED','HS','ANTHRO150']
]

const SB = [
    ['GENED','SB','ANTHRO101'],
    ['GENED','SB','ECON103'],
    ['GENED','SB','ENGLISH150'],
    ['GENED','SB','EDUC101'],
    ['GENED','SB','EDUC167']
]

const SW = [
    ['GENED','SW','ANTHRO101'],
    ['GENED','SW','ECON103'],
    ['GENED','SW','ENGLISH150'],
    ['GENED','SW','EDUC101'],
    ['GENED','SW','EDUC167'],
    ['GENED','SW','HISTORY101'],
    ['GENED','SW','HISTORY115'],
    ['GENED','SW','HISTORY120'],
    ['GENED','SW','CLASSICS102'],
    ['GENED','SW','ANTHRO150'],
    ['GENED','SW','COMP-LIT100'],
    ['GENED','SW','COMP-LIT141'],
    ['GENED','SW','ENGLISH115'],
    ['GENED','SW','MUSIC101'],
    ['GENED','SW','PHIL160']
]

const DUDG = [
    ['GENED2','DG','COMP-LIT100'],
    ['GENED2','DG','COMP-LIT141'],
    ['GENED2','DG','HISTORY115'],
    ['GENED2','DG','HISTORY120'],
    ['GENED2','DU','EDUC167'],
    ['GENED2','DU','ENGLISH115']
 
]

const ANALYTIC_REASONING = [
    ['GENED2','ANALYTIC_REASONING','MATH127'],
    ['GENED2','ANALYTIC_REASONING','MATH131'],
    ['GENED2','ANALYTIC_REASONING','CICS110'],
    ['GENED2','ANALYTIC_REASONING','PHIL105'],
    ['GENED2','ANALYTIC_REASONING','MUSIC110']
]

gened_classes.forEach(data => insertCourseTable.run(...data));
insertCourseTable.finalize();

gened_reqs.forEach(data =>insertMajorReq.run(...data));
insertMajorReq.finalize();

ENGLWRIT112.forEach(data => insertCoursesPerReq.run(...data));
BASIC_MATH.forEach(data => insertCoursesPerReq.run(...data));
BIOLOGICAL_WORLD.forEach(data => insertCoursesPerReq.run(...data));
PHYSICAL_WORLD.forEach(data => insertCoursesPerReq.run(...data));
ATorAL.forEach(data => insertCoursesPerReq.run(data));
HS.forEach(data => insertCoursesPerReq.run(data));
SB.forEach(data => insertCoursesPerReq.run(data));
SW.forEach(data => insertCoursesPerReq.run(data));
DUDG.forEach(data => insertCoursesPerReq.run(data));
ANALYTIC_REASONING.forEach(data => insertCoursesPerReq.run(data));
insertCoursesPerReq.finalize();