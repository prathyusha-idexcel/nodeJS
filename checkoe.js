const http=require('http')
const server= http.createServer(function (req,res){
    res.writeHead(200, {'Content-Type':'text/html'});
    var n=4;
    if(n%2==0){
        console.log('Even');
    }
    else{
        console.log('Odd');
    }
}).listen(8000);
console.log("hii");