const fs = require('fs');
const path = require('path');

module.exports = async function* walk(dir) {
    for await (const d of await fs.promises.opendir(dir)) {
        const entry = path.join(dir, d.name);
        if (d.isFile()) {
            yield entry;
        }
        if (d.isDirectory()) {
            yield* await walk(entry);
        }
    }
};
