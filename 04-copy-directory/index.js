
function copyDir() {
    const path = require('path'),
          fs = require('fs');
    fs.mkdir(path.join(__dirname, 'files-copy'),
            {recursive: true}, (err) => {
                if (err) {
                    console.log(err);
                };
            });
    fs.readdir(path.join(__dirname, 'files-copy'),
        {withFileTypes: true},
        (err, files) => {
            if (err) {
                console.log(err);
            } else {
                files.forEach(file => {
                    fs.unlink(path.join(__dirname, 'files-copy', file.name), err => {
                        if (err) {console.log(err)};
                    })
                })
            }
        });
    fs.readdir(path.join(__dirname, 'files'), 
    {withFileTypes: true},
    (err, files) => {
        if (err) {
            console.log(err);
        } else {
            files.forEach((file) => {
                fs.copyFile(path.join(__dirname, 'files', file.name), path.join(__dirname, 'files-copy', file.name), err => {
                    if (err) {console.log(err)};
                })
            })
        }
    })
    
};
copyDir();