const http= require('http')
const prompt= require('prompt-sync')({sigint:true});
const marks=prompt();
const server = http.createServer(function (req,res){
    res.writeHead(200, {'Content-Type':'text/html'});
    var passmark=35;
    if(passmark<=marks){
        if(marks>91)
        grade='A';
        else if(marks>75)
        grade='B';
        else if(marks>35)
        grade='C'
        console.log("You are Pass and Your Grade is:" +grade);
    }
    else{
        grade='F';
        console.log("You are Fail" +grade);
    }
}).listen(8000);
