export class _class {
    private major: string;
    private num: number;
    private prereq: string;
    private fall: boolean;
    private spring: boolean;
    private credits: number;

    constructor(major: string, num: number, prereq: string, fall: boolean, spring: boolean, credits: number){
        this.major = major;
        this.num = num;
        this.prereq = prereq;
        this.fall = fall;
        this.spring = spring;
        this.credits = credits;
    }

    getMajor(){
      return this.major;
    }
    getNum(){
      return this.num;
    }
    getPrereq(){
      return this.prereq;
    }
    getFall(){
      return this.fall;
    }
    getSpring(){
      return this.spring;
    }
    getCreds(){
      return this.credits;
    }

    toString(){
      const num = String(this.num);
      const fall = String(this.fall);
      const spring = String(this.spring);
      const credits = String(this.credits);
      return this.major + " " + num + " " + this.prereq + " " + fall + " " + spring + " " + credits;
    }
}

export class Node<T>{
  data: T;
  next: Node<T>;
}