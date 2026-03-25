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

db.connect((err) => {
    if (err) {
        console.error("[AUTH DB] Connection failed:", err.message)
        return
    }
    console.log("[AUTH DB] Connected")
})

const sendDbError = (res, err, message = "Database error") => {
    console.error(message, err)
    return res.status(500).json({ success: false, message })
}

app.post('/signup', (req, res) => {
    const { name, email, password } = req.body || {}
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "name, email and password are required" })
    }

    const sql = 'INSERT INTO users(`username`,`email`,`password`) values(?,?,?)'
    const values = [
        name,
        email,
        password
    ]
    db.query(sql, values, (err, data) => {
        if (err) return sendDbError(res, err, "Failed to sign up user")
        return res.status(201).json({ success: true, message: "Signup successful", data })

    })

})

app.post('/login', (req, res) => {
    try {
        if (!req.body || typeof req.body !== 'object') {
            console.error('[LOGIN] Invalid request body:', req.body)
            return res.status(400).json({ success: false, Login: false, message: 'Request body is required' })
        }

        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ success: false, Login: false, message: 'email and password are required' })
        }

        const sql = 'SELECT * FROM users WHERE email=?'
        db.query(sql, [email], (err, data) => {
            if (err) return sendDbError(res, err, 'Login query failed')

            if (!Array.isArray(data)) {
                console.error('[LOGIN] Unexpected DB response shape:', data)
                return res.status(500).json({ success: false, Login: false, message: 'Unexpected database response' })
            }

            if (data.length === 0) {
                return res.status(404).json({ success: false, Login: false, message: 'User not found' })
            }

            const user = data[0]
            if (!user || typeof user !== 'object') {
                console.error('[LOGIN] Invalid user record:', user)
                return res.status(500).json({ success: false, Login: false, message: 'Invalid user record' })
            }

            if (user.password !== password) {
                return res.status(401).json({ success: false, Login: false, message: 'Invalid credentials' })
            }

            req.session.username = user.username
            return res.status(200).json({ success: true, Login: true, username: user.username })
        })
    } catch (error) {
        console.error('[LOGIN] Unhandled error:', error)
        return res.status(500).json({ success: false, Login: false, message: 'Internal server error' })
    }
})

app.get('/', (req, res) => {
    if (req.session.username) {
        return res.status(200).json({ success: true, valid: true, username: req.session.username })
    } else {
        return res.status(200).json({ success: true, valid: false })
    }
})



app.listen(8082, () => {
    console.log("Auth API listening on port 8082")
})