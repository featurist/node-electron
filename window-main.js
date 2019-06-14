require('./patches/console')
const electron = require('electron')
const debug = require('debug')('node-electron:renderer')
const Shell = require('./shell')
const sh = new Shell()

require('electron').ipcRenderer.on('argv', async (event, message) => {
  const pathUtils = require('path')
  const parseOptions = require('./parseOptions')
  const fs = require('fs')
  const resolve = require('resolve')
  var options = parseOptions(message.slice(1))
  const argv = [message[0]].concat(options.args)

  options.requires.forEach(module => {
    var path = fs.realpathSync(resolve.sync(module))
    require(path)
  })

  if (options.args.length > 0) {
    let command = options.args[0]
    const CLI = require(pathUtils.resolve(command))
    try {
      const cli = new CLI({
        cwd: process.cwd(),
        argv,
        stdout: process.stdout,
      })

      await cli.run()
      electron.remote.process.exit(0)
    }
    catch (e) {
      console.log(e, e.stack)
      electron.remote.process.exit(1)

    }
  }
})
