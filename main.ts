import * as fs from "fs";
import { _class } from "./class";

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

