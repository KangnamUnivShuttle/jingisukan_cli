#! /usr/bin/env node
import yargs from "yargs";

/// TODO:
/// Create env file
/// Create docker-compose file with some param
/// Control docker container status using docker-compose
/// Get status of container

yargs.usage('Usage: $0 <command> [options]')

yargs.command({
    command: 'env',
    describe: 'Create .env file',
    builder: {
        data: {
            type: 'array',
            desc: 'One or more env val.',
            demandOption: true
        }
    },
    handler: (args) => {
        console.log('env', args);
    }
})

yargs.command({
    command: 'new',
    describe: 'Create docker-compose.yaml with param',
    builder: {
        cpu: {
            type: 'string',
            desc: 'Limit container cpu usage.',
            demandOption: true
        },
        ram: {
            type: 'string',
            desc: 'Limit container ram memory usage.',
            demandOption: true
        },
        name: {
            type: 'string',
            desc: 'Name of build image and container name.',
            demandOption: true
        },
        env: {
            type: 'boolean',
            desc: 'Use env.',
            default: false
        }
    },
    handler: (args) => {
        console.log('new', args);
    }
})

yargs.command({
    command: 'service',
    describe: 'Control docker container status using docker-compose',
    builder: {
        name: {
            type: 'string',
            desc: 'Name of container name.',
            demandOption: true
        },
        status: {
            type: 'string',
            desc: 'Change status of docker container.',
            demandOption: true
        },
    },
    handler: (args) => {
        console.log('service', args);
    }
})

yargs.command({
    command: 'status',
    describe: 'Get status of container',
    builder: {
        name: {
            type: 'string',
            desc: 'Name of container name.',
            demandOption: true
        },
    },
    handler: (args) => {
        console.log('service', args);
    }
})

yargs.parse();