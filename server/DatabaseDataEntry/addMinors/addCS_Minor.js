const importedModule = require('./databaseCommands.js');
const { insertCourseTable, insertMajorReq, insertCoursesPerReq, insertPrereqTable } = importedModule;

const cs_reqs = [
    ['CS', 'CICS160', 1, true, false],
    ['CS', 'CICS210', 1, true, false],
    ['CS', 'CS_Core', 2, false, false],
    ['CS', 'CS_200plus', 1, false, false]
]

const specifics = [
    ['CS', 'CICS160', 'CICS160'],
    ['CS', 'CICS210', 'CICS210']
]

const CS_Core = [
    ['CS', 'CS220', 'CS220'],
    ['CS', 'CS230', 'CS230'],
    ['CS', 'CS240', 'CS240'],
    ['CS', 'CS250', 'CS250']
]

const CS_200plus = [
    
]