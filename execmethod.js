const {exec} = require('child_process');

exec ('hello.html', (error, stdout,stderr)=>{
  if(error)
  {
    console.log(`error: ${error.message}`);
    return;
  }
  if(stderr){
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});