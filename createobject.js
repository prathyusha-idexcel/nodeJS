var http = require('http');
const server = http.createServer(function (req,res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    let person = {
        first_name:'Mukul',
        last_name: 'Latiyan',

        getFunction : function(){
            return (`The name of the person is 
              ${person.first_name} ${person.last_name}`)
        },

        phone_number : {
            mobile:'12345',
            landline:'6789'
        }
    }
    console.log(person.getFunction()); 
    console.log(person.phone_number.landline);
}).listen(8080);