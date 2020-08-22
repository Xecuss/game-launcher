import { app, BrowserWindow, ipcMain } from 'electron';

async function main(){
    await app.whenReady();

    let mainWindow = new BrowserWindow({
        width: 800,
        height: 480,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            webSecurity: false
        },
        resizable: false
    });

    mainWindow.loadFile('./dist/views/index.html');

    ipcMain.on('close', () => {
        console.log('close!');
        mainWindow.close();
    });

    //mainWindow.webContents.openDevTools();
}

main();