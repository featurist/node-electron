module.exports = class SimpleCli {
  constructor({argv, cwd, stdout}) {
    this.argv = argv
    this.cwd = cwd
    this.stdout = stdout
  }

  run () {
    console.log('ARGV', this.argv)
    return Promise.resolve()
  }
}
