const fs = require('fs');

const allowed = ['node_modules'];

module.exports = function (dir) {
    const files = fs.readdirSync(dir);

    if (!files.length) {
        return true;
    }

    return files.every(file => file.startsWith('.') || allowed.includes(file));
};