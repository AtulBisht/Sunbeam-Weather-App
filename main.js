const { app, BrowserWindow } = require('electron')

let win;
function createWindow() {

  win = new BrowserWindow({
    width: 600,
    height: 600,
    backgroundColor: '#ffffff',
    icon: `file://${__dirname}/dist/assets/logo.png`
  })


  win.loadURL(`file://${__dirname}/dist/index.html`)

  //// uncomment below to open the DevTools.
  win.webContents.openDevTools()

  // Event when the window is closed.
  win.on('closed', function () {
    win = null
  })
}

// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  process.env.GOOGLE_API_KEY = "AIzaSyCzD9phXc7MIN5hQgQ2w_lPMuRxyIFIHzI";
  // macOS specific close process
  if (win === null) {
    createWindow()
  }
})