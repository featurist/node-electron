var spawn = require('child_process').spawn
var path = require('path')

var electron = require('electron')

module.exports = function (args) {
  if (args.length === 1 && args[0] === '--help' || args[0] === '-h') {
    showHelp()
  } else {
    runCommandInRendererProcess()
  }

  function showHelp() {
    require('../cli/help')
  }

  function runCommandInRendererProcess() {
    args.unshift(path.resolve(path.join(__dirname, '../index.js')))
    if (process.stdout.isTTY || process.env.NODE_ELECTRON_FORCE_TTY === 'true') {
      args.push('--TTY')
    }

    var child = spawn(electron, args)
    child.stdout.pipe(process.stdout)
    process.stdin.pipe(child.stdin)

    child.stderr.on('data', function (data) {
      var str = data.toString('utf8')
      // Mute irrelevant chromium errors
      if (str.match(/^\[\d+:\d+/) || str.match(/Couldn't set selectedTextBackgroundColor/)) return
      process.stderr.write(data)
    })
    child.on('exit', function (code) { process.exit(code) })
  }
}
