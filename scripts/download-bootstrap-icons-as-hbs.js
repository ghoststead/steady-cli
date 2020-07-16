'use strict';

const fs = require('fs');
const path = require('path');

const download = require('download');
const xml2js = require('xml2js');
const execa = require('execa');

const BOOTSTRAP_URL = 'https://github.com/twbs/icons/archive/main.zip';
const BOOTSTRAP_FILENAME = 'icons-main.zip';

const parser = new xml2js.Parser();
const builder = new xml2js.Builder();

(async () => {
    try {
        await download(BOOTSTRAP_URL, '.dist', {
            filename: BOOTSTRAP_FILENAME
        });

        execa.sync('unzip', ['-o', BOOTSTRAP_FILENAME], {
            cwd: '.dist',
            stdio: 'inherit'
        });

        fs.renameSync(
            path.resolve('.dist', 'icons-main', 'icons'),
            'bootstrap'
        );

        let entries = fs.readdirSync('bootstrap');
        for (let entry of entries) {
            if (entry.endsWith('.svg')) {
                let hbs = path.resolve('bootstrap', entry.substring(0, entry.length - 4) + '.hbs');
                let svg = path.resolve('bootstrap', entry);

                let data = await parser.parseStringPromise(fs.readFileSync(svg));
                let result = builder.buildObject(data).toString();

                // remove ?xml line
                let lines = result.split('\n');
                lines.splice(0,1);
                fs.writeFileSync(hbs, lines.join('\n') + '\n');
                fs.unlinkSync(svg);
            }
        }
    } catch (e) {
        console.error(e);
    }
})();