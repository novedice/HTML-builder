
const path = require('path'),
      fs = require('fs/promises'),
      fsSimple = require('fs');

async function readingFile() {
    let fileContent = [];
    try {
    let files = await fs.readdir(path.join(__dirname, 'styles'),
    {withFileTypes: true}); 

    let files2 = files.filter(file => 
        ((file.isFile) && (path.extname(file.name) ==='.css'))
    );
    fileContent = await Promise.all(
        files2.map(
            (file2) => {
                return fs.readFile(path.join(__dirname, 'styles', file2.name), 'utf-8')
            }
        )
    );
} catch (err) {
    console.log(err);
}
return fileContent;
}
function writingStyles (arr) {
    let writing = fsSimple.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'))
    for (let i=0; i< arr.length; i++) {
        writing.write(arr[i],'utf-8');
    }
}
readingFile().then((fileContent2) => {writingStyles(fileContent2)});


