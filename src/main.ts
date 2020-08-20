import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';

async function main(){
    await app.whenReady();

    let mainWindow = new BrowserWindow({
        width: 500,
        height: 300,
        frame: false,
        transparent: true,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadFile(path.resolve('./page/index.html'));

    ipcMain.on('close', () => {
        console.log('close!');
        mainWindow.close();
    });

    mainWindow.webContents.openDevTools();
}

main();