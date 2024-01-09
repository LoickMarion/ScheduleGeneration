const importedModule = require('./createDatabase.js');
const { insertCourseTable, insertMajorReq, insertCoursesPerReq, insertPrereqTable } = importedModule;
// CS Courses
CS_ARRAY = ['CS400+','CS300+','CS300More']
const cs_reqs = [
    ['CS', 'CICS110', 1,true],
    ['CS', 'CICS160', 1,true],
    ['CS', 'CICS210', 1,true],
    ['CS', 'CS220', 1,true],
    ['CS', 'CS230', 1,true],
    ['CS', 'CS240', 1,true],
    ['CS', 'CS250', 1,true],
    ['CS', 'CS311', 1,true],
    ['CS', 'CS300+', 3,false],
    ['CS', 'CS300More', 1,false],
    ['CS', 'CS400+', 3,false],
    ['CS', 'CSLAB', 2,false],
    ['CS', 'MATH131', 1,true],
    ['CS', 'MATH132',1,true],
    ['CS', 'MATH233||STATS315', 1,false],
    ['CS', 'MATH235', 1,true]
]
const cs_others = [
    ['MATH131', 'MATH131'],
    ['MATH132', 'MATH132'],
    ['MATH233||STATS315', 'MATH233'],
    ['MATH233||STATS315', 'STATS315'],
    ['MATH235','MATH235'],
    ['CSLAB', 'CHEM111'],
    ['CSLAB', 'CHEM121'],
    ['CSLAB', 'CHEM112'],
    ['CSLAB', 'CHEM122'],
    ['CSLAB', 'GEOL101'],
    ['CSLAB', 'GEOL103'],
    ['CSLAB', 'GEOL105'],
    ['CSLAB', 'GEOL131'],
    ['CSLAB', 'PHYSICS151'],
    ['CSLAB', 'PHYSICS181'],
    ['CSLAB', 'PHYSICS152'],
    ['CSLAB', 'PHYSICS182']

]

const specifics = [
    ['CICS110', 'CICS110'],
    ['CICS160', 'CICS160'],
    ['CICS210', 'CICS210'],
    ['CS220', 'CS220'],
    ['CS230', 'CS230'],
    ['CS240', 'CS240'],
    ['CS250', 'CS250'],
    ['CS311', 'CS311']
]
const _300 = [
    ['CS300+', 'CS320'],
    ['CS300+', 'CS325'],
    ['CS300+', 'CS326'],
    ['CS300+', 'CS345'],
    ['CS300+', 'CS348'],
    ['CS300+', 'CS360'],
    ['CS300+', 'CS370'],
    ['CS300+', 'CS373'],
    ['CS300+', 'CS377'],
    ['CS300+', 'CS383'],
    ['CS300+', 'CS389'],
    ['CS300+', 'CS390R'],
    ['CS300+', 'CS420'],
    ['CS300+', 'CS429'],
    ['CS300+', 'CS445'],
    ['CS300+', 'CS446'],
    ['CS300+', 'CS453'],
    ['CS300+', 'CS466'],
    ['CS300+', 'CS485'],
    ['CS300+', 'CS490Q'],
    ['CS300+', 'CS491G'],
    ['CS300+', 'CS501'],
    ['CS300+', 'CS520'],
    ['CS300+', 'CS528'],
    ['CS300+', 'CS532'],
    ['CS300+', 'CS535'],
    ['CS300+', 'CS546'],
    ['CS300+', 'CS550'],
    ['CS300+', 'CS561'],
    ['CS300+', 'CS564'],
    ['CS300+', 'CS565'],
    ['CS300+', 'CS574'],
    ['CS300+', 'CS589'],
    ['CS300+', 'CS590AB'],
    ['CS300+', 'CS590AE'],
    ['CS300+', 'CS590X']
]
const _400 = [
    ['CS400+', 'CS420'],
    ['CS400+', 'CS429'],
    ['CS400+', 'CS445'],
    ['CS400+', 'CS446'],
    ['CS400+', 'CS453'],
    ['CS400+', 'CS466'],
    ['CS400+', 'CS485'],
    ['CS400+', 'CS490Q'],
    ['CS400+', 'CS491G'],
    ['CS400+', 'CS501'],
    ['CS400+', 'CS520'],
    ['CS400+', 'CS528'],
    ['CS400+', 'CS532'],
    ['CS400+', 'CS535'],
    ['CS400+', 'CS546'],
    ['CS400+', 'CS550'],
    ['CS400+', 'CS561'],
    ['CS400+', 'CS564'],
    ['CS400+', 'CS565'],
    ['CS400+', 'CS574'],
    ['CS400+', 'CS589'],
    ['CS400+', 'CS590AB'],
    ['CS400+', 'CS590AE'],
    ['CS400+', 'CS590X']
]

