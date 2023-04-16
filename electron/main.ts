// main.ts
import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';
import { Example } from '../shared/common.interfaces';
import Store from 'electron-store'

let win: BrowserWindow | null;
const args = process.argv.slice(1),
  serve = args.some((val) => val === '--serve');
function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (serve) {
    win.loadURL(`http://localhost:4200`);
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, `../angular/index.html`),
        protocol: 'file:',
        slashes: true,
      })
    );
  }

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
