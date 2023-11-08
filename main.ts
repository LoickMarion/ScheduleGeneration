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
    let [major,number,prereq,fall,spring,credits] = textByLine[i].split(',');
    const input = new _class(major,Number(number),prereq, stringToBool(fall), stringToBool(spring),Number(credits));
    console.log(input.toString());
    classList.push(input);
  }
  return classList;
}

function stringToBool(s: string): boolean{
  return (s === "T");
}

const filePath = './Classes.txt';
readFile(filePath)
  .then(data => {
    parser(data); 
  })
  .catch(error => {
    console.error(error);
  });

