const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Database Connection
const db = mysql.createConnection({
    host: "localhost", // Use your DB host
    user: "root",      // Use your DB username
    password: "smit666", // Use your DB password
    database: "login_db"  // Use your DB name
});

db.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL database");
});

// Login Endpoint
app.post("/submit-login", (req, res) => {
    const { username, password } = req.body;
    const query = "SELECT * FROM users WHERE username = ? AND password = ?";
    
    db.query(query, [username, password], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({ message: "Login successful!" });
        } else {
            res.status(401).send({ message: "Invalid credentials" });
        }
    });
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});