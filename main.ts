class Instance {
    num: number;
    title: string;
    prereq: string;

    constructor(num: number, title: string, prereq: string){
      this.num = num;
      this.title = title;
      this.prereq = prereq;
    }
}

const Class1 = new Instance(220,"Shit Class","CS187");
console.log(Class1.num);