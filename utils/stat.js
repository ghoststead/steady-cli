const fs = require('fs');

/* fs.syncStat(path, {throwIfNoEntry: false}) for older versions of Node */
module.exports = function (path) {
    try {
        return fs.statSync(path);
    } catch (e) {
        return null;
    }
};
