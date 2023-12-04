import * as fs from "fs";
import { Course, Node, Graph } from "./course";

function readFileSync(filePath: string): string {
  try {
      return fs.readFileSync(filePath, 'utf8');
  } catch (err) {
      console.error("Error reading file:", err);
      return "";
  }
}


function data_to_course_map_parser(data: String){
  const courseList: Course[] = [];
  const textByLine = data.split("\n");

  for(let i = 0; i < textByLine.length; i++){
    let [major,number,prereq_string,fall,spring,credits] = textByLine[i].split(',');
    let prereqs = prereq_string.split('&&')
    const input = new Course(major,Number(number),prereqs, stringToBool(fall), stringToBool(spring),Number(credits));

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
const classMap = new Map<string,Course>();
let nodeMap = new Map<string,Node<Course>>();
classList.forEach((Course) => nodeMap.set(Course.getMajor()+Course.getNumber(),new Node(Course,[])));
const classStringList: string[] = [];
classList.forEach((Course) => classStringList.push(Course.getMajor()+Course.getNumber()))
//classList.forEach((Course) => classMap.set(Course.getMajor()+Course.getNumber(),Course));


const a = new Graph<Node<Course>>(nodeMap,classStringList)
const b = a.getNodeMap();
const c = a.topoSort();
//console.log(b.get("CS240"));
console.log(c);


