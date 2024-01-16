const importedModule = require('./databaseCommands.js');
const { insertCourseTable, insertMajorReq, insertCoursesPerReq, insertPrereqTable } = importedModule;

const courses = [
    ['PHYSICS', '151', true, true, 4],
    ['PHYSICS', '181', true, true, 4],
    ['PHYSICS', '152', true, true, 4],
    ['PHYSICS', '182', true, true, 4],
    ['PHYSICS', '281', true, true, 3]
]

const prereqs = [
    ['PHYSICS152','PHYSICS151'],
    ['PHYSICS182','PHYSICS181'],
    ['PHYSICS281', 'MATH132'],
    ['PHYSICS281','PHYSICS181||PHYSICS151']
]

courses.forEach(data => insertCourseTable.run(...data));
insertCourseTable.finalize();

prereqs.forEach(data => insertPrereqTable.run(...data));
insertPrereqTable.finalize();