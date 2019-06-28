const Options = require('../cli/options')
const electron = require('electron')
const options = new Options(electron.remote.process.argv.slice(2))
const { ipcRenderer: ipc } = electron
const { join } = require('path')

require('./patches/console')
require('./patches/debug')({ isTTY: options.isTTY })

const debug = require('debug')('node-electron:renderer')
const Shell = require('../shell')
const sh = new Shell()

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true

ipc.on('run-command', async () => {
  const pathUtils = require('path')
  const findRequires = require('./findRequires')
  const fs = require('fs')
  const resolve = require('resolve')
  const requires = findRequires(electron.remote.process.argv.slice(2))
  const argv = options.commandArgs

  requires.forEach(module => {
    var path = join(process.cwd(), module)
    require(path)
  })

  if (argv.length > 0) {
    let command = argv[0]
    let succeeded
    const CLI = require(pathUtils.resolve(command))
    try {
      const cli = new CLI({
        cwd: process.cwd(),
        argv: argv.slice(1),
        stdout: process.stdout,
      })

      await cli.run()
      succeeded = true
    }
    catch (e) {
      succeeded = false
    }
    if (!options.interactiveMode) {
      electron.remote.process.exit(succeeded ? 0 : 1)
    }
  }
})

ipc.send('ready-to-run-command')
