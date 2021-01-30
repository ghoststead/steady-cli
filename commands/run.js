const execa = require('execa');
const workdir = require('../utils/workdir');

module.exports = {
    command: 'run',
    describe: 'Run the local Ghost instance in the foreground',
    builder: {},

    handler: function (args) {
        workdir.use(args);
        execa.sync(process.execPath, ['current/index.js'], {stdio: 'inherit'});
    }
};
