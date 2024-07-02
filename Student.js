let express = require('express');
let app = express();
// Port number
let port = process.env.PORT || 3000;
let router = express.Router();
let cors = require('cors');
// Insert data
let bodyParser = require("body-parser");

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Use router for API routes
app.use("/api/student", router);

app.listen(port,()=>{
    console.log(`Node.js application running on port : ${port}`);
});

// Array of JSON objects
let students = [
    {
        StudentId: 1,
        FirstName: "Dulakshi",
        LastName: "Manamperi",
        email: "dulakshi@gmail.com",
        city: "Panadura",
        guardian: 'LMRS.Weerasinghe',
        course: 'IT',
        subject: "ETF",
    },
    {
        StudentId: 2,
        FirstName: "K",
        LastName: "Nuha",
        email: "nuha@gmail.com",
        city: "Dehiwala",
        guardian: 'HKM',
        course: 'HND',
        subject: "SE",
    }
];

// Get all students
router.get("/", (req, res) => {
    res.json(students);
});

// Get student based on id
router.get('/:Id', (req, res) => {
    let id = req.params.Id;
    let currentStudent = students.filter((x) => x.StudentId == id)[0];

    if (currentStudent) {
        res.json(currentStudent);
    } else {
        res.sendStatus(404);
    }
});

// Validate student function
ValidateStudent = (student) => {
    let message = "";

    if (!student.StudentId) {
        message = "Student id not found";
    }
    
    if (!student.FirstName) {
        message = "Student FirstName not found";
    }

    if (!student.LastName) {
        message = "Student LastName not found";
    }

    return message;
}

// Create student
router.post("/", (req, res) => {
    let student = req.body;
    let isValid = ValidateStudent(student);

    if (isValid == "") {
        students.push(student);
        console.log(students);
        
        res.status(201).send(students);
    } else {
        res.statusMessage = isValid;
        res.sendStatus(404);
    }
});

// Update student
router.put("/:Id", (req, res) => {
    let StudentId = req.params.Id;
    let student = req.body;
    let currentStudent = students.filter((x) => x.StudentId == StudentId)[0];

    if (currentStudent) {
        let isValid = ValidateStudent(student);
        if (isValid == "") {
            currentStudent.FirstName = student.FirstName;
            currentStudent.LastName = student.LastName;
            currentStudent.email = student.email;
            currentStudent.city = student.city;
            currentStudent.guardian = student.guardian;
            currentStudent.course = student.course;
            currentStudent.subject = student.subject;

            res.status(200).send(students);
        } else {
            res.statusMessage = isValid;
            res.sendStatus(404);
        }
    } else {
        res.statusMessage = "Student does not exist";
        res.sendStatus(404);
    }
});

// Delete student by id
router.delete("/:Id", (req, res) => {
    let StudentId = req.params.Id;
    let currentStudent = students.filter((x) => x.StudentId == StudentId)[0];
    if (currentStudent) {
        students = students.filter((x) => x.StudentId != StudentId);
        res.statusMessage = "Student deleted successfully.";
        res.sendStatus(200);
    } else {
        res.statusMessage = "Student does not exist";
        res.sendStatus(404);
    }
});

// Get student based on first name
router.get('/firstnames/:name', (req, res) => {
    let name = req.params.name;
    let currentStudent = students.filter((x) => x.FirstName == name);

    if (currentStudent) {
        res.json(currentStudent);
    } else {
        res.sendStatus(404);
    }
});

// Get student based on last name
router.get('/lastnames/:name', (req, res) => {
    let name = req.params.name;
    let currentStudent = students.filter((x) => x.LastName == name);

    if (currentStudent) {
        res.json(currentStudent);
    } else {
        res.sendStatus(404);
    }
});

// Get student based on email
router.get('/emails/:email', (req, res) => {
    let email = req.params.email;
    let currentStudent = students.filter((x) => x.email == email);

    if (currentStudent) {
        res.json(currentStudent);
    } else {
        res.sendStatus(404);
    }
});

// Get student based on course
router.get('/courses/:course', (req, res) => {
    let course = req.params.course;
    let currentStudent = students.filter((x) => x.course == course);

    if (currentStudent) {
        res.json(currentStudent);
    } else {
        res.sendStatus(404);
    }
});

// Get student based on guardian
router.get('/guardians/:guardian', (req, res) => {
    let guardian = req.params.guardian;
    let currentStudent = students.filter((x) => x.guardian == guardian);

    if (currentStudent) {
        res.json(currentStudent);
    } else {
        res.sendStatus(404);
    }
});

// Get student based on subject
router.get('/subjects/:subject', (req, res) => {
    let subject = req.params.subject;
    let currentStudent = students.filter((x) => x.subject == subject);

    if (currentStudent) {
        res.json(currentStudent);
    } else {
        res.sendStatus(404);
    }
});

// Get student based on city
router.get('/cities/:city', (req, res) => {
    let city = req.params.city;
    let currentStudent = students.filter((x) => x.city == city);

    if (currentStudent) {
        res.json(currentStudent);
    } else {
        res.sendStatus(404);
    }
});