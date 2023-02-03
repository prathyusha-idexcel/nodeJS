const http = require('http');
const server = http.createServer((req,res) =>{
    res.write('<html>');
    res.write('<title>Create Web Page</title>');
    res.write('</head>');
    res.write('<body style="background-color:blueviolet">');
    res.write('<span><marquee><mark><b>Idexcel</b></mark></marquee></span>');
    res.write('<ul>');
    res.write('<li>Office Timings: 9:30 AM</li>');
    res.write('<li>Closing Timings: 6:30 PM</li>');
    res.write('</body>');
    res.write('</html>');
    res.end('Finish');
});

server.listen(8080);
console.log("hi");