const _300More = [ 
    // ['300More','ECE353'],
    // ['300More','ECE547'],
    // ['300More','ECE668'],
    // ['300More','LINGUIST401'],   Commented out for sake of prereqs
    ['CS300More', 'MATH411'],
    ['CS300More', 'MATH545'],
    ['CS300More', 'MATH551'],
    ['CS300More', 'MATH552'],
    ['CS300More', 'CS320'],
    ['CS300More', 'CS325'],
    ['CS300More', 'CS326'],
    ['CS300More', 'CS345'],
    ['CS300More', 'CS348'],
    ['CS300More', 'CS360'],
    ['CS300More', 'CS370'],
    ['CS300More', 'CS373'],
    ['CS300More', 'CS377'],
    ['CS300More', 'CS383'],
    ['CS300More', 'CS389'],
    ['CS300More', 'CS390R'],
    ['CS300More', 'CS420'],
    ['CS300More', 'CS429'],
    ['CS300More', 'CS445'],
    ['CS300More', 'CS446'],
    ['CS300More', 'CS453'],
    ['CS300More', 'CS466'],
    ['CS300More', 'CS485'],
    ['CS300More', 'CS490Q'],
    ['CS300More', 'CS491G'],
    ['CS300More', 'CS501'],
    ['CS300More', 'CS520'],
    ['CS300More', 'CS528'],
    ['CS300More', 'CS532'],
    ['CS300More', 'CS535'],
    ['CS300More', 'CS546'],
    ['CS300More', 'CS550'],
    ['CS300More', 'CS561'],
    ['CS300More', 'CS564'],
    ['CS300More', 'CS565'],
    ['CS300More', 'CS574'],
    ['CS300More', 'CS589'],
    ['CS300More', 'CS590AB'],
    ['CS300More', 'CS590AE'],
    ['CS300More', 'CS590X']
]

const coreClasses = [
    ['CICS', '110', true, true, 4],
    ['CICS', '160', true, true, 4],
    ['CS', '198C', true, true, 1],
    ['CICS', '210', true, true, 4],
    ['CS', '220', true, true, 4],
    ['CS', '230', true, true, 4],
    ['CS', '240', true, true, 4],
    ['CS', '250', true, true, 4],
    ['CS', '305', true, true, 3],
    ['CS', '311', true, true, 4]
  ];
  
  const electives300 = [
    ['CS', '320', true, true, 4],
    ['CS', '325', true, true, 3],
    ['CS', '326', true, true, 4],
    ['CS', '345', true, true, 3],
    ['CS', '348', true, true, 3],
    ['CS', '360', true, true, 3],
    ['CS', '370', true, true, 3],
    ['CS', '373', true, true, 3],
    ['CS', '377', true, true, 4],
    ['CS', '383', true, true, 3],
    ['CS', '389', true, true, 3],
    ['CS', '390R', true, true, 3]
  ];
  
  const electives400 = [
    ['CS', '420', true, true, 3],
    ['CS', '429', true, true, 3],
    ['CS', '445', true, true, 3],
    ['CS', '446', true, true, 3],
    ['CS', '453', true, true, 3],
    ['CS', '466', true, true, 3],
    ['CS', '485', true, true, 3],
    ['CS', '490Q', true, true, 3],
    ['CS', '491G', true, true, 3]
  ];
  
  const electives500 = [
    ['CS', '501', true, true, 3],
    ['CS', '520', true, true, 3],
    ['CS', '528', true, true, 3],
    ['CS', '532', true, true, 3],
    ['CS', '535', true, true, 3],
    ['CS', '546', true, true, 3],
    ['CS', '550', true, true, 3],
    ['CS', '561', true, true, 3],
    ['CS', '564', true, true, 3],
    ['CS', '565', true, true, 3],
    ['CS', '574', true, true, 3],
    ['CS', '589', true, true, 3],
    ['CS', '590AB', true, true, 3],
    ['CS', '590AE', true, true, 3],
    ['CS', '590X', true, true, 3]
  ];
  
  const nonCS = [
    // ['MATH', '131', true, true, 4],
    // ['MATH', '132', true, true, 4],
    // ['MATH', '233', true, true, 4],
    // ['MATH', '235', true, true, 3],
    // ['STATS', '315', true, true, 3],
    // ['MATH', '545', true, true, 3],
    ['CICS', '256', true, true, 4],
    ['CHEM', '111', true, true, 4],
    ['CHEM', '121', true, true, 4],
    ['CHEM', '112', true, true, 4],
    ['CHEM', '122', true, true, 4],
    ['GEOL', '101', true, true, 4],
    ['GEOL', '103', true, true, 4],
    ['GEOL', '105', true, true, 4],
    ['GEOL', '131', true, true, 4],
    ['PHYSICS', '151', true, true, 4],
    ['PHYSICS', '181', true, true, 4],
    ['PHYSICS', '152', true, true, 4],
    ['PHYSICS', '182', true, true, 4],
    ['ENGLISH', '112', true, true, 3],
    ['GEN-ED','1',true,true,3],
    ['GEN-ED','2',true,true,3],
    ['GEN-ED','3',true,true,3],
    ['GEN-ED','4',true,true,3]
  ]
  
  const csPrereqs =[
    // ['MATH132','MATH131'],
    // ['MATH233','MATH132'],
    // ['MATH235','MATH132'],
    // ['STATS315','MATH132'],
    // ['MATH545', 'MATH235'],
    ['CICS160','CICS110'],
    ['CICS210','CICS160'],
    ['CS198C','CICS160'],
    ['CS220','CICS210'],
    ['CS230','CICS210'],
    ['CS230','CS198C'],
    ['CS240','CICS160'],
    ['CS240','MATH132'],
    ['CS250','CICS160'],
    ['CS250','MATH132'],
    ['CS311','CICS210'],
    ['CS311','CS250||MATH455'],
    ['CS320','CS220'],
    ['CS325','CICS210'],
    ['CS326','CS220||CS230'],
    ['CS328','CICS210'],
    ['CS335','CS220||CS230'],
    ['CS345','CICS210'],
    ['CS348','CICS210'],
    ['CS348','CS240'],
    ['CS348','CS250||MATH455'],
    ['CS360','CS230'],
    ['CS363','CS230'],
    ['CS365','CS230'],
    ['CS370','CS240||CS383'],
    ['CS373','CICS210'],
    ['CS373','MATH235'],
    ['CS377','CS230'],
    ['CS383','CS240||STATS315'],
    ['CS383','CS220||CS230'],
    ['CS389','CS220||CS230'],
    ['CS389','CS240||STATS315'],
    ['CS389','MATH233'],
    ['CS390R','CS230'],
    ['CS420','CS320||CS326'],
    ['CS426','CS320||CS326'],
    ['CS429','CS320'],
    ['CS445','CS220||CS230'],
    ['CS445','CS311'],
    ['CS445','CS345'],
    ['CS446','CS240||CS383'],
    ['CS453','CS230||CS377'],
    ['CS461','CS326||CS345||CS377||CS453'],
    ['CS466','CS311'],
    ['CS485','CS220'],
    ['CS485','CS240'],
    ['CS490Q','MATH132'],
    ['CS490Q','MATH235'],
    ['CS490Q','CS240||STATS315'],
    ['CS491G','CS453'],
    ['CS501','CS311'],
    ['CS513','CS250'],
    ['CS513','CS311'],
    ['CS514','CS240||STATS315'],
    ['CS514','CS311'],
    ['CS515','CS240'],
    ['CS515','CS250'],
    ['CS520','CS320||CS326'],
    ['CS524','CS240||STATS315'],
    ['CS528','CS230'],
    ['CS528','CS240'],
    ['CS532','CS377'],
    ['CS532','CS445'],
    ['CS535','CS335'],
    ['CS546','CS320||CS326'],
    ['CS546','CS383||CS446||CS485'],
    ['CS550','CICS210'],
    ['CS550','STATS315'],
    ['CS560','CS453'],
    ['CS561','CS360||CS560'],
    ['CS561','CS453'],
    ['CS563','CS311||CS383||CS360'],
    ['CS564','CS230'],
    ['CS564','CS360||CS365||CS390R||CS466'],
    ['CS565','CS365||CS377'],
    ['CS574','CS311'],
    ['CS574','CS383'],
    ['CS574','CS373'],
    ['CS576','CS220'],
    ['CS576','CS250||CS311'],
    ['CS576','MATH235'],
    ['CS578','CS377'],
    ['CS589','MATH545'],
    ['CS589','CS240'],
    ['CS589','STATS315'],
    ['CS590AB','MATH235'],
    ['CS590AB','CS240||CS515||PHYSICS281'],
    ['CS590AE','CS453'],
    ['CS590X','CS240||STATS315'],
    ['CS590X','CICS210']
    ];
  
  
  coreClasses.forEach(data => insertCourseTable.run(...data));
  electives300.forEach(data => insertCourseTable.run(...data));
  electives400.forEach(data => insertCourseTable.run(...data));
  electives500.forEach(data => insertCourseTable.run(...data));
  nonCS.forEach(data => insertCourseTable.run(...data));
  insertCourseTable.finalize();

  cs_reqs.forEach(data =>insertMajorReq.run(...data));
  insertMajorReq.finalize();

  cs_others.forEach(data => insertCoursesPerReq.run(...data));
  specifics.forEach(data => insertCoursesPerReq.run(...data));
  _300.forEach(data => insertCoursesPerReq.run(...data));
  _400.forEach(data => insertCoursesPerReq.run(...data));
  _300More.forEach(data => insertCoursesPerReq.run(data));
  insertCoursesPerReq.finalize();

  csPrereqs.forEach(data => insertPrereqTable.run(...data));
  insertPrereqTable.finalize();

  

 

  