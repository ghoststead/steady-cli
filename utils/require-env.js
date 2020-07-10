module.exports = function (name) {
    let value = process.env[name];
    if (!value) {
        console.error('Missing environment variable: ' + name);
        process.exit(1);
    }
    return value;
};