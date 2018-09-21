
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

var mainRenderer = null;

ipcMain.on('asynchronous-message', (event, arg) => {
  mainRenderer = event.sender;
});

app.on('will-quit', (e) => {

  if(mainRenderer !== null) {
    console.log("quitting");
    mainRenderer.sendSync('synchronous-message', 'will-quit');
    console.log("sent sync");
  }
  
});
