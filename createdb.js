const express = require('express')
const mysql = require('mysql')

const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "password@123",
    database: "nodemysql"
})

db.connect((err)=>{
    if(err) throw err;
    console.log("Mysql is connected..!")
})

const app = express()

//Create DB
app.get('/createdb', (req,res)=>{
    let sql = "CREATE DATABASE nodemysql"
    db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result)
        res.send("Database is created...!")
    })
})

//Create Table
app.get('/createtable', ()=>{
    let sql = "CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(50), body VARCHAR(50), PRIMARY KEY(id)";
    db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result)
        res.send("Table is created...!")
    })
})

//Insert Post1
app.post('/post1', (req,res)=>{
    let post ={title:'Post1', body:'This is first post'};
    let sql = "INSERT INTO post SET ?"
    let query = db.query(sql, post,(err, result)=>{
        if(err) throw err;
        console.log(result)
        res.send("One post is added..!")
    })
})

//Select single post
app.get('/getpost/:id', (req,res)=>{
    let sql = `SELECT * FROM WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result)
        res.send('Get only one post..!')
    })
})

app.listen(8000, ()=>{
    console.log("Server is running at 8000 port..!")
})