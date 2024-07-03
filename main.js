const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

let apiKey = "jSoQ214cCzRPG4mxqMw64M8aobXpmV7B";

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        contextIsolation: true,
        enableRemoteModule: false,
        webSecurity: true
    }
  });

  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  ipcMain.handle('getApiKey', () => {
    return apiKey;
  });
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})