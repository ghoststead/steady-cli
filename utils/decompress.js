const decompress = require('../node_modules/decompress');
const download = require('../node_modules/download');

module.exports = async function (url, tempDir, tempFileName) {
    await download(url, process.cwd() + tempDir, {
        filename: tempFileName
    });
    await decompress(process.cwd() + tempDir + '/' + tempFileName, process.cwd() + tempDir);
};
