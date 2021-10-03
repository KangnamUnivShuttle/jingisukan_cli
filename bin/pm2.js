import { writeFile } from 'fs'

export function exportEcosystemConfig(options) {
    const {
        name = 'TEST',
        path = '.'
    } = options

    const content = `module.exports = [{
        script: './index.js',
        name: 'my-server',
        exec_mode: 'cluster',
        instances: 1
    }]`

    writeFile(`${path}/${name}/ecosystem.config.js`, content, (err) => {
        if (err) {
            console.error(`[pm2] [exportEcosystemConfig] error: ${err.message}`)
            return;
        }
        console.log('[pm2] [exportEcosystemConfig] done')
    })
}