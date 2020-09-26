const {cosmiconfigSync} = require('cosmiconfig');

module.exports = (function () {
    const sync = cosmiconfigSync('steady');
    const result = sync.search();

    let config = result.config;

    return {
        require: function (name) {
            let value = config[name];
            if (value === undefined || value === null) {
                console.error('Missing required config option: ' + name);
                process.exit(1);
            }
            return value;
        },
        config: config
    };
})();
