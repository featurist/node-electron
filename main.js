const electron = require('electron')
const pathUtils = require('path')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

const Options = require('./options')
const options = new Options(process.argv.slice(2))

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

if (options.isHelp) {
  console.log(`
  --interactive
Usage: node-electron [options] [<FILE>...]

  Options:
    -v, --version                   output the version number
    -i, --interactive               run the program with the debugger open
    --TTY                           run in TTY compatability mode
  `)
  process.exit(0)
}


function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    focusable: true,
    show: options.interactiveMode,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
  })

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('argv', [pathUtils.resolve('bin/node-electron')].concat(options.commandArgs))
  })

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})
