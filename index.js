const child = require('child_process').spawn
const path = require('path')
/**
 * Add to your .arc file:
 *
 * @plugins
 * architect/plugin-node-prune?
 *
 * Receives params:
 * {arc, pathToCode, env[, pluginConfig]}
 */
module.exports = { beforeDeploy }

function beforeDeploy(params) {
  return new Promise((resolve, reject) => {
    const cwd = process.cwd()
    let {pathToCode} = params
    pathToCode = pathToCode.startsWith(cwd)
      ? pathToCode
      : path.join(cwd, pathToCode)
    const cmd = path.join(cwd, 'node_modules', '@architect', 'arc-plugin-node-prune', 'dist', 'node-prune')
    const args = [pathToCode]
    const options = {cwd, shell:true}
    const spawn = child(cmd, args, options)
    spawn.on('exit', function exit(code) {
      if (code !== 0) {
        reject('Prune error, code:', code)
      }
      else {
        return resolve()
      }
    })
    spawn.on('error', function error(err) {
      reject(err)
    })
  })
}
