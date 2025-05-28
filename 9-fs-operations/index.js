const fs = require('fs');

fs.readFile('./package.json', (err, data) => {
  if (err) {
    console.error(err);
  }
  if (data) {
    console.log(data.toString());
  }
});

//console.log(fs.readFileSync('./package.json').toString());
