const importedModule = require('./databaseCommands.js');
const { insertCourseTable, insertMajorReq, insertCoursesPerReq, insertPrereqTable } = importedModule;

const majorReqs = [
    ['PHYSICS','PHYSICS181',1,true,false],
    ['PHYSICS','PHYSICS182',1,true,false],
    ['PHYSICS','PHYSICS281',1,true,false],
    ['PHYSICS','PHYSICS282',1,true,false],
    ['PHYSICS','PHYSICS284',1,true,false],
    ['PHYSICS','PHYSICS286',1,true,false],
    ['PHYSICS','PHYSICS287',1,true,false],
    ['PHYSICS','PHYSICS289',1,true,false],
    ['PHYSICS','PHYSICS421',1,true,false],
    ['PHYSICS','PHYSICS422',1,true,false],
    ['PHYSICS','PHYSICS423',1,true,false],
    ['PHYSICS','PHYSICS424',1,true,false],
    ['PHYSICS','PHYSICS440',1,true,false],
    ['PHYSICS','PHYSICS500+',1,false,false],
    ['PHYSICS','MATH131',1,true,true],
    ['PHYSICS','MATH132',1,true,true],
    ['PHYSICS','MATH233',1,true,true],
    ['PHYSICS','MATH331',1,true,false]
]

const specifics = [
    ['PHYSICS','PHYSICS181','PHYSICS181'],
    ['PHYSICS','PHYSICS182','PHYSICS182'],
    ['PHYSICS','PHYSICS281','PHYSICS281'],
    ['PHYSICS','PHYSICS282','PHYSICS282'],
    ['PHYSICS','PHYSICS284','PHYSICS284'],
    ['PHYSICS','PHYSICS286','PHYSICS286'],
    ['PHYSICS','PHYSICS287','PHYSICS287'],
    ['PHYSICS','PHYSICS289','PHYSICS289'],
    ['PHYSICS','PHYSICS421','PHYSICS421'],
    ['PHYSICS','PHYSICS422','PHYSICS422'],
    ['PHYSICS','PHYSICS423','PHYSICS423'],
    ['PHYSICS','PHYSICS424','PHYSICS424'],
    ['PHYSICS','PHYSICS440','PHYSICS440'],
    ['PHYSICS','MATH131','MATH131'],
    ['PHYSICS','MATH132','MATH132'],
    ['PHYSICS','MATH233','MATH233'],
    ['PHYSICS','MATH331','MATH331']
]

const upper_elective = [
    ['PHYSICS','PHYSICS500+','PHYSICS531'],
    ['PHYSICS','PHYSICS500+','PHYSICS532'],
    ['PHYSICS','PHYSICS500+','PHYSICS537'],
    ['PHYSICS','PHYSICS500+','PHYSICS556'],
    ['PHYSICS','PHYSICS500+','PHYSICS564'],
    ['PHYSICS','PHYSICS500+','PHYSICS558']

]
const courses = [
    ['PHYSICS', '151', true, true, 4],
    ['PHYSICS', '181', true, true, 4],
    ['PHYSICS', '152', true, true, 4],
    ['PHYSICS', '182', true, true, 4],
    ['PHYSICS', '281', true, true, 3],
    ['PHYSICS', '282', true, true, 3],
    ['PHYSICS', '284', true, true, 3],
    ['PHYSICS', '286', true, true, 2],
    ['PHYSICS', '287', true, true, 3],
    ['PHYSICS', '289', true, true, 2],
    ['PHYSICS', '421', true, true, 4],
    ['PHYSICS', '422', true, true, 4],
    ['PHYSICS', '423', true, true, 4],
    ['PHYSICS', '424', true, true, 4],
    ['PHYSICS', '440', true, true, 4],

    ['PHYSICS', '531', true, true, 4],
    ['PHYSICS', '532', true, true, 4],
    ['PHYSICS', '537', true, true, 3],
    ['PHYSICS', '556', true, true, 3],
    ['PHYSICS', '558', true, true, 3],
    ['PHYSICS', '564', true, true, 3]
]

const prereqs = [
    ['PHYSICS152','PHYSICS151'],
    ['PHYSICS182','PHYSICS181'],
    ['PHYSICS281', 'MATH132'],
    ['PHYSICS281','PHYSICS181||PHYSICS151'],
    ['PHYSICS282','PHYSICS181||PHYSICS151'],
    ['PHYSICS282','PHYSICS182||PHYSICS152'],
    ['PHYSICS282','MATH233'],
    ['PHYSICS284','PHYSICS181||PHYSICS151'],
    ['PHYSICS284','MATH132'],
    ['PHYSICS284','MATH233'],   //coreq
    ['PHYSICS286','PHYSICS287'],    //no prereqs, has 284 as prereq so i did like this for now
    ['PHYSICS287','MATH132'],
    ['PHYSICS287','PHYSICS182'],
    ['PHYSICS289', 'PHYSICS182'],    //again no prereqs but is 287 coreq so did this for now
    ['PHYSICS421','PHYSICS151||PHYSICS181'],
    ['PHYSICS421','MATH233'],
    ['PHYSICS422','PHYSICS152||PHYSICS182'],
    ['PHYSICS422','MATH233'],
    ['PHYSICS423','PHYSICS284'],
    ['PHYSICS423','MATH233'],
    ['PHYSICS424','PHYSICS284'],
    ['PHYSICS440','PHYSICS424'],//this again isnt right but said has no prereqs which lso isnt right
    ['PHYSICS532','PHYSICS531'],
    ['PHYSICS537','PHYSICS424||CS490Q'],
    ['PHYSICS556','PHYSICS422'],
    ['PHYSICS556','PHYSICS424'],
    ['PHYSICS558','PHYSICS423'],
    ['PHYSICS558','PHYSICS424'],
    ['PHYSICS564','PHYSICS424']
]

courses.forEach(data => insertCourseTable.run(...data));
insertCourseTable.finalize();

prereqs.forEach(data => insertPrereqTable.run(...data));
insertPrereqTable.finalize();

specifics.forEach(data => insertCoursesPerReq.run(...data));
upper_elective.forEach(data => insertCoursesPerReq.run(data));
insertCoursesPerReq.finalize();

majorReqs.forEach(data =>insertMajorReq.run(...data));
insertMajorReq.finalize();