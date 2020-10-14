#!/usr/bin/env node
const path = require('path');

require('yargs')
    .commandDir(path.join(__dirname, 'commands'))
    .option('verbose', {
        alias: 'v',
        type: 'boolean',
        description: 'Run with verbose logging'
    })
    .option('workdir', {
        alias: 'w',
        type: 'string',
        description: 'Specify the working directory'
    })
    .help()
    .showHelpOnFail(true)
    .strict()
    .demandCommand(1)
    .argv;
