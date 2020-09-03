const fs = require('fs');
const path = require('path');
const dirToCreate = path.join(process.cwd(), 'temp');

test('dir is not empty', () => {
    const dirIsEmpty = require('utils/dir-is-empty.js');
    expect(!dirIsEmpty(process.cwd())).toBeTruthy();
});

test('dir is empty', () => {
    const dirIsEmpty = require('utils/dir-is-empty.js');
    if (fs.existsSync(dirToCreate)) {
        expect(dirIsEmpty(dirToCreate)).toBeTruthy();
        fs.rmdirSync(dirToCreate);
    } else {
        fs.mkdir(dirToCreate, {mode: '0777'},
            (err) => {
                if (err) {
                    throw err;
                }
                expect(dirIsEmpty(dirToCreate)).toBeTruthy();
                fs.rmdirSync(dirToCreate);
            }
        );
    }
});
