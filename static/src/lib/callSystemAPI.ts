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

export function closeApp(){
    nativeCall('close');
}