export class course {
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
}

export class Node<course>{
  private data: course;
  private courses_unlocked: Node<course>[];

  constructor(data: course, courses_unlocked: Node<course>[]){
    this.data = data;
    this.courses_unlocked = courses_unlocked;
  }
  
  addAdjacent(node: Node<course>){
    this.courses_unlocked.push(node);
  }

}

export class Graph<Node>{
  private node_list: Node[];
  private courseMap: Map<string,course>;
  private courseList: course[]


  constructor(node_list: Node[], courseMap: Map<string,course>, courseList: course[]){
    this.node_list = node_list;
    this.courseMap = courseMap;
    this.courseList = courseList;
  }

  makeSchedule(){
    return "a finished project! Thank you I'll take the paid internship."
  }
}
