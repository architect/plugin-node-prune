let { updater } = require('@architect/utils')
let { spawnSync: spawn } = require('child_process')
let { join } = require('path')
let { existsSync } = require('fs')

/**
 * Add to your Architect project manifest file:
 *
 * @plugins
 * architect/plugin-node-prune
 *
 * That's it, zero config!
 */
async function pruner ({ inventory }) {
  let { lambdaSrcDirs } = inventory.inv
  for (let src of lambdaSrcDirs) {
    if (existsSync(src)) prune(src)
  }
  return
}

function prune (pathToPrune) {
  let quiet = process.env.ARC_QUIET
  let update = updater('Pruner')
  let start = Date.now()
  let cwd = process.cwd()
  pathToPrune = pathToPrune.startsWith(cwd)
    ? pathToPrune
    : join(cwd, pathToPrune)
  let cmd = join(cwd, 'node_modules', '@architect', 'plugin-node-prune', 'prune.sh')
  let options = { cwd: pathToPrune, shell: true }
  let child = spawn(cmd, [], options)
  let output = child.stdout
  if (!quiet && output) {
    // Format response
    output = output.toString().split('\n')
    let fmt = size => {
      if (size >= 1000) return `${size / 1000}MB`
      return `${size}KB`
    }
    let beforeSize = fmt(output[0])
    let afterSize = fmt(output[1])
    let beforeFiles = output[2]
    let afterFiles = output[3]
    let prunedFiles = beforeFiles - afterFiles
    let prunedSize = fmt(output[0] - output[1])
    let pretty = [
      `Before ... ${beforeSize} in ${beforeFiles} files`,
      `After .... ${afterSize} in ${afterFiles} files`,
      `Found .... ${prunedFiles} unnecessary node_modules files`,
      `Pruned ... ${prunedSize} in ${Date.now() - start}ms`,
    ]
    update.status(
      pathToPrune.replace(cwd, ''),
      ...pretty
    )
  }
  if (child.status !== 0 || child.error) {
    let error = child.error ? child.error : ''
    throw Error(`Prune error, exited ${child.status}`, error)
  }
}

module.exports = {
  deploy: {
    start: pruner
  },
  prune,
}
