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

    toString(){
      const number = String(this.number);
      const fall = String(this.fall);
      const spring = String(this.spring);
      const credits = String(this.credits);
      return this.major + " " + number + " " + this.prereqs.toString() + " " + fall + " " + spring + " " + credits;
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
}

export class Graph<T>{
  //private node_list: Node<T>[];
  private nodeMap: Map<string,Node<T>>;
  private courseList: string[]

  

  constructor(nodeMap: Map<string,Node<T>>, courseList: string[]){
    //this.node_list = node_list;
    this.nodeMap = nodeMap;
    this.courseList = courseList;

    this.addPrereqLinks()
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
}
