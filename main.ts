import * as fs from "fs";

class _class {
    major: string;
    num: number;
    prereq: string;
    fall: boolean;
    spring: boolean;

    constructor(num: number, title: string, prereq: string){
        this.major = this.major;
        this.num = num;
        this.prereq = prereq;
        this.fall = false;
        this.spring = false;
    }
}
/*
//const filePath = '../Classes.txt';

function readFile(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

readFile(filePath)
  .then(data => {
    console.log(data); // File content as a string
  })
  .catch(error => {
    console.error(error);
  });
*/
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
console.log("hi")
//Elective here, click to insert 
//hashmap