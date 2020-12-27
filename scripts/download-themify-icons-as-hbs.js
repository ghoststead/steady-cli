'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const download = require('download');
const xml2js = require('xml2js');
const execa = require('execa');

const THEMIFY_URL = 'https://themify.me/download/7/';
const THEMIFY_FILENAME = 'themify-icons-font.zip';

function changeFill(value, name) {
    if (name === 'fill') {
        assert(value === '#000000');
        return 'currentColor';
    }
    return value;
}

const parser = new xml2js.Parser({
    attrValueProcessors: [changeFill]
});
const builder = new xml2js.Builder();

(async () => {
    try {
        await download(THEMIFY_URL, '.dist', {
            filename: THEMIFY_FILENAME
        });

        execa.sync('unzip', ['-o', THEMIFY_FILENAME], {
            cwd: '.dist',
            stdio: 'inherit'
        });

        fs.renameSync(
            path.resolve('.dist', 'themify-icons', 'SVG'),
            'themify'
        );

        let entries = fs.readdirSync('themify');
        for (let entry of entries) {
            if (entry.endsWith('.svg')) {
                let hbs = path.resolve('themify', entry.substring(0, entry.length - 4) + '.hbs');
                let svg = path.resolve('themify', entry);

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