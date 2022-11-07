let path = require('path');
let fs = require('fs');
fs.readdir(path.join(__dirname, 'secret-folder'),
           {withFileTypes: true},
           (err, files) => {
            if (err) {
                console.log(err);
            } else {
                files.forEach(file => {
                    if (file.isFile()) {
                        let s = '',
                            filePath = path.join(__dirname, 'secret-folder', file.name),
                            ext = path.extname(filePath),
                            fileName = path.basename(filePath, ext);
                        s += fileName + ' - ' + ext.replace(/./,'');
                        fs.stat(path.join(__dirname, 'secret-folder', file.name), (error, stats) => {
                            if (error) {
                              console.log(error);
                            } else {
                                let size = stats.size;
                                s += ' - ' + `${size/1000}` + 'kb';
                                console.log(s);
                            };
                        });
                    };
                });
            };
           });