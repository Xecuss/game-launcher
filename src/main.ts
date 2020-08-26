import { app, BrowserWindow, ipcMain } from 'electron';

async function main(){
    await app.whenReady();

    let mainWindow = new BrowserWindow({
        width: 800,
        height: 480,
        frame: false,
        webPreferences: {
            nodeIntegration: true
        },
        resizable: false
    });

    mainWindow.loadFile('./dist/views/index.html');

    ipcMain.on('close', () => {
        mainWindow.close();
    });

    mainWindow.webContents.openDevTools();
}

main();