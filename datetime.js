const http = require('http')
const server = http.createServer(function(req,res){
    res.writeHead(200, {'Content-Type':'text/html'})
    let time = new Date()
    res.write(time.toString());
}).listen(8000);
console.log(__dirname);
console.log(__filename);