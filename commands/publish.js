const fs = require('fs');
const path = require('path');
const rc = require('../utils/rc.js');
const workdir = require('../utils/workdir');
const publishTheme = require('../commands/publish-theme.js');

module.exports = {
    command: 'publish',
    describe: 'Publish the theme to your Ghost site',

    builder: {},

    handler: async function (args) {
        workdir.use(args);

        const themeName = rc.config.themeName || 'ghoststead';

        let themePath = path.resolve('content', 'themes', themeName);
        if (!fs.existsSync(themePath)) {
            console.error(`Theme path not found: ${ themePath}`);
            return process.exit(1);
        }

        let packageJsonPath = path.join(themePath, 'package.json');
        if (!fs.existsSync(packageJsonPath)) {
            console.error(`package.json not found in theme path: ${ themePath}`);
            return process.exit(1);
        }

        let packageJson = require(packageJsonPath);
        let fileName = `${packageJson.name }-${ packageJson.version }.zip`;

        let dist = path.join(themePath, 'dist', fileName);

        if (args.verbose) {
            console.log(`Publishing theme: ${ dist}`);
        }
        await publishTheme.handler({
            path: dist,
            verbose: args.verbose
        });
    }
};
