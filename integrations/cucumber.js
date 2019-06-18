const CLI = require('cucumber/lib/cli').default

function exitWithError(error) {
  console.error(error)
  process.exit(1)
}

module.exports = class CucumberCLI {
  constructor ({cwd, argv, stdout}) {
    this.cwd = cwd
    this.argv = ['node', 'cucumber', ...argv]
    this.stdout = stdout
  }

  async run () {
    const cli = new CLI({
      argv: this.argv,
      cwd: this.cwd,
      stdout: this.stdout,
    })

    let result
    try {
      result = await cli.run()
    } catch (error) {
      exitWithError(error)
    }

    const exitCode = result.success ? 0 : 1
    if (result.success === 0) {
      return Promise.resolve()
    } else {
      return Promise.reject()
    }
  }
}
