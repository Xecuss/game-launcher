import { ipcRenderer, OpenDialogOptions, Display } from 'electron';


export function openFileDialog( options: OpenDialogOptions ): Promise<string | null>{
    ipcRenderer.send('choose-file', options);
    return new Promise((res, rej) => {
        ipcRenderer.once('choose-file-reply', (e, arg)=> {
            res(arg);
        });
    });
}

export function getScreens(): Promise<Display[]>{
    ipcRenderer.send('get-screen');
    return new Promise((res, rej) => {
        ipcRenderer.once('get-screen-reply', (e, arg)=> {
            res(arg);
        });
    });
}

export function closeApp(){
    ipcRenderer.send('close');
}