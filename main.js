const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path');
const config = require('./src/config');
const storage = require('./src/main/storage');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      enableRemoteModule: false, // turn off remote
      contextIsolation: true,
      nodeIntegration: false,
    }
  })

  if (!storage.getJwt()) {
    win.loadFile('src/renderer/pages/login.html');
  } else {
    win.loadFile('src/renderer/pages/index.html');
  }
  return win;
}
let win;
app.whenReady().then(() => {
  win = createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      win = createWindow()
    }
  });
  win.webContents.openDevTools();
  setTimeout(() => {
    win.webContents.send('init', config);
  }, 1000)
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
