const fs = require('fs');

let devEnvironment = __dirname + '\\.env';
if (fs.existsSync(devEnvironment)) {
    if (!fs.existsSync(__dirname + '\\build')) {
        fs.mkdirSync(__dirname + '\\build');
    }

    fs.copyFileSync(devEnvironment, __dirname + '\\build\\.env');
}
