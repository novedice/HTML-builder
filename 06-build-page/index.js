const path = require('path'),
      fs = require('fs');
let indexHtml;
fs.mkdir(path.join(__dirname, 'project-dist'),
{recursive: true}, (err) => {
    if (err) {};
});
function copyDir(pathOrigin, pathCopy) {
    fs.mkdir((pathCopy),
    {recursive: true}, (err) => {
        if (err) {};
        }
    )
    fs.readdir(pathOrigin, 
    {withFileTypes: true},
    (err,files) => {
        if (err) {
            console.log(err);
        } else {
            files.forEach(file => {
                if (!file.isFile()) {
                    copyDir(path.join(pathOrigin, file.name), path.join(pathCopy, file.name));
                } else {                      
                        if (file.isFile) {
                        fs.copyFile(path.join(pathOrigin, file.name), path.join(pathCopy, file.name), err => {
                            if (err) {
                                console.log(err)
                                };
                            })
                        }
                    }
                })
            }
    })
    checkIfInOrigin(pathCopy, pathOrigin);
    function checkIfInOrigin(pathCopy, pathOrigin) {
        fs.readdir(pathCopy,
        {withFileTypes: true},
        (err, files) => {
            if(err) {
                console.log(err);
            } else {
                files.forEach(file => {
                    if(!file.isFile()) {
                        fs.access(path.join(pathOrigin, file.name), (err) => {
                            if (err) {
                                fs.rm(path.join(pathCopy, file.name),
                                {recursive: true}, (err) => {
                                if (err) {

                                }
                            })
                            } else {
                                checkIfInOrigin(path.join(pathCopy, file.name), path.join(pathOrigin, file.name));
                            }
                        })
                        
                    } else {
                        fs.access(path.join(pathOrigin, file.name), (err) => {
                            if (err) {
                        fs.unlink(path.join(pathCopy, file.name), err => {
                            if (err) {console.log(err)};
                        })
                        }
                        })
                    }
        })
    }
    })
}
}

copyDir(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'));

const fsAs = require('fs/promises');
// const { resolve } = require('path');

async function readingFile() {
    let fileContent = [];
    try {
    let files = await fsAs.readdir(path.join(__dirname, 'styles'),
    {withFileTypes: true}); 

    let files2 = files.filter(file => 
        ((file.isFile) && (path.extname(file.name) ==='.css'))
    );
    fileContent = await Promise.all(
        files2.map(
            (file2) => {
                return fsAs.readFile(path.join(__dirname, 'styles', file2.name), 'utf-8')
            }
        )
    );
    } catch (err) {
       console.log(err);
    }
return fileContent;
}
function writingStyles (arr) {
    let writing = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'))
    for (let i=0; i< arr.length; i++) {
        writing.write(arr[i],'utf-8');
    }
}
readingFile().then((fileContent2) => {writingStyles(fileContent2)});

fs.copyFile(path.join(__dirname, 'template.html'), path.join(__dirname, 'project-dist', 'index.html'), (err) => {
    if (err) {
        console.log(err);
    }
});

async function htmlToStr(filePath) {
    let data = '';
    if (path.extname(filePath) === '.html') {
        data = await ( fsAs.readFile(filePath, 'utf-8'));        
    }
    return data;
}

async function changeTags(indexFile, dataH, name) {
    let ind = indexFile.indexOf(name);
    indexFile = await (indexFile.slice(0,ind) + dataH + indexFile.slice(ind+name.length));
    return indexFile;
}

async function changeIndexFile(indexFile, filePath) {
    let files = await fsAs.readdir(filePath,
    {withFileTypes: true});
    try {
        for (let file of files) {
            let pathF = path.join(filePath, file.name)
            let ext = path.extname(pathF);
            if (file.isFile() && ext === '.html') {
                let name = `{{${path.basename(pathF, ext)}}}`;
                indexFile = await htmlToStr(pathF).then(async (data) => { return await changeTags(indexFile,data,name)
                });              
            }
        }
    } catch (err) {
        console.log(err)
    };
    return indexFile;
}
function writeIndexFile(fileIndex) {
    let writing = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
    writing.write(fileIndex, 'utf-8');
}
htmlToStr(path.join(__dirname, 'project-dist', 'index.html')).then((data) => {indexHtml= data}).then(() => changeIndexFile(indexHtml, path.join(__dirname, 'components'))).then((indexFile) => writeIndexFile(indexFile));
