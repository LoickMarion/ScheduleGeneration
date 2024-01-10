const importedModule = require('./databaseCommands.js');
const { insertCourseTable, insertMajorReq, insertCoursesPerReq, insertPrereqTable } = importedModule;

//math major requirements (only 1 concentration)
const math_reqs = [
    ['MATH', 'MATH131', 1, true, false],
    ['MATH', 'MATH132', 1, true, false],
    ['MATH', 'MATH233', 1, true, false],
    ['MATH', 'MATH235', 1, true, false],
    ['MATH', 'MATH300', 1, false, true], 
    ['MATH', 'PROGRAMMING', 1, false, true],
    ['MATH', 'MATH331', 1, true, false],
    ['MATH', 'ADVCALC', 1, false, false],
    ['MATH', 'MATH545', 1, true, false],
    ['MATH', 'MATH551', 1, true, false],
    ['MATH', 'MATH_MISC', 1, false, false],
    ['MATH', 'MATH_ELECTIVE', 2, false,false],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 1, false,true]
]
const programming = [
    ['MATH', 'PROGRAMMING', 'CICS110'],
    ['MATH', 'PROGRAMMING', 'PHYSICS281'],
    ['MATH', 'PROGRAMMING', 'ECE242']
]
const specifics = [
    ['MATH', 'MATH131', 'MATH131'],
    ['MATH', 'MATH132', 'MATH132'],
    ['MATH', 'MATH233', 'MATH233'],
    ['MATH', 'MATH235', 'MATH235'],
    ['MATH', 'MATH300', 'MATH300'],
    ['MATH', 'MATH300', 'CS250'],
    ['MATH', 'MATH331', 'MATH331'],
    ['MATH', 'MATH545', 'MATH545'],
    ['MATH', 'MATH551', 'MATH551']
]

const advanced_calc = [
    ['MATH', 'ADVCALC', 'MATH421'],
    ['MATH', 'ADVCALC', 'MATH522'],
    ['MATH', 'ADVCALC', 'MATH523H'],
    ['MATH', 'ADVCALC', 'MATH532'],
    ['MATH', 'ADVCALC', 'MATH534H'],
    ['MATH', 'ADVCALC', 'MATH552'],
    ['MATH', 'ADVCALC', 'MATH548'],
    ['MATH', 'ADVCALC', 'STAT516'],
    ['MATH', 'ADVCALC', 'STAT525']
]

const misc = [
    ['MATH', 'MATH_MISC', 'MATH456'],
    ['MATH', 'MATH_MISC', 'MATH532'],
    ['MATH', 'MATH_MISC', 'MATH534H'],
    ['MATH', 'MATH_MISC', 'MATH552'],
]

const electives = [
    ['MATH', 'MATH_ELECTIVE', 'MATH405'],
    ['MATH', 'MATH_ELECTIVE', 'MATH411'],
    ['MATH', 'MATH_ELECTIVE', 'MATH412'],
    ['MATH', 'MATH_ELECTIVE', 'MATH421'],
    ['MATH', 'MATH_ELECTIVE', 'MATH437'],
    ['MATH', 'MATH_ELECTIVE', 'MATH455'],
    ['MATH', 'MATH_ELECTIVE', 'MATH456'],
    ['MATH', 'MATH_ELECTIVE', 'MATH461'],
    ['MATH', 'MATH_ELECTIVE', 'MATH471'],
    ['MATH', 'MATH_ELECTIVE', 'MATH475'],
    ['MATH', 'MATH_ELECTIVE', 'MATH481'],
    ['MATH', 'MATH_ELECTIVE', 'MATH522'],
    ['MATH', 'MATH_ELECTIVE', 'MATH523H'],
    ['MATH', 'MATH_ELECTIVE', 'MATH524'],
    ['MATH', 'MATH_ELECTIVE', 'MATH534'],
    ['MATH', 'MATH_ELECTIVE', 'MATH536'],
    ['MATH', 'MATH_ELECTIVE', 'MATH537'],
    ['MATH', 'MATH_ELECTIVE', 'MATH545'],
    ['MATH', 'MATH_ELECTIVE', 'MATH548'],
    ['MATH', 'MATH_ELECTIVE', 'MATH551'],
    ['MATH', 'MATH_ELECTIVE', 'MATH552'],
    ['MATH', 'MATH_ELECTIVE', 'MATH557'],
    ['MATH', 'MATH_ELECTIVE', 'MATH563H'],
    ['MATH', 'MATH_ELECTIVE', 'MATH571'],
    ['MATH', 'MATH_ELECTIVE', 'MATH590STA'],
    ['MATH', 'MATH_ELECTIVE', 'STAT315'],
    ['MATH', 'MATH_ELECTIVE', 'STAT501'],
    ['MATH', 'MATH_ELECTIVE', 'STAT516'],
    ['MATH', 'MATH_ELECTIVE', 'STAT525'],
    ['MATH', 'MATH_ELECTIVE', 'STAT526'],
    ['MATH', 'MATH_ELECTIVE', 'STAT530'],
    ['MATH', 'MATH_ELECTIVE', 'STAT535'],
    ['MATH', 'MATH_ELECTIVE', 'STAT590T']
]

