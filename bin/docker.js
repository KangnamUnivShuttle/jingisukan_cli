import yaml from 'write-yaml'
import { exec } from 'child_process'

export function exportDockerComposeYAML(options) {
    const {
        cpu = '0.5',
        ram = '128M',
        name = 'TEST',
        port = '5000',
        path = '.'
    } = options

    if (!name.match(/^[a-zA-Z]{1}[a-zA-Z0-9_.-]{7,15}$/g)) {
        throw new Error('Unavailable letter inside of name')
    }

    const data = {
        version: '3',
        networks: {
            chatbot: {
                external: true
            }
        },
        services: {
            plugin_node: {
                image: `${name}`,
                build: `${path}/${name}/`,
                container_name: name,
                restart: 'always',
                networks: ['chatbot'],
                ports: [`${port}:80`],
                deploy: {
                    resources: {
                        limits: {
                            cpus: cpu,
                            memory: ram
                        }
                    }
                }
            }
        }
    }
    yaml(`${path}/${name}/docker-compose.yaml`, data, (err) => {
        if (err) {
            console.error(`[docker] [exportDockerComposeYAML] error: ${err.message}`)
            return;
        }
        console.log('[docker] [exportDockerComposeYAML] done');
    });      
}

export function runDockerCompose(options) {
    const {
        status = 'undefined',
        name = 'TEST',
        path = '.'
    } = options
    let command = '';
    switch(status) {
        case 'start':
            command = `docker-compose up -d --file=${path}/${name}/docker-compose.yaml`
            break;
        case 'stop':
            command = `docker-compose stop --file=${path}/${name}/docker-compose.yaml`
            break;
        case 'remove':
            command = `docker-compose rm -f --file=${path}/${name}/docker-compose.yaml`
            break;
        default:
            throw new Error(`Unexpected status detected, ${status}!=[start|stop|remove]`)
    }
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`${stderr}`);
            return;
        }
        console.log(`${stdout}`);
    });
}

export function checkDockerContainerStatus (name) {
    const command = `docker ps --filter "name=${name}"`
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`${stderr}`);
            return;
        }
        console.log(`${stdout}`);
    });
}

export function runPrune () {
    const command = `docker system prune -f`
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`${stderr}`);
            return;
        }
        console.log(`${stdout}`);
    });
}

export function removeImage (name) {
    if (!name.match(/^[a-zA-Z]{1}[a-zA-Z0-9_.-]{7,15}$/g)) {
        throw new Error('Unavailable letter inside of name')
    }
    const command = `docker rmi ${name}:latest -f`
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`${stderr}`);
            return;
        }
        console.log(`${stdout}`);
    });
}