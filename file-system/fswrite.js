const fs = require('fs'); 
const data = "Hello Every one This is the new content of the file."; 
fs.writeFile('project.html', data, (err) => { 
if(err) { 
throw err; 
console.log("Data has been written to file successfully."); 
}
});
console.log("This is also printed or not");