const chalk = require('chalk')
const yargs = require('yargs')


yargs.version('1.0.0')
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    handler: function(){
        console.log("Adding a new note")
    }
})
yargs.command({
    command: 'remove',
    describe: 'Removing a note',
    handler: function(){
        console.log("Removeing a note")
    }

})
console.log(yargs.argv)