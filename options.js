class Options {
  constructor(argv) {
    this.interactiveMode = Boolean(argv.find(isInteractiveSwitch))
    this.isTTY = Boolean(argv.find(isTTYSwitch))
    this.isHelp = Boolean(argv.find(isHelp))
    this.commandArgs = argv.filter(arg => !isInteractiveSwitch(arg) && !isTTYSwitch(arg) && !isHelp(arg))
  }
}

function isInteractiveSwitch(arg) {
  return arg === '--interactive' || arg === '-i'
}

function isTTYSwitch(arg) {
  return arg === '--TTY'
}

function isHelp(arg) {
  return arg === '--help' || arg === '-h'
}

module.exports = Options
