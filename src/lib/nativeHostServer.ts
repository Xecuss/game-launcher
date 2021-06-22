import { ipcMain, dialog, BrowserWindow } from 'electron';
import os from 'os';

export function initNativeHostServer(mainWindow: BrowserWindow) {
    ipcMain.on('close', () => {
        mainWindow.close();
    });
    
    ipcMain.on('choose-file', (e, args) => {
        let files = dialog.showOpenDialogSync(args);
        e.reply('choose-file-reply', files?.[0]);
    });
    
    ipcMain.on('message-box', (e, args) => {
        let btnOffset = dialog.showMessageBoxSync(args);
        e.reply('message-box-reply', btnOffset);
    });

    ipcMain.on('network-interface', (e, args) => {
        let networkInfo = os.networkInterfaces();
        e.reply('network-interface-reply', networkInfo);
    });
}