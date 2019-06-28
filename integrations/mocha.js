const unparse = require('yargs-unparser');
const {main} = require('mocha/lib/cli/cli.js')
const {aliases} = require('mocha/lib/cli/run-option-metadata');

module.exports = class MochaCLI {
  constructor ({cwd, argv}) {
    this.cwd = cwd
    this.argv = [...argv]
  }

  run () {
    return main(unparse(this.argv, {alias: aliases}))
  }
}
