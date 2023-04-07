//Create Connection...!
// var mysql = require('mysql')
// var con = mysql.createConnection({
//     host:"localhost",
//     user: "root",
//     password: "password@123"
// })
// con.connect(function(err){
//     if(err) throw err;
//     console.log("Database is connected...!")
// })

//Create Database...!
// var mysql = require('mysql')
// var con = mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password: "password@123"
// })

// con.connect(function(err){
//     if(err) throw err;
//     console.log("Database is connected...!")
//     con.query("CREATE DATABASE mysqlall", function(err, result){
//         if(err) throw err;
//         console.log("Database is created..!")
//     })
// })

//Create Table..!
var mysql = require('mysql')
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password@123",
    database: "mysqlall"
})
con.connect(function(err){
    if(err) throw err;
    console.log("Database is connected...!")
    var sql = "CREATE TABLE users (name VARCHAR(50), country VARCHAR(50), number    INT(15))";
    con.query(sql, function(err, result){
        if(err) throw err;
        console.log("Table is created...!")
    })
})

//Create Table having a Primary Key...!
// var mysql = require('mysql')
// var con = mysql.createConnection({
//     host:"localhost",
//     user: "root",
//     password: "password@123",
//     database:"mysqlall"
// })
// con.connect(function(err){
//     if(err) throw err;
//     console.log("Database is connected...!")
//     var sql = "CREATE TABLE employee2 (id INT PRIMARY KEY, name VARCHAR(50), age INT(3), city VARCHAR(50))";
//     con.query(sql, function(err, result){
//         if(err) throw err;
//         console.log("Table is created..!")
//     })
// })

//Add columns in existing table..!
// var mysql = require('mysql')
// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "password@123",
//     database: "mysqlall"
// })

// con.connect(function(err){
//     if(err) throw err;
//     console.log("Databse is connected..!")
//     var sql = 'ALTER TABLE employee2 ADD COLUMN salary INT(10)';
//     con.query(sql, function(err,result){
//         if(err) throw err;
//         console.log("Table is altered..!")
//     })
// })

 //Insert Single Record...
//  var mysql = require('mysql')
//  var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "password@123",
//     database:"mysqlall"
//  })
//  con.connect(function(err){
//     if(err) throw err;
//     console.log("Database is connected..!")
//     var sql = "INSERT INTO employees (id,name,age,city)VALUES('1', 'JimJack', '20','Bangalore')";
//     con.query(sql, function(err, result){
//         if(err) throw err;
//         console.log('One Record is inserted...!')
//     })
//  })

//Insert Many Records ...!
// var mysql = require('mysql')
// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "password@123",
//     database: "mysqlall"
// })
// con.connect(function(err){
//     if(err) throw err;
//     console.log('Database is connected..!')
//     var sql = 'INSERT INTO employees (id,name,age,city) VALUES?';
//     var values=[
//         ['2','Johnson','21','Karnataka'],
//         ['3','Jay','22','Andhra'],
//         ['4','Jain','23','Hyderabad']
//     ];
//     con.query(sql,[values],function(err,result){
//         if(err) throw err;
//         console.log("Multiple Records are inserted..!")
//     })
// })

// var mysql = require('mysql')
// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "password@123",
//     database: "mysqlall"
// })

// con.connect(function(err){
//     if(err) throw err;
//     console.log("Database is connected...!")
//     var sql = "CREATE TABLE users(name VARCHAR(50), country VARCHAR(30), number INT(15)";
//     con.query(sql, (err, result)=>{
//         if(err) throw err;
//         console.log("Table is created..!")
//     })
// })

