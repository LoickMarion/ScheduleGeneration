class Instance {
    num: number;
    title: string;
    prereq: string;
    fall: boolean;
    spring: boolean;

    constructor(num: number, title: string, prereq: string){
      this.num = num;
      this.title = title;
      this.prereq = prereq;
      this.fall = false;
      this.spring = false;
    }
}

interface _List<T> { 
    isEmpty: () => boolean;
    head: () => T; tail: () => List<T>; }
    type List<T> = Readonly<_List<T>>; // makes it immutable
    function node<T>(data: T, rest: List<T>): List<T> {
        return { isEmpty: () => false, head: () => data, tail: () => rest }; 
    }
    function empty<T>(): List<T> {return { isEmpty:() => true, head:() => { throw new Error(); }, tail: () => { throw new Error(); }
}
}

//Elective here, click to insert 
//hashmap