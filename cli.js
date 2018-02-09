const child_process = require('child_process')
const electron = require('electron')
const pathUtils = require('path')
const parseOptions = require('./parseOptions')

module.exports = function cli(argv) {
  const args = [pathUtils.resolve(__dirname, 'main.js')].concat(argv)
  const p = child_process.spawn(electron, args, { stdio: 'inherit' })
  p.on('close', process.exit)
}
