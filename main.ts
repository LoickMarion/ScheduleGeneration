import * as fs from "fs";

class _class {
    major: string;
    num: number;
    prereq: string;
    fall: boolean;
    spring: boolean;

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

function parser(data: String){
  const textByLine = data.split("\n");
  const classList: _class[] = [];

  for(let i = 0; i < textByLine.length; i++){
    let val = textByLine[i].split(',');
    let fall = val[3] === 'T';
    let spring = val[4] === 'T';
    const input = new _class(val[0],Number(val[1]),val[2],fall,spring);
    console.log(input.toString());
    classList.push(input);
  }
  return classList;
}

const filePath = './Classes.txt';
readFile(filePath)
  .then(data => {
    parser(data); 
  })
  .catch(error => {
    console.error(error);
  });

