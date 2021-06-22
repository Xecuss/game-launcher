import { ipcMain, dialog, BrowserWindow } from 'electron';
import os from 'os';
import { readFile, writeFile, mkdir, access } from 'fs';

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

    ipcMain.on('read-file', (e, args) => {
        readFile(args as string, (err, res) => {
            if(err) throw new Error('读取文件出错: ' + err);
            e.reply('read-file-reply', res.toString());
        });
    });

    ipcMain.on('write-file', (e, args) => {
        writeFile(args.path, args.content, (err) => {
            if(err) throw new Error('写入文件出错: ' + err);
            e.reply('write-file-reply');
        });
    });

    ipcMain.on('make-dir', (e, args) => {
        mkdir(args.path, args.options, () => {
            e.reply('make-dir-reply');
        });
    });

    ipcMain.on('access-file', (e, args) => {
        access(args.path, args.mode, (err) => {
            if(err) e.reply('access-file-reply', '');
            else e.reply('access-file-reply', 'access');
        });
    });
}