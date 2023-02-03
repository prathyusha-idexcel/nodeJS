var http =  require('http');
http.createServer(function (req,res){
    const array = [1, 2, 3, 4, 5];
    for (let i = 0; i < array.length; i++) {
        console.log(array[i]);
    }
}).listen(8000)
console.log('Array program is running...!')
