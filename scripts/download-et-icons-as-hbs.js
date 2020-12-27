'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const download = require('download');
const xml2js = require('xml2js');
const execa = require('execa');

const ET_LINE_URL = 'https://www.elegantthemes.com/icons/line-icons.zip';
const ET_LINE_FILENAME = 'line-icons.zip';

function changeFill(value, name) {
    if (name === 'fill') {
        assert(value === '#828282');
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
        await download(ET_LINE_URL, '.dist', {
            filename: ET_LINE_FILENAME
        });

        execa.sync('unzip', ['-o', ET_LINE_FILENAME], {
            cwd: '.dist',
            stdio: 'inherit'
        });

        fs.renameSync(
            path.resolve('.dist', 'line-icons', 'SVG', 'individual icons'),
            'et-line'
        );

        let entries = fs.readdirSync('et-line');
        for (let entry of entries) {
            if (entry.endsWith('.svg')) {
                let hbs = path.resolve('et-line', entry.substring(0, entry.length - 4) + '.hbs');
                let svg = path.resolve('et-line', entry);

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