const fs = require('fs');
const path = require('path');
const output = fs.createWriteStream(path.join(__dirname, 'text.txt'));
const {stdin, stdout} = process;
// const EventEmitter = require('events');
// let emitter = new EventEmitter();
// emitter.on('exit', () => process.exit());
stdout.write('Please enter the text: ');
stdin.on('data', data => {
    if (data.toString().trim() === 'exit') {
      process.exit();
    };
  let enteredText = '';
  enteredText = data.toString();
  output.write(enteredText);
});
process.on('exit', exit => stdout.write('Bye, good luck!'));
