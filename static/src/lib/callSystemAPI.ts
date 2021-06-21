import { OpenDialogOptions, MessageBoxSyncOptions, Display } from 'electron';
import { nativeCall } from './nativeCall';


export function openFileDialog( options: OpenDialogOptions ): Promise<string | null>{
    return nativeCall('choose-file', options);
}

export function openMessageBox( options: MessageBoxSyncOptions ): Promise<number | null>{
    return nativeCall('message-box', options);
}

export function getScreens(): Promise<Display[]>{
    return nativeCall('get-screen');
}

export function closeApp(){
    nativeCall('close');
}