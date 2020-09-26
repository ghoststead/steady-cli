const fs = require('fs');
const rimraf = require('rimraf');

const DEFAULT = `
# Full URL of your Ghost site
SITE_URL=http://localhost:2368

# Custom Ghost integration
# ADMIN_API_KEY=<long alphanumeric string>

# Theme name to be developed
THEME=ghoststead
`;

module.exports = {
    command: 'initenv',
    describe: 'Initialize a new environment file',
    builder: {},

    handler: function () {
        if (fs.existsSync('.env')) {
            console.error('ERROR: .env already exists.');
            process.exit(1);
        } else {
            rimraf.sync('.env');
            fs.writeFileSync('.env', DEFAULT, {flag: 'a+'});
        }
    }
};
