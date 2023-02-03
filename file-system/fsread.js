const http= require('http');
const fs=require('fs');
const server=http.createServer(function (req,res){
    fs.readFile('./hello.html', function(err, data){
        if(!err){
            res.write(data);
            res.end();
        }
        else{
            console.log('error');
        }
    });
}).listen(8000);
console.log('I think it will be executed');