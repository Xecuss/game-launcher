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

    console.log(process.env.NODE_ENV);
    if(process.env.NODE_ENV === 'development'){
        console.log('在测试环境启动Electron!');
        mainWindow.loadURL('http://localhost:9000/');
        mainWindow.webContents.openDevTools();
    }
    else{
        mainWindow.loadFile('./dist/views/index.html');
    }

    ipcMain.on('close', () => {
        mainWindow.close();
    });
}

main();