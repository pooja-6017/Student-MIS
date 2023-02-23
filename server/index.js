const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");            //for connecting to database

// establish connection
const db = mysql.createPool ({
    host: "localhost",
    user: "root",
    password: "root",
    database: "mydb",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

//sending data from table to browser 
app.get("/api/get", (req, res)=> {
    const sqlGet = "SELECT * FROM table1";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    });
});

app.post("/api/post", (req, res) => {
    const {name, email, contact} = req.body; 
    const sqlInsert = "INSERT INTO table1 (name, email, contact) VALUES (?, ?, ?)";
    db.query(sqlInsert, [name, email, contact], (error, result) => {
        if(error){
            console.log(error);
        }
    });
});

app.delete("/api/remove/:id", (req, res) => {
    const {id} = req.params; 
    const sqlRemove = "DELETE FROM table1 where id = ?";
    db.query(sqlRemove, id, (error, result) => {
        if(error){
            console.log(error);
        }
    });
});

app.get("/api/get/:id", (req, res) => {
    const {id} = req.params;
    const sqlGet = "SELECT * FROM table1 where id = ?";
    db.query(sqlGet, id, (error, result) => {
        if(error) {
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/api/udpate/:id", (req, res) => {
    const {id} = req.params;
    const {name, email, contact} = req.body;
    const sqlUpdate = "UPDATE table1 SET name = ?, email = ?, contact = ? WHERE id = ?";
    db.query(sqlUpdate, [name, email, contact,id], (error, result) => {
        if(error) {
            console.log(error);
        }
        res.send(result);
    });
});


//verify the connection
app.get('/', (req, res) =>{

    res.send("University Data");

    // const sqlInsert=
    // "INSERT INTO table1 VALUES (5, 'pavan', 'pavan@123', 4895784)";
    // db.query(sqlInsert, (error, result) => {
    //     console.log("error", error);
    //     console.log("result", result);
    //     res.send("Hello Express");
    // });
});

app.listen(5000, () =>{
    console.log("Server running on port 5000")
})