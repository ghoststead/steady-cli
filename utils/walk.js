const fs = require('fs');
const path = require('path');

module.exports = function* walk(dir) {
    for (const d of fs.readdirSync(dir, {withFileTypes: true})) {
        const entry = path.join(dir, d.name);
        if (d.isFile()) {
            yield entry;
        }
        if (d.isDirectory()) {
            yield* walk(entry);
        }
    }
};
