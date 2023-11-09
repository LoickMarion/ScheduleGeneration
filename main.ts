import * as fs from "fs";
import { course } from "./course";

function readFileSync(filePath: string): string {
  try {
      return fs.readFileSync(filePath, 'utf8');
  } catch (err) {
      console.error("Error reading file:", err);
      return "";
  }
}


function data_to_course_map_parser(data: String){
  const courseList: course[] = [];
  const textByLine = data.split("\n");

  for(let i = 0; i < textByLine.length; i++){
    let [major,number,prereq_string,fall,spring,credits] = textByLine[i].split(',');
    let prereqs = prereq_string.split('&&')

    const input = new course(major,Number(number),prereqs, stringToBool(fall), stringToBool(spring),Number(credits));

    courseList.push(input)
  }
  return courseList
}

function stringToBool(s: string): boolean{
  return (s === "T");
}

const filePath = './CS_Classes.txt';

const data = readFileSync(filePath);
const classList = data ? data_to_course_map_parser(data): [];
const classMap = new Map<string,course>();
classList.forEach((course) => classMap.set(course.getMajor()+course.getNumber(),course));


classList.forEach((course)=>console.log(course.toString()))
