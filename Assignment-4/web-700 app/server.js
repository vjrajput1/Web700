/********************************************************************************* 
 *  WEB700 – Assignment 03 
 *  I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part 
 *  of this assignment has been copied manually or electronically from any other source 
 *  (including 3rd party web sites) or distributed to other students. 
 *  
 *  Name: Vaibhav Jaysinh Rajput 
 *  Student ID: 144444239 
 *  Date: 23/06/2024 
 ********************************************************************************/

var HTTP_PORT = process.env.PORT || 3000;
var express = require("express");
var app = express();
const bodyParser = require('body-parser');
var path = require("path");
var collegeData = require("V:\Second Semester\WEB700\Web700\Assignment-4\web-700 app\modules\collegeData.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET route for /students/add
app.get('/students/add', (req, res) => {
    res.sendFile(path.join(__dirname, 'V:\Second Semester\WEB700\Web700\Assignment-4\web-700 app\views\addstudents.html'));
});

// POST route for /students/add
app.post('/students/add', (req, res) => {
    collegeData.addStudent(req.body).then(() => {
        res.redirect('/students');
    }).catch(err => {
        res.send(err);
    });
});


app.get("V:\Second Semester\WEB700\Web700\Assignment-3\web-700 app\views\home.html", (req, res) => {
    res.sendFile(path.join(__dirname, "V:\Second Semester\WEB700\Web700\Assignment-3\web-700 app\views\home.html"));
});

app.get("V:\Second Semester\WEB700\Web700\Assignment-3\web-700 app\views\about.html", (req, res) => {
    res.sendFile(path.join(__dirname, "V:\Second Semester\WEB700\Web700\Assignment-3\web-700 app\views\about.html"));
});

app.get("V:\Second Semester\WEB700\Web700\Assignment-3\web-700 app\views\htmlDemo.html", (req, res) => {
    res.sendFile(path.join(__dirname, "V:\Second Semester\WEB700\Web700\Assignment-3\web-700 app\views\htmlDemo.html"));
});

app.get("/students", (req, res) => {
    if (req.query.course) {
        collegeData.getStudentsByCourse(req.query.course)
            .then(data => res.json(data))
            .catch(err => res.json({ message: "no results" }));
    } else {
        collegeData.getAllStudents()
            .then(data => res.json(data))
            .catch(err => res.json({ message: "no results" }));
    }
});

app.get("/tas", (req, res) => {
    collegeData.getTAs()
        .then(data => res.json(data))
        .catch(err => res.json({ message: "no results" }));
});

app.get("/courses", (req, res) => {
    collegeData.getCourses()
        .then(data => res.json(data))
        .catch(err => res.json({ message: "no results" }));
});

app.get("/student/:num", (req, res) => {
    collegeData.getStudentByNum(req.params.num)
        .then(data => res.json(data))
        .catch(err => res.json({ message: "no results" }));
});

app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

collegeData.initialize()
    .then(() => {
        app.listen(HTTP_PORT, () => {
            console.log("server listening on port: " + HTTP_PORT);
        });
    })
    .catch(err => {
        console.log("unable to start server: " + err);
    });

   