export class Course {
    private major: string;
    private number: number;
    private prereqs: string[];
    private fall: boolean;
    private spring: boolean;
    private credits: number;

    constructor(major: string, number: number, prereqs: string[], fall: boolean, spring: boolean, credits: number){
        this.major = major;
        this.number = number;
        this.prereqs = prereqs;
        this.fall = fall;
        this.spring = spring;
        this.credits = credits;
    }

    getMajor(){
      return this.major;
    }
    getNumber(){
      return this.number;
    }
    getPrereq(){
      return this.prereqs;
    }
    getFall(){
      return this.fall;
    }
    getSpring(){
      return this.spring;
    }
    getCredits(){
      return this.credits;
    }
    //this was originallycalled toString
    getAttributes(){
      const number = String(this.number);
      const fall = String(this.fall);
      const spring = String(this.spring);
      const credits = String(this.credits);
      return this.major + " " + number + " " + this.prereqs.toString() + " " + fall + " " + spring + " " + credits;
    }
    //implemented this method to just get the id of course, eg CS220
    toString(){
      const number = String(this.number);
      return this.major + number;
    }

    hasPrereq(){
      return this.getPrereq().length != 0;
    }
}

export class Node<T>{
  private data: Course;
  private coursesUnlocked: string[];
  

  constructor(data: Course, coursesUnlocked: string[]){
    this.data = data;
    this.coursesUnlocked = coursesUnlocked;
  }

  getCourse(){
    return this.data;
  }
  
  addAdjacent(course: string){
    this.coursesUnlocked.push(course);
  }

  getAdjacent(){
    return this.coursesUnlocked;
  }
}

export class Graph<T>{
  //private node_list: Node<T>[];
  private nodeMap: Map<string,Node<T>>;
  private courseList: string[];
  private creditLimit: number;
  private sortedClasses: string[];

  

  constructor(nodeMap: Map<string,Node<T>>, courseList: string[], creditLimit: number){
    //this.node_list = node_list;
    this.nodeMap = nodeMap;
    this.courseList = courseList;
    this.creditLimit = creditLimit;

    this.addPrereqLinks();
    this.sortedClasses = this.topoSort();
  }

  topoSort(){
    let finalList: string[] = []
    let workingList: string[] = []
    let incomingEdgeDict = new Map<string,number>();
    //initalize each node iwth 0 incoming edges.
    this.courseList.forEach((course) => incomingEdgeDict.set(course.toString(),0))

    //update incoming edge dict  to have number of  edges unlocking each node. logic is that when this is 0, a course will be eligible to be taken. 
    //This wont hold up long term but because wont work if you have to take course A and course B or course C, bc it iwll let you take jsut B and C, but
    //good rudimentary model ig
    this.courseList.forEach((course) => {
      this.nodeMap.get(course)!.getAdjacent().forEach((courseName) => {
          // Check if the key exists in the incomingEdgeDict
          let pleaseWork = incomingEdgeDict.get(courseName)!

          incomingEdgeDict.set(courseName, pleaseWork + 1);
          let num = String(pleaseWork+1)
          //console.log(courseName + "now has" + num + "edges")
          
      });
    }); 
    //add courses with no incoming edges to workingList.
    this.courseList.forEach((course) => {
      if(incomingEdgeDict.get(course)==0){
        workingList.push(course.toString())
      }
    });

    while(workingList.length > 0){
      //take the first element of workingList and add it to finalList
      let course = workingList.shift();
      if(course){
        finalList.push(course);

        //add all nodes with one remianing prereq adjacent to this node ( 0 after processing this) to the working list. remove 1 from remainging edges map
        this.nodeMap.get(course)!.getAdjacent().forEach((courseName)=>{
          if(incomingEdgeDict.get(courseName)==1){
            workingList.push(courseName)
          }
          let pleaseWork = incomingEdgeDict.get(courseName)!
          
            incomingEdgeDict.set(courseName, pleaseWork - 1);
          
        });
      }
    }
    return finalList;
}

  addPrereqLinks(){
    for (const course of this.courseList) {
      const node = this.nodeMap.get(course);

      if (node !== undefined) {

        const list: string[] = node.getCourse().getPrereq();
        for (const prereq of list) {

          const prereqNode = this.nodeMap.get(prereq);
          if (prereqNode !== undefined) {
            prereqNode.addAdjacent(course);
            this.nodeMap.set(prereq,prereqNode)
          } 
        }
      } 
    }
  }

  getNodeMap(){
    return this.nodeMap;
  }
  
  enoughSpace(course: string, creditsInSem: number){
    return this.nodeMap.get(course)!.getCourse().getCredits() + creditsInSem <= this.creditLimit
  }

  prereqsSatisfied(course: string, coursesTaken: string[]){
    let coursePrereqs: string[] = this.nodeMap.get(course)!.getCourse().getPrereq();
    console.log(coursePrereqs)
    if(coursePrereqs.length === 0 ){
      return true;
    }
    return coursePrereqs.every((curr) => coursesTaken.includes(curr));
  }
  makeSchedule(){
    const schedule: string[][] = []
    const classesToAdd = this.sortedClasses;
    const coursesTaken: string[] = []

    while (classesToAdd.length > 0){
      let creditsInSem = 0;
      let coursesInSem: string[] = []
      let i = 0
      while(i < classesToAdd.length && this.prereqsSatisfied(classesToAdd[i], coursesTaken)){
        console.log("adding class: " + classesToAdd[i] + '\n'+"courses taken: " + coursesTaken + '\n' + "prereqs satisfied: " + this.prereqsSatisfied(classesToAdd[i], coursesTaken) + '\n'+'\n' + '\n')
        if(this.enoughSpace(classesToAdd[0],creditsInSem)){
          creditsInSem += this.nodeMap.get(classesToAdd[i])!.getCourse().getCredits();
          coursesInSem.push(classesToAdd[i]);
          
          classesToAdd.splice(i,1);
          i--;
        }
        i++;
      }
      coursesInSem.forEach((course)=>coursesTaken.push(course))
      schedule.push(coursesInSem);
    }
    return schedule;
  }
}
