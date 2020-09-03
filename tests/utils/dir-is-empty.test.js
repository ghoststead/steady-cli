const fs = require('fs');
const tempDir = '/temp';
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

test('dir is not empty', () => {
    const dirIsEmpty = require('utils/dir-is-empty.js');
    expect(!dirIsEmpty(process.cwd())).toBeTruthy();
});

test('dir is empty', () => {
    const dirIsEmpty = require('utils/dir-is-empty.js');
    createDir(tempDir);
    expect(dirIsEmpty(process.cwd() + tempDir)).toBeTruthy();
    removeDir('temp');
});
