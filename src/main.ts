import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';

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

    mainWindow.loadFile(path.resolve('./dist/views/index.html'));

    ipcMain.on('close', () => {
        console.log('close!');
        mainWindow.close();
    });

    mainWindow.webContents.openDevTools();
}

main();