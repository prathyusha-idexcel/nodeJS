const EventEmitter = require('events');
const obj = new EventEmitter();
setImmediate(()=>{
    obj.emit('test');
})
obj.on('test', ()=>{
    console.log("Hi")
});
obj.on('test', ()=>{
    console.log("Hello")
});
