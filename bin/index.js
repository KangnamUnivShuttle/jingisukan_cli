#! /usr/bin/env node
import yargs from "yargs";
// https://www.daleseo.com/js-node-es-modules/#:~:text=%ED%99%95%EC%9E%A5%EC%9E%90%EB%A5%BC%20%ED%8F%AC%ED%95%A8%ED%95%B4%EC%84%9C%20%EA%B2%BD%EB%A1%9C%EB%A5%BC%20%EB%AA%85%EC%8B%9C%ED%95%B4%EC%A3%BC%EB%A9%B4%20%EC%A0%95%EC%83%81%EC%A0%81%EC%9C%BC%EB%A1%9C%20%EC%9E%91%EB%8F%99%ED%95%A9%EB%8B%88%EB%8B%A4.
import { exportDockerFile, exportDockerComposeYAML, runDockerCompose, checkDockerContainerStatus, runPrune, removeImage } from './docker.js';
import { exportEcosystemConfig } from './pm2.js'

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
    command: 'ecosystem',
    describe: 'Create ecosystem.config file',
    builder: {
        name: {
            type: 'string',
            desc: 'Name of docker image',
            demandOption: true
        },
        path: {
            type: 'string',
            desc: 'Path of docker image',
            demandOption: true
        }
    },
    handler: (args) => {
        console.log('ecosystem', args);
        exportEcosystemConfig(args)
    }
})

yargs.command({
    command: 'dockerfile',
    describe: 'Create dockerfile file',
    builder: {
        url: {
            type: 'string',
            desc: 'Plugin github url',
            demandOption: true
        },
        name: {
            type: 'string',
            desc: 'Name of docker image',
            demandOption: true
        },
        path: {
            type: 'string',
            desc: 'Path of docker image',
            demandOption: true
        }
    },
    handler: (args) => {
        console.log('dockerfile', args);
        exportDockerFile(args)
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
        port: {
            type: 'string',
            desc: 'Port for container.',
            demandOption: true
        },
        path: {
            type: 'string',
            desc: 'Export path.',
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
        exportDockerComposeYAML(args)
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
        path: {
            type: 'string',
            desc: 'Path for container saved.',
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
        runDockerCompose(args)
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
        checkDockerContainerStatus(args.name)
    }
})

yargs.command({
    command: 'rmi',
    describe: 'Remove docker image',
    builder: {
        name: {
            type: 'string',
            desc: 'Name of image.',
            demandOption: true
        },
    },
    handler: (args) => {
        console.log('rmi', args);
        removeImage(args.name)
    }
})

yargs.command({
    command: 'prune',
    describe: 'Docker prune',
    builder: {
    },
    handler: (args) => {
        console.log('prune', args);
        runPrune()
    }
})

yargs.parse();