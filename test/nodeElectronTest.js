const childProcess = require('child_process')
const path = require('path')
const binaryPath = path.join(__dirname, '..', 'bin', 'node-electron')

describe('node-electron', function() {
  it('runs a script in electron', function() {
    const scriptPath = path.join(__dirname, 'support', 'logHello.js')
    const proc = childProcess.spawn('node', [binaryPath, scriptPath])
    return new Promise(function(resolve, reject) {
      function killThen(what) {
        process.kill(proc.pid + 1)
        what()
      }

      function fail(reason) {
        killThen(() => reject(new Error(reason)))
      }

      proc.on('error', function(e) {
        killThen(() => reject(e))
      })

      proc.stdout.on('data', function(chunk) {
        if (chunk == "hello\n") {
          killThen(resolve)
        } else {
          fail('Unexpected output: ' + chunk)
        }
      })

      proc.on('close', function () {
        fail('The process terminated')
      })

      setTimeout(function () {
        fail('Too slow!')
      }, 1500)
    })
  })
})
