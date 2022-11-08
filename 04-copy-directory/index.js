
function copyDir() {
    const path = require('path'),
          fs = require('fs');

    fs.access(path.join(__dirname,'files-copy'), (err) => {
        if (err) {} else {
            fs.readdir(path.join(__dirname, 'files-copy'),
        {withFileTypes: true},
        (err, files) => {
            if (err) {
                throw err;
            } else {
                files.forEach(file => {
                    fs.access(path.join(__dirname,'files', file.name), (err) => {
                        if (err) {
                    fs.unlink(path.join(__dirname, 'files-copy', file.name), err => {
                        if (err) {console.log(err)};
                    })
                }
                }
                    )
                })
            }
        });
           
        }
    })
   
    fs.mkdir(path.join(__dirname, 'files-copy'),
            {recursive: true}, (err) => {
                if (err) {
                    // console.log(err);
                };
            });
    
    fs.readdir(path.join(__dirname, 'files'), 
    {withFileTypes: true},
    (err, files) => {
        if (err) {
            // console.log(err);
        } else {
            files.forEach((file) => {
                fs.copyFile(path.join(__dirname, 'files', file.name), path.join(__dirname, 'files-copy', file.name), err => {
                    if (err) {
                        // console.log(err)
                    };
                })
            })
        }
    })
    
};
copyDir();