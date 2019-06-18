class Options {
  constructor(argv) {
    this.interactiveMode = Boolean(argv.find(isInteractiveSwitch))
    this.isTTY = Boolean(argv.find(isTTYSwitch))
    this.isHelp = Boolean(argv.find(isHelp))
    this.commandArgs = argv.filter((arg, index) => !isInteractiveSwitch(arg) && !isTTYSwitch(arg) && !isHelp(arg) && !isRequireSwitch(arg, index, argv))
  }
}

function isRequireSwitch(arg, index, argv) {
  const isRequire =  arg === '--require' || arg === '-r'
  if (!isRequire && index > 0) {
    return isRequireSwitch(argv[index-1])
  }
  return isRequire
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
