
const { app, BrowserWindow, ipcMain } = require('electron');

function createWindow() {
  var win = new BrowserWindow({ width: 800, height: 600 });

  win.loadFile('index.html');

  win.webContents.openDevTools();

  win.on('close', () => {
    win = null;
  });
}

app.on('ready', createWindow);


app.on('window-all-closed', () => {

  if(process.platform !== 'darwin') {
    app.quit();
  }
});

