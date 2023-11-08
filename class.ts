export class _class {
    private major: string;
    private num: number;
    private prereq: string;
    private fall: boolean;
    private spring: boolean;

    constructor(major: string, num: number, prereq: string, fall: boolean, spring: boolean){
        this.major = major;
        this.num = num;
        this.prereq = prereq;
        this.fall = fall;
        this.spring = spring;
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

    toString(){
      const num = String(this.num);
      const fall = String(this.fall);
      const spring = String(this.spring);
      return this.major + " " + num + " " + this.prereq + " " + fall + " " + spring;
    }
}