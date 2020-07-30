import {
  app,
  BrowserWindow,
  ipcMain,
  Notification,
  globalShortcut
} from 'electron';
import * as path from 'path';
import isDev = require('electron-is-dev');

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  if (isDev) {
    // Load the app use Url in dev
    mainWindow.loadURL('http://localhost:3000');

    // Register shortcut.
    globalShortcut.register('CmdOrCtrl+Shift+O', () => {
      if (mainWindow.webContents.isDevToolsOpened()) {
        // Close the DevTools.
        mainWindow.webContents.closeDevTools();
      } else {
        // Open the DevTools.
        mainWindow.webContents.openDevTools();
      }
    });

    // Register shortcut.
    globalShortcut.register('CmdOrCtrl+Shift+S', () => {
      mainWindow.webContents.send('open-custom-style');
    });
  } else {
    // Load the app use File in prod
    mainWindow.loadFile(path.join(__dirname, 'render/build/index.html'));
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  // Notice of copy.
  ipcMain.on('copy-success', () => {
    new Notification({
      title: '复制成功',
      body: '赶快到编辑器中去粘贴吧~'
    }).show();
  });

  // Get drag file.
  ipcMain.on('ondragstart', (event, options) => {
    new Notification(options).show();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