const core_classes = [
    ['MATH', '131', true, true, 4],
    ['MATH', '132', true, true, 4],
    ['MATH', '233', true, true, 4],
    ['MATH', '235', true, true, 3],
    ['MATH', '300', true, true, 3],
    ['MATH', '331', true, true, 3],

]

const outside_electives = [
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'MATH405'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'MATH411'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'MATH412'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'MATH421'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'MATH437'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'MATH455'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'MATH456'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'MATH461'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'MATH471'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'MATH475'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'MATH481'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'MATH522'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'MATH523H'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'MATH524'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'MATH534'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'MATH536'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'MATH537'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'MATH545'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'MATH548'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'MATH551'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'MATH552'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'MATH557'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'MATH563H'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'MATH571'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'MATH590STA'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'STAT315'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'STAT501'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'STAT516'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'STAT525'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'STAT526'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'STAT530'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'STAT535'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'STAT590T'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'BME330'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'BIOG597GE'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'BIOCHEM471'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'CHEM471'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'CICS397A'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'CS311'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'CS383'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'CS445'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'CS501'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'CS513'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'CS514'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'CS532'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'CS575'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'CS585'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'CS589'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'CHEM475'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'CHEM476'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'CHEM584'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'CHEM585'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'CHEMENG231'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'CHEMENG475'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'CE-ENGIN260'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'ECON309'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'ECON452'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'ECE213/313'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'ECE214/314'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'ECE333'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'LING492B'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'MIE230'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'MIE273'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'MIE340'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'MIE379'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'PHYSICS421'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'PHYSICS422'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'PHYSICS423'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'PHYSICS424'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'PHYSICS562'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'PHYSICS564'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'PHYSICS568'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'PUBLICHEALTH390R'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'PUBLICHEALTH460'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'PUBLICHEALTH490Z'],
    ['MATH', 'MATH_OUTSIDE_ELECTIVE', 'RESECON313']
]

const upper_levels = [
    ['MATH','405',true,true,3],
    ['MATH','411',true,true,3],
    ['MATH','412',true,true,3],
    ['MATH','421',true,true,3],
    ['MATH','437',true,true,3],
    ['MATH', '455',true,true,3],
    ['MATH', '456',true,true,3],
    ['MATH','461',true,true,3],
    ['MATH','471',true,true,3],
    ['MATH','475',true,true,3],
    ['MATH','481',true,true,3],
    ['MATH','522',true,true,3],
    ['MATH','523H',true,true,3],
    ['MATH','524',true,true,3],
    ['MATH','534',true,true,3],
    ['MATH','536',true,true,3],
    ['MATH','537',true,true,3],
    ['MATH','545',true,true,3],
    ['MATH','548',true,true,3],
    ['MATH','551',true,true,3],
    ['MATH','552',true,true,3],
    ['MATH','557',true,true,3],
    ['MATH','563H',true,true,3],
    ['MATH','571',true,true,3],
    ['MATH','590STA',true,true,3],
    ['STAT', '315',true,true,3],
    ['STAT','501',true,true,3],
    ['STAT','516',true,true,3],
    ['STAT','525',true,true,3],
    ['STAT','526',true,true,3],
    ['STAT', '530',true,true,3],
    ['STAT','535',true,true,3],
    ['STAT','590T',true,true,3]
]

