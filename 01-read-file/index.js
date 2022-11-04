let fs = require('fs');
let path = require('path');
let readStream = fs.createReadStream(path.join(__dirname, 'text.txt'),'utf-8');
let data = '';
readStream.on('data', chunk => data += chunk);
readStream.on('end', () => console.log(data));
readStream.on('error', error => console.log('error', error.message));
console.log(data);