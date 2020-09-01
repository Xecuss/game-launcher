export interface ILauncherConfig{
    use720p: boolean;
    window: boolean;
    usePrinter: boolean;
    printerPath: string;
    printerFormat: 'png' | 'bmp' | 'tga' | 'jpg';
    printerClear: boolean;
    useAbleNetWorkConf: Array<INetworkConfig>;
    nowUseNetwork: number;
    nowLocalNetwork: string;
    screenShotPath: string;
    ea: boolean;
    //spice api选项，打开后可以通过工具远程控制spice
    api: boolean;
    apiPassword: string;
}

export interface IGameConfig{
    id: number;
    name: string;
    path: string;
    use720p: boolean;
    window: boolean;
    usePrinter: boolean;
    printerPath: string;
    printerFormat: 'png' | 'bmp' | 'tga' | 'jpg';
    printerClear: boolean;
    nowUseNetwork: number;
    nowLocalNetwork: string;
    screenShotPath: string;
    ea: boolean;
    //spice api选项，打开后可以通过工具远程控制spice
    api: boolean;
    apiPassword: string;
}

export interface INetworkConfig{
    http11: boolean;
    urlSlash: boolean;
    url: string;
    pcbId: string;
    id: number;
    name: string;
    localServCommand?: string;
}