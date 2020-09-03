const fs = require('fs');
const THEME_URL = 'https://github.com/ghoststead/ghost-theme-ghoststead/archive/master.zip';
const tempDir = '/temp1';
const createDir = (dirPath) => {
    fs.mkdirSync(process.cwd() + dirPath, {recursive: true, mode: '0777'}, (err) => {
        if (err) {
            console.error('An error occurred: ', err);
        }
    });
};
const removeDir = (dirPath) => {
    if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath);
        if (files.length > 0) {
            files.forEach(function (filename) {
                if (fs.statSync(dirPath + '/' + filename).isDirectory()) {
                    removeDir(dirPath + '/' + filename);
                } else {
                    fs.unlinkSync(dirPath + '/' + filename);
                }
            });
            fs.rmdirSync(dirPath);
        } else {
            fs.rmdirSync(dirPath);
        }
    } else {
        console.error('Directory not found.');
    }
};

test('Download is working', async () => {
    const downloadJs = require('utils/download.js');
    createDir(tempDir);
    await expect(downloadJs(THEME_URL, tempDir, 'theme.zip'));
    removeDir('temp1');
});
