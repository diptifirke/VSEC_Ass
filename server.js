const express = require("express");

const app = express();

app.use(express.json());

let students = [
    { id: 1, name: "Maya", marks: 94 },
    { id: 2, name: "Rahul", marks: 88 },
    { id: 3, name: "Priya", marks: 96 }
];

app.get("/students", (req, res) => {
    res.json(students);
});

app.post("/students", (req, res) => {

    const student = req.body;

    students.push(student);

    res.send("Student added successfully");

});

app.put("/students/:id", (req, res) => {

    const id = Number(req.params.id);

    const student = students.find(s => s.id === id);

    if (student) {

        student.name = req.body.name;
        student.marks = req.body.marks;

        res.send("Student updated successfully");

    } else {

        res.send("Student not found");

    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});