const { app, BrowserWindow, ipcMain } = require('electron');

const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow = null;

process.on('warning', e => console.warn(e.stack));

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1600,
        height: 900,
        minHeight: 300,
        minWidth: 480,
        frame: false,
        backgroundColor: '#252525',
        useContentSize: true,
        webPreferences: { 
            nodeIntegration: true,
            preload: path.join(__dirname, 'preloads.js'),
            //contextIsolation: false 
        },
        icon: path.join(__dirname, "icons/Squirrel.svg"),
    });

    mainWindow.setMenuBarVisibility(false);

    mainWindow.loadURL(isDev ? "http://localhost:3000": `file://${path.join(__dirname, "../build/index.html")}`);

    // Open the DevTools.
    if (isDev) {
        mainWindow.webContents.openDevTools({ mode: 'detach' });
    }

    mainWindow.on('closed', () => {
        console.log("app.closed");
        mainWindow = null;
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    return mainWindow;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    console.log("app.whenReady");
    //start();
    createWindow();
});

app.on('activate', () => {
    console.log("app.activate");
    if (BrowserWindow.getAllWindows().length === 0) {
        //start();
        createWindow();
    }
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    console.log("app.window-all-closed");
    if (process.platform !== 'darwin') {
      app.quit();
    }
});

app.on('before-quit', () => {
    console.log("app.before-quit");
    if(mainWindow) {
        mainWindow.removeAllListeners('close');
        mainWindow.close();
    }
});


/************************/

ipcMain.handle('window:maximize', async () => {
    if(mainWindow) {
        if(mainWindow.isMaximized()) {
            mainWindow.unmaximize();
        } else {
            mainWindow.maximize();
            return true;
        }
    }
    return false;
});

ipcMain.handle('window:close', async () => {
    if(mainWindow) {
        mainWindow.close();
        return true;
    }
    return false;
});

ipcMain.handle('window:minimize', async () => {
    if(mainWindow) {
        mainWindow.minimize();
        return true;
    }
    return false;
});
