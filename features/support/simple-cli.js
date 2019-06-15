const debug = require('debug')('simple-cli')

module.exports = class SimpleCli {
  constructor({argv, cwd, stdout}) {
    this.argv = argv
    this.cwd = cwd
    this.stdout = stdout
  }

  run () {
    return Promise.resolve()
  }
}
