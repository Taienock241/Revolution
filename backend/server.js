const express = require('express')
const cors = require("cors")
const mysql = require("mysql")

const app = express()
app.use(express.json())

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ["POST", 'DELETE', 'PUT', 'GET', 'HEAD', 'PATCH']
}));

const db = mysql.createConnection({   //create a connection to mysqlzx6 /
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"
})

db.connect((err) => {
    if (err) {
        console.error("[CRUD DB] Connection failed:", err.message)
        return
    }
    console.log("[CRUD DB] Connected")
})

const sendDbError = (res, err, message = "Database error") => {
    console.error(message, err)
    return res.status(500).json({ success: false, message })
}

app.get("/", (req, res) => {
    const sql = "SELECT * FROM student"
    db.query(sql, (err, data) => {
        if (err) return sendDbError(res, err, "Failed to fetch students")
        return res.status(200).json({ success: true, data: Array.isArray(data) ? data : [] })
    })
})

app.post('/create', (req, res) => {
    const { first, last, course, reg, idno, email, date } = req.body || {}
    if (!first || !last || !course || !reg || !idno || !email || !date) {
        return res.status(400).json({ success: false, message: "All fields are required" })
    }

    const sql = "INSERT INTO student(`First` , `Last`,`Course`, `Reg` ,`IDNo`, `Email`,`Date` ) VALUES(?,?,?,?,?,?,?)"
    const values = [
        first,
        last,
        course,
        reg,
        idno,
        email,
        date
    ]
    db.query(sql, values, (err, data) => {
        if (err) return sendDbError(res, err, "Failed to create student")
        return res.status(201).json({ success: true, message: "Student created", data })
    })
})
app.put('/update/:id', (req, res) => {
    const { first, last, course, reg, idno, email, date } = req.body || {}
    if (!first || !last || !course || !reg || !idno || !email || !date) {
        return res.status(400).json({ success: false, message: "All fields are required" })
    }

    const sql = "update student SET `First` = ?, `Last` = ? ,`Course` = ? ,`Reg` = ?, `IDNo` = ? ,`Email` = ?, `Date`=? where ID = ? "
    const values = [
        first,
        last,
        course,
        reg,
        idno,
        email,
        date
    ]
    const id = req.params.id

    if (!id) {
        return res.status(400).json({ success: false, message: "Student id is required" })
    }

    db.query(sql, [...values, id], (err, data) => {
        if (err) return sendDbError(res, err, "Failed to update student")
        if (data.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Student not found" })
        }
        return res.status(200).json({ success: true, message: "Student updated", data })
    })
})

app.delete('/student/:id', (req, res) => {
    const sql = " DELETE FROM student WHERE ID = ? "
    const id = req.params.id

    if (!id) {
        return res.status(400).json({ success: false, message: "Student id is required" })
    }

    db.query(sql, [id], (err, data) => {
        if (err) return sendDbError(res, err, "Failed to delete student")
        if (data.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Student not found" })
        }
        return res.status(200).json({ success: true, message: "Student deleted", data })
    })

})
app.use((req, res) => {
    return res.status(404).json({ success: false, message: "Route not found" })
})

app.listen(8081, () => {
    console.log('CRUD API listening on port 8081');
})