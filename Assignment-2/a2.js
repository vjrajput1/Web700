/*********************************************************************************
* WEB700 – Assignment 2
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Vaibhav Jaysinh Rajput   Student ID: 144444239   Date: 26/05/2024
*
********************************************************************************/

const collegeData = require('./modules/collegeData.js'); // Corrected path

collegeData.initialize()
    .then(() => {
        

        collegeData.getAllStudents()
            .then(students => {
                console.log(`Successfully retrieved ${students.length} students`);
            })
            .catch(err => {
                console.log(err);
            });

        collegeData.getCourses()
            .then(courses => {
                console.log(`Successfully retrieved ${courses.length} courses`);
            })
            .catch(err => {
                console.log(err);
            });

        collegeData.getTAs()
            .then(TAs => {
                console.log(`Successfully retrieved ${TAs.length} TAs`);
            })
            .catch(err => {
                console.log(err);
            });
    })
    .catch(err => {
        console.log(err);
    });
