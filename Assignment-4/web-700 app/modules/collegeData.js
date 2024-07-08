const fs = require('fs');
const path = require("path");

class Data {
  constructor(students, courses) {
    this.students = students;
    this.courses = courses;
  }
}

let dataCollection = null;

function initialize() {
  return new Promise((resolve, reject) => {
    const coursePath = path.resolve(__dirname, '../data', 'courses.json');
        const studentPath = path.resolve(__dirname, '../data', 'students.json');

    fs.readFile(studentPath, 'utf8', (err, studentData) => {
      if (err) {
        reject("unable to read students.json");
        return;
      }
      fs.readFile(coursePath, 'utf8', (err, courseData) => {
        if (err) {
          reject("unable to read courses.json");
          return;
        }
        dataCollection = new Data(JSON.parse(studentData), JSON.parse(courseData));
        resolve();
      });
    });
  });
}

function getAllStudents() {
  return new Promise((resolve, reject) => {
    if (dataCollection.students.length > 0) {
      resolve(dataCollection.students);
    } else {
      reject("no results returned");
    }
  });
}

function getTAs() {
  return new Promise((resolve, reject) => {
    const TAs = dataCollection.students.filter(student => student.TA);
    if (TAs.length > 0) {
      resolve(TAs);
    } else {
      reject("no results returned");
    }
  });
}

function getCourses() {
  return new Promise((resolve, reject) => {
    if (dataCollection.courses.length > 0) {
      resolve(dataCollection.courses);
    } else {
      reject("no results returned");
    }
  });
}

function getStudentsByCourse(course) {
  return new Promise((resolve, reject) => {
    const filteredStudents = dataCollection.students.filter(student => student.course == course);
    if (filteredStudents.length > 0) {
      resolve(filteredStudents);
    } else {
      reject("no results returned");
    }
  });
}

// collegeData.js

function getStudentByNum(num) {
  return new Promise((resolve, reject) => {
    const student = dataCollection.students.find(student => student.studentNum == num);
    if (student) {
      resolve(student);
    } else {
      reject("no results returned");
    }
  });
}



function addStudent(studentData) {
    return new Promise((resolve, reject) => {
        studentData.TA = studentData.TA ? true : false;
        studentData.studentNum = dataCollection.students.length + 1;
        dataCollection.students.push(studentData);
        
        // Write to the students.json file
        //fs.writeFile('V:\Second Semester\WEB700\Web700\Assignment-4\web-700 app\data\students.json', JSON.stringify(dataCollection.students, null, 4), (err) => {
        //    if (err) {
          //      reject(err);
            //} else {
                resolve();
            //}
        //});
    });
};


module.exports = { initialize, getAllStudents, getTAs, getCourses, getStudentsByCourse, addStudent, getStudentByNum };