const math_prereqs = [
    ['MATH132', 'MATH131'],
    ['MATH233','MATH132'],
    ['MATH235', 'MATH132'],
    ['MATH331','MATH132'],
    ['MATH300','MATH132'],
    ['MATH405','MATH235'],
    ['MATH405','MATH300||CS250'], //CS250 may need override
    ['MATH405','CICS110'],
    ['MATH411', 'MATH235'],
    ['MATH411','MATH300||CS250'],
    ['MATH412','MATH411'],
    ['MATH421','MATH233'],
    ['MATH437','MATH132'],
    ['MATH455','MATH233'],
    ['MATH455','MATH235'],
    ['MATH455', 'MATH300||CS250'],
    ['MATH456', 'MATH233'],
    ['MATH456', 'MATH235'],
    ['MATH461','MATH235'],
    ['MATH461','MATH300||CS250'], //CS250 may need override
    ['MATH471','MATH233'],
    ['MATH471','MATH235'],
    ['MATH471', 'MATH300||CS250'],
    ['MATH475','MATH233'],
    ['MATH475','MATH235'],
    ['MATH475', 'MATH300||CS250'],
    ['MATH481','MATH235'],
    ['MATH481','MATH300||CS250'],
    ['MATH522','MATH233'],
    ['MATH522','MATH235'],
    ['MATH522', 'MATH300||CS250'],
    ['MATH523H','MATH233'],
    ['MATH523H','MATH235'],
    ['MATH523H', 'MATH300||CS250'],
    ['MATH524','MATH523H'],
    ['MATH532','MATH233'],
    ['MATH532','MATH235'],
    ['MATH532', 'MATH331'],
    ['MATH534H','MATH233'],
    ['MATH534H','MATH235'],
    ['MATH534H', 'MATH331'],
    ['MATH536','MATH233'],
    ['MATH536','STAT315'],
    ['MATH537','MATH233'],
    ['MATH537','STAT315'],
    ['MATH545','MATH233'],
    ['MATH545','MATH235'],
    ['MATH545', 'MATH300||CS250'],
    ['MATH548','STAT315||CICS110'],
    ['MATH551','MATH233'],
    ['MATH551','MATH235'],
    ['MATH551', 'PHYSICS281||CICS110'],
    ['MATH552','MATH331'],
    ['MATH552','MATH551'],
    ['MATH557','MATH235'],
    ['MATH557', 'MATH300||CS250'],
    ['MATH563H','MATH233'],
    ['MATH563H','MATH235'],
    ['MATH571','MATH235'],
    ['MATH571', 'MATH300||CS250'],
    ['MATH590STA', 'STAT315'],
    ['MATH590STA', 'MATH233'],
    ['MATH590STA', 'MATH545'],
    ['STAT315','MATH132'],
    ['STAT516','STAT315'],
    ['STAT525', 'STAT516'],
    ['STAT526','STAT516'],
    ['STAT530','STAT525'],
    ['STAT535','STAT516'],
    ['STAT535', 'CICS110'],
    ['STAT590T','STAT516']
]

core_classes.forEach(data => insertCourseTable.run(...data));
upper_levels.forEach(data => insertCourseTable.run(...data));
insertCourseTable.finalize();

math_reqs.forEach(data =>insertMajorReq.run(...data));
insertMajorReq.finalize();

programming.forEach(data => insertCoursesPerReq.run(...data));
specifics.forEach(data => insertCoursesPerReq.run(...data));
electives.forEach(data => insertCoursesPerReq.run(...data));
outside_electives.forEach(data => insertCoursesPerReq.run(...data));
misc.forEach(data => insertCoursesPerReq.run(data));
advanced_calc.forEach(data => insertCoursesPerReq.run(data));
insertCoursesPerReq.finalize();

math_prereqs.forEach(data => insertPrereqTable.run(...data));
insertPrereqTable.finalize();