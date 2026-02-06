const express = require('express')
const cors = require("cors")
const mysql = require("mysql")

const app = express()
app.use(express.json())

app.use(cors({
    origin:['http://localhost:3000'],
    credentials:true,
    methods:["POST",'DELETE','PUT','GET','HEAD','PATCH']
}));

const db = mysql.createConnection({   //create a connection to mysqlzx6 /
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"
})

app.get("/", (req, res) => {
    // res.json("Hello from Backend")
    const sql = "SELECT * FROM student"
    db.query(sql, (err, data) => {
        if (err) return res.json("Error")
        return res.json(data)
    })
})

app.post('/create', (req, res) => {
    const sql = "INSERT INTO student(`First` , `Last`,`Course`, `Reg` ,`IDNo`, `Email`,`Date` ) VALUES(?,?,?,?,?,?,?)"
    const values = [
        req.body.first,
        req.body.last,
        req.body.course,
        req.body.reg,
        req.body.idno,
        req.body.email,
        req.body.date
    ]
    db.query(sql, values, (err, data) => {
        if (err) return res.json("Error");
        return res.json(data)
    })
})
app.put('/update/:id', (req, res) => {
    const sql = "update student SET `First` = ?, `Last` = ? ,`Course` = ? ,`Reg` = ?, `IDNo` = ? ,`Email` = ?, `Date`=? where ID = ? "
    const values = [
        req.body.first,
        req.body.last,
        req.body.course,
        req.body.reg,
        req.body.idno,
        req.body.email,
        req.body.date
    ]
    const id = req.params.id

    db.query(sql, [...values, id], (err, data) => {
        if (err) return res.json("Error");
        return res.json(data)
    })
})

app.delete('/student/:id', (req, res) => {
    const sql = " DELETE FROM student WHERE ID = ? "
    const id = req.params.id

    db.query(sql, [id], (err, data) => {
        if (err) return res.json("Error");
        return res.json(data)
    })
})
app.listen(8081, () => {
    console.log('listening');
})