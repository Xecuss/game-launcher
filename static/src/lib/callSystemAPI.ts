import { OpenDialogOptions, MessageBoxSyncOptions, Display } from 'electron';
import { nativeCall } from './nativeCall._env_';
import { NetworkInterfaceInfo } from 'os';

type INetworkResult = NodeJS.Dict<NetworkInterfaceInfo[]>;


export function openFileDialog( options: OpenDialogOptions ): Promise<string | null>{
    return nativeCall('choose-file', options);
}

export function openMessageBox( options: MessageBoxSyncOptions ): Promise<number | null>{
    return nativeCall('message-box', options);
}

export function getScreens(): Promise<Display[]>{
    return nativeCall('get-screen');
}

export function getNetworkInterface(): Promise<INetworkResult>{
    return nativeCall('network-interface');
}

export function readFile(path: string): Promise<string>{
    return nativeCall('read-file', path);
}

export function writeFile(path: string, content: string): Promise<void> {
    return nativeCall('write-file', {
        path,
        content
    });
}

export function makeDir(path: string, options: any): Promise<void> {
    return nativeCall('make-dir', {
        path,
        options
    });
}

export function accessFile(path: string, mode?: any): Promise<string> {
    return nativeCall('access-file', {
        path,
        mode
    });
}

export function closeApp(){
    nativeCall('close');
}