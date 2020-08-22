import { ILocalNetwork } from "./localNet.interface";

export interface ILauncherConfig{
    use720p: boolean;
    window: boolean;
    usePrinter: boolean;
    printerPath: string;
    printerFormat: 'png' | 'bmp' | 'tga' | 'jpg';
    printerClear: boolean;
    useAbleNetWorkConf: Array<INetworkConfig>;
    nowUseNetwork: string;
    nowLocalNetwork: string;
    screenShotPath: string;
    ea: boolean;
    //spice api选项，打开后可以通过工具远程控制spice
    api: boolean;
    apiPassword: string;
}

export interface INetworkConfig{
    http11: 0 | 1;
    urlSlash: 0 | 1;
    url: string;
    pcbId: string;
    id: string;
}