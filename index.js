const child = require('child_process').spawn
const path = require('path')

/**
 * Add to your .arc file:
 *
 * @plugins
 * architect/plugin-node-prune
 *
 * Receives params:
 * {arc, pathToCode, env[, pluginConfig]}
 */

// Setup
let running = 0
const limit = 10

module.exports = { beforeDeploy }

function beforeDeploy(params) {
  return new Promise((resolve, reject) => {
    // Setup bin
    // x64 only for now; it's hacky, I know
    // TODO work through Arc deploy plugin async issues to enable per-platform binary downloads at runtime
    let bin
    if (process.platform.startsWith('linux')) {
      bin = 'node-prune-linux'
    }
    else if (process.platform.startsWith('darwin')) {
      bin = 'node-prune-darwin'
    }
    else if (process.platform.startsWith('win')) {
      bin = 'node-prune.exe'
    }
    else {
      return reject(`Prune error: unsupported platform`)
    }
    function run() {
      if (!(running < limit)) {
        setTimeout(run, 500)
      }
      else {
        running += 1
        const cwd = process.cwd()
        let {pathToCode} = params
        pathToCode = pathToCode.startsWith(cwd)
          ? pathToCode
          : path.join(cwd, pathToCode)
        const cmd = path.join(cwd, 'node_modules', '@architect', 'arc-plugin-node-prune', 'dist', bin)
        const args = [pathToCode]
        const options = {cwd, shell:true}
        const spawn = child(cmd, args, options)
        spawn.on('exit', function exit(code) {
          running -= 1
          if (code !== 0) {
            reject(`Prune error, code: ${code}`)
          }
          else {
            return resolve()
          }
        })
        spawn.on('error', function error(err) {
          running -= 1
          reject(err)
        })
      }
    }
    run()
  })
}
