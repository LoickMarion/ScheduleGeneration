export class Course {
    private major: string;
    private number: string;
    private prereqs: string[];
    private fall: boolean;
    private spring: boolean;
    private credits: number;

    constructor(major: string, number: string, prereqs: string[], fall: boolean, spring: boolean, credits: number){
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
      const fall = String(this.fall);
      const spring = String(this.spring);
      const credits = String(this.credits);
      return this.major + " " + this.number + " " + this.prereqs.toString() + " " + fall + " " + spring + " " + credits;
    }
    //implemented this method to just get the id of course, eg CS220
    toString(){
      return this.major + this.number;
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
  private numCoursesUnlockedMap: Map<string, number>;
  private courseList: string[];
  private creditLimit: number;
  private sortedClasses: string[];

  

  constructor(nodeMap: Map<string,Node<T>>, courseList: string[], creditLimit: number){
    //this.node_list = node_list;
    this.nodeMap = nodeMap;
    this.courseList = courseList;
    this.creditLimit = creditLimit;
    this.numCoursesUnlockedMap = new Map<string,number>;
    this.addPrereqLinks();
    this.sortedClasses = this.topoSort();
  }

  topoSort(){
    let finalList: string[] = [];     //final returned list of sorted classes
    let workingList: string[] = []    //tsc
    let incomingEdgeDict = new Map<string,number>();
    //initalize each node with 0 incoming edges.
    this.courseList.forEach((course) => {
      incomingEdgeDict.set(course.toString(),0);
      let numAdjacent = this.nodeMap.get(course)!.getAdjacent()?.length ?? 0
      this.numCoursesUnlockedMap.set(course.toString(), numAdjacent)})

    //update incoming edge dict  to have number of  edges unlocking each node. logic is that when this is 0, a course will be eligible to be taken. 

    this.courseList.forEach((course) => {
      this.nodeMap.get(course)!.getAdjacent().forEach((courseName) => {
          // Check if the key exists in the incomingEdgeDict

          let pleaseWork = incomingEdgeDict.get(courseName)!
          
          incomingEdgeDict.set(courseName, pleaseWork + 1);
          let num = String(pleaseWork+1)

          
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
    if(coursePrereqs.length === 0 ){
      return true;
    }
    return coursePrereqs.every((curr) => {
     const parsed = curr.split('||');
 
     const a = parsed.some((e) => coursesTaken.includes(e))
     return a;
    });
  }
  
  makeSchedule(){
    const schedule: string[][] = []
    const classesToAdd = this.topoSort()
    const coursesTaken: string[] = []
    
    
    while (classesToAdd.length > 0){

      let creditsInSem = 0;
      let coursesEligibleToTake: string[] = []
      let coursesInSem: string[] = []
 
      for(let i =0;i < classesToAdd.length && this.prereqsSatisfied(classesToAdd[i], coursesTaken);i++){
        coursesEligibleToTake.push(classesToAdd[i])
      }

      coursesEligibleToTake.sort((a,b) => this.numCoursesUnlockedMap.get(b)! - this.numCoursesUnlockedMap.get(a)!)
      //console.log(coursesEligibleToTake);

      for(const course of coursesEligibleToTake){
        if(this.enoughSpace(course,creditsInSem)){
          creditsInSem += this.nodeMap.get(course)!.getCourse().getCredits();
          coursesInSem.push(course)
          classesToAdd.splice(classesToAdd.indexOf(course),1)
        }
      }
      
      coursesInSem.forEach((course)=>coursesTaken.push(course))
      schedule.push(coursesInSem);
    }
    console.log(schedule);
    return schedule;
  }
}
