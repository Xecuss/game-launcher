import { ILauncherConfig } from "../interface/config.interface";

export let defaultConf: ILauncherConfig = {
    useSpice32: false,
    use720p: false,
    window: false,
    usePrinter: true,
    printerPath: '',
    printerFormat: 'jpg',
    printerClear: false,
    useAbleNetWorkConf: [],
    nowUseNetwork: -1,
    nowLocalNetwork: '',
    screenShotPath: '',
    ea: false,
    api: false,
    apiPassword: '',
    enableMSCM: false,
    useAbleSC: [],
    nowUseSC: -1,
    SCPath: './SxLauncher/'
}