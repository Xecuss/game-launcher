import { ipcRenderer } from 'electron';

export async function nativeCall<A, R>(fn: string, args?: A): Promise<R> {
    ipcRenderer.send(fn, args);
    return new Promise((res, rej) => {
        ipcRenderer.once(fn + '-reply', (e, arg)=> {
            res(arg as R);
        });
    });
}