import yaml from 'write-yaml'

export function exportDockerComposeYAML(options) {
    const {
        cpu = '0.5',
        ram = '128M',
        name = 'TEST',
        port = '5000',
        path = '.'
    } = options

    const data = {
        version: '3',
        networks: {
            chatbot: {
                external: true
            }
        },
        services: {
            plugin_node: {
                image: '',
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
    yaml(`${path}/docker-compose.yaml`, data, (err) => {
        if (err) {
            console.error(`[docker] [exportDockerComposeYAML] error: ${err.message}`)
            return;
        }
        console.log('[docker] [exportDockerComposeYAML] done');
    });      
}