const express = require("express")
const cors = require("cors")
const mysql = require("mysql")
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const app = express();
app.use(cors({
    origin: ["http://localhost:3000"],
    method: ['POST', 'GET'],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    } //set the session cookie properties
}))

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
})
app.post('/signup', (req, res) => {
    const sql = 'INSERT INTO users(`username`,`email`,`password`) values(?,?,?)'
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
       // const { name, email, password } = req.body;
    db.query(sql, values, (err, data) => {
        if (err) return res.json('error')
        return res.json(data)

    })

})

app.post('/login', (req, res) => {
    const sql = 'SELECT * FROM users WHERE email=? and password=?'
    const values = [
        req.body.email,
        req.body.password
    ]
    db.query(sql, values, (err, data) => {
        if (err) return res.json("Error")

        if (data.length > 0) {
            req.session.username = data[0].username
            //console.log(req.session.username)
            return res.json({ Login: true })
        } else {
            return res.json({ Login: false })
        }
    })
})

app.get('/', (req, res) => {
    if (req.session.username) {
        return res.json({ valid: true, username: req.session.username })
    } else {
        return res.json({ valid: false })
    }
})



app.listen(8082, () => {
    console.log("Connected to the server")
})