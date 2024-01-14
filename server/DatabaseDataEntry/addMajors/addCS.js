const importedModule = require('./databaseCommands.js');
const { insertCourseTable, insertMajorReq, insertCoursesPerReq, insertPrereqTable } = importedModule;
// CS Courses

//major, class number, amount you need to take, is it specific, can an out of major course satisfy
const cs_reqs = [
    ['CS', 'CICS110', 1, true, false],
    ['CS', 'CICS160', 1, true, false],
    ['CS', 'CICS210', 1, true, false],
    ['CS', 'CS198C', 1, true, false],
    ['CS', 'CS220', 1, true, false],
    ['CS', 'CS230', 1, true, false],
    ['CS', 'CS240', 1, true, false],
    ['CS', 'CS250', 1, true, false],
    ['CS', 'CS311', 1, true, false],
    ['CS', 'CS300+', 3, false, false],
    ['CS', 'CS300More', 1, false, true],
    ['CS', 'CS400+', 3, false, false],
    ['CS', 'CSLAB', 2, false, true],
    ['CS', 'MATH131', 1, true, false],
    ['CS', 'MATH132',1, true, false],
    ['CS', 'MATH233||STAT315', 1, false, false],
    ['CS', 'MATH235', 1, true, false]
]
const cs_others = [
    ['CS', 'MATH131', 'MATH131'],
    ['CS', 'MATH132', 'MATH132'],
    ['CS', 'MATH233||STAT315', 'MATH233'],
    ['CS', 'MATH233||STAT315', 'STAT315'],
    ['CS', 'MATH235','MATH235'],
    ['CS', 'CSLAB', 'CHEM111'],
    ['CS', 'CSLAB', 'CHEM121'],
    ['CS', 'CSLAB', 'CHEM112'],
    ['CS', 'CSLAB', 'CHEM122'],
    ['CS', 'CSLAB', 'GEOL101'],
    ['CS', 'CSLAB', 'GEOL103'],
    ['CS', 'CSLAB', 'GEOL105'],
    ['CS', 'CSLAB', 'GEOL131'],
    ['CS', 'CSLAB', 'PHYSICS151'],
    ['CS', 'CSLAB', 'PHYSICS181'],
    ['CS', 'CSLAB', 'PHYSICS152'],
    ['CS', 'CSLAB', 'PHYSICS182']

]

const specifics = [
  ['CS', 'CICS110', 'CICS110'],
  ['CS', 'CICS160', 'CICS160'],
  ['CS', 'CICS210', 'CICS210'],
  ['CS', 'CS198C', 'CS198C'],
  ['CS', 'CS220', 'CS220'],
  ['CS', 'CS230', 'CS230'],
  ['CS', 'CS240', 'CS240'],
  ['CS', 'CS250', 'CS250'],
  ['CS', 'CS311', 'CS311']
]
const _300 = [
  ['CS', 'CS300+', 'CS320'],
  ['CS', 'CS300+', 'CS325'],
  ['CS', 'CS300+', 'CS326'],
  ['CS', 'CS300+', 'CS345'],
  ['CS', 'CS300+', 'CS348'],
  ['CS', 'CS300+', 'CS360'],
  ['CS', 'CS300+', 'CS370'],
  ['CS', 'CS300+', 'CS373'],
  ['CS', 'CS300+', 'CS377'],
  ['CS', 'CS300+', 'CS383'],
  ['CS', 'CS300+', 'CS389'],
  ['CS', 'CS300+', 'CS390R'],
  ['CS', 'CS300+', 'CS420'],
  ['CS', 'CS300+', 'CS429'],
  ['CS', 'CS300+', 'CS445'],
  ['CS', 'CS300+', 'CS446'],
  ['CS', 'CS300+', 'CS453'],
  ['CS', 'CS300+', 'CS466'],
  ['CS', 'CS300+', 'CS485'],
  ['CS', 'CS300+', 'CS490Q'],
  ['CS', 'CS300+', 'CS491G'],
  ['CS', 'CS300+', 'CS501'],
  ['CS', 'CS300+', 'CS520'],
  ['CS', 'CS300+', 'CS528'],
  ['CS', 'CS300+', 'CS532'],
  ['CS', 'CS300+', 'CS535'],
  ['CS', 'CS300+', 'CS546'],
  ['CS', 'CS300+', 'CS550'],
  ['CS', 'CS300+', 'CS561'],
  ['CS', 'CS300+', 'CS564'],
  ['CS', 'CS300+', 'CS565'],
  ['CS', 'CS300+', 'CS574'],
  ['CS', 'CS300+', 'CS589'],
  ['CS', 'CS300+', 'CS590AB'],
  ['CS', 'CS300+', 'CS590AE'],
  ['CS', 'CS300+', 'CS590X']
]
const _400 = [
  ['CS', 'CS400+', 'CS420'],
  ['CS', 'CS400+', 'CS429'],
  ['CS', 'CS400+', 'CS445'],
  ['CS', 'CS400+', 'CS446'],
  ['CS', 'CS400+', 'CS453'],
  ['CS', 'CS400+', 'CS466'],
  ['CS', 'CS400+', 'CS485'],
  ['CS', 'CS400+', 'CS490Q'],
  ['CS', 'CS400+', 'CS491G'],
  ['CS', 'CS400+', 'CS501'],
  ['CS', 'CS400+', 'CS520'],
  ['CS', 'CS400+', 'CS528'],
  ['CS', 'CS400+', 'CS532'],
  ['CS', 'CS400+', 'CS535'],
  ['CS', 'CS400+', 'CS546'],
  ['CS', 'CS400+', 'CS550'],
  ['CS', 'CS400+', 'CS561'],
  ['CS', 'CS400+', 'CS564'],
  ['CS', 'CS400+', 'CS565'],
  ['CS', 'CS400+', 'CS574'],
  ['CS', 'CS400+', 'CS589'],
  ['CS', 'CS400+', 'CS590AB'],
  ['CS', 'CS400+', 'CS590AE'],
  ['CS', 'CS400+', 'CS590X']
];

const _300More = [ 
  ['CS', 'CS300More', 'MATH411'],
  ['CS', 'CS300More', 'MATH545'],
  ['CS', 'CS300More', 'MATH551'],
  ['CS', 'CS300More', 'MATH552'],
  ['CS', 'CS300More', 'CS320'],
  ['CS', 'CS300More', 'CS325'],
  ['CS', 'CS300More', 'CS326'],
  ['CS', 'CS300More', 'CS345'],
  ['CS', 'CS300More', 'CS348'],
  ['CS', 'CS300More', 'CS360'],
  ['CS', 'CS300More', 'CS370'],
  ['CS', 'CS300More', 'CS373'],
  ['CS', 'CS300More', 'CS377'],
  ['CS', 'CS300More', 'CS383'],
  ['CS', 'CS300More', 'CS389'],
  ['CS', 'CS300More', 'CS390R'],
  ['CS', 'CS300More', 'CS420'],
  ['CS', 'CS300More', 'CS429'],
  ['CS', 'CS300More', 'CS445'],
  ['CS', 'CS300More', 'CS446'],
  ['CS', 'CS300More', 'CS453'],
  ['CS', 'CS300More', 'CS466'],
  ['CS', 'CS300More', 'CS485'],
  ['CS', 'CS300More', 'CS490Q'],
  ['CS', 'CS300More', 'CS491G'],
  ['CS', 'CS300More', 'CS501'],
  ['CS', 'CS300More', 'CS520'],
  ['CS', 'CS300More', 'CS528'],
  ['CS', 'CS300More', 'CS532'],
  ['CS', 'CS300More', 'CS535'],
  ['CS', 'CS300More', 'CS546'],
  ['CS', 'CS300More', 'CS550'],
  ['CS', 'CS300More', 'CS561'],
  ['CS', 'CS300More', 'CS564'],
  ['CS', 'CS300More', 'CS565'],
  ['CS', 'CS300More', 'CS574'],
  ['CS', 'CS300More', 'CS589'],
  ['CS', 'CS300More', 'CS590AB'],
  ['CS', 'CS300More', 'CS590AE'],
  ['CS', 'CS300More', 'CS590X']
];

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
    ['CS', '365', true, true, 3],
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
    ['CS383','CS240||STAT315'],
    ['CS383','CS220||CS230'],
    ['CS389','CS220||CS230'],
    ['CS389','CS240||STAT315'],
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
    ['CS490Q','CS240||STAT315'],
    ['CS491G','CS453'],
    ['CS501','CS311'],
    ['CS513','CS250'],
    ['CS513','CS311'],
    ['CS514','CS240||STAT315'],
    ['CS514','CS311'],
    ['CS515','CS240'],
    ['CS515','CS250'],
    ['CS520','CS320||CS326'],
    ['CS524','CS240||STAT315'],
    ['CS528','CS230'],
    ['CS528','CS240'],
    ['CS532','CS377'],
    ['CS532','CS445'],
    ['CS535','CS335'],
    ['CS546','CS320||CS326'],
    ['CS546','CS383||CS446||CS485'],
    ['CS550','CICS210'],
    ['CS550','STAT315'],
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
    ['CS589','STAT315'],
    ['CS590AB','MATH235'],
    ['CS590AB','CS240||CS515||PHYSICS281'],
    ['CS590AE','CS453'],
    ['CS590X','CS240||STAT315'],
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

  

 

  