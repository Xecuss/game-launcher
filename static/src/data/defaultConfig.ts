import { ILauncherConfig, IGameConfig } from "../interface/config.interface";

export let defaultGameConfig: IGameConfig = {
    id: -1,
    name: '默认配置',
    path: '',
    use720p: false,
    window: false,
    usePrinter: true,
    printerPath: '',
    printerFormat: 'jpg',
    printerClear: false,
    nowUseNetwork: -1,
    nowLocalNetwork: '',
    screenShotPath: '',
    ea: false,
    api: false,
    apiPassword: '',
    useSpice32: false,
    nowUseSC: -1
};

export let defaultConf: ILauncherConfig = {
    useAbleNetWorkConf: [],
    enableMSCM: false,
    lastUseConfig: -1,
    configs: [defaultGameConfig],
    useAbleSC: [],
    SCPath: './SxLauncher/'
};