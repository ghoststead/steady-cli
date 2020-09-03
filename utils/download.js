const download = require('download');

module.exports = async function (url, tempDir, tempFileName) {
    await download(url, process.cwd() + tempDir, {
        filename: tempFileName
    });
};
