const fs = require('fs');

class Data {
  constructor(students, courses) {
    this.students = students;
    this.courses = courses;
  }
}

let dataCollection = null;

function initialize() {
  return new Promise((resolve, reject) => {
    fs.readFile('./data/students.json', 'utf8', (err, studentData) => {
      if (err) {
        reject("unable to read students.json");
        return;
      }
      fs.readFile('./data/courses.json', 'utf8', (err, courseData) => {
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

module.exports = { initialize, getAllStudents, getTAs, getCourses };
