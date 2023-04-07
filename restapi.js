const express = require('express')
const mysql = require('mysql')
const app = express()
app.use(express.json())

const con= mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password@123",
    database: "nodemysql"
})
// con.connect(function(err){
//         if(err) throw err;
//         console.log("Database is connected...!")
//         var sql = "CREATE TABLE Student (name VARCHAR(50), age INT(3),location VARCHAR(50))";
//         // var sql = "Student (name VARCHAR(50), age INT(3),location VARCHAR(50))"
//         con.query(sql, function(err, result){
//             if(err) throw err;
//             console.log("Table is created...!")
//         })
//     })

con.connect((err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("Data Base is Connected...!")
    }
})

// app.get('/createdb', (req,res)=>{
//     let sql= "CREATE DATABASE nodemysql"
//     con.query(sql, (err,result)=>{
//         if(err) throw err;
//         console.log(result)
//         res.send("Created Mysql Database...!")
//     })
// })

app.post('/post', (req,res)=>{
    const name = req.body.name;
    const age = req.body.age;
    const location = req.body.location;

    con.query('insert into Student values(?,?,?)', [name,age,location],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log(result)
            res.json("Post is added..!")
        }
    })
})

app.listen(8000, ()=>{
    console.log("Server is running on 8000 port...!")
})