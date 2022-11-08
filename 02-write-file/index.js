const fs = require('fs');
const path = require('path');
const output = fs.createWriteStream(path.join(__dirname, 'text.txt'));
const {stdin, stdout} = process;

stdout.write('Please enter the text: ');
stdin.on('data', data => {
    if (data.toString().trim() === 'exit') {
      process.exit();
    };
  let enteredText = '';
  enteredText = data.toString();
  output.write(enteredText);
process.on('SIGINT', () => {
    process.exit();
});

});
process.on('exit', exit => console.log('\nBye, good luck!'));
