const fs = require('fs');
const path = require('path');

const stat = require('./stat');

/* This function assumes the working director is cwd */
function fullpath(themeName, options) {
    themeName = themeName || 'ghoststead';
    options = options || {};
    const cwd = options.cwd || process.cwd();
    return path.join(cwd, 'content', 'themes', themeName);
}

function check(themeName) {
    themeName = themeName || 'ghoststead';
    const themeDir = fullpath(themeName);

    const stats = stat(themeDir);
    if (!stats) {
        throw new Error(`The configured theme does not exist: ${themeName}`);
    }

    const packageJson = path.resolve(themeDir, 'package.json');
    if (!fs.existsSync(packageJson)) {
        throw new Error(`The theme exists but is not valid since it doesn't contain 'package.json': ${themeDir}`);
    }
}

module.exports = {
    fullpath,
    check
};
