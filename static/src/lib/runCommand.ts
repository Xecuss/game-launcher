import { computed, watchEffect, Ref, ref } from 'vue';
import { ILauncherConfig } from '../interface/config.interface';
import { getLocalNetwork } from './getLocalNetwork';
import { defaultGameConfig } from '../data/defaultConfig';


export function useRunCommand(conf: Ref<ILauncherConfig>, selectConf: Ref<number>) {
    let localNetworks = ref(getLocalNetwork());
    let nowLocalNetwork = ref(localNetworks.value[0]);
    let useConf = computed(() => {
        return conf.value.configs.find( x => x.id === selectConf.value) || conf.value.configs[0] || defaultGameConfig;
    })

    for(let item of localNetworks.value){
        if(item.name === useConf.value.nowLocalNetwork){
            nowLocalNetwork = ref(item);
        }
    }

    let runCommand = computed(() => {
        let res = 'spice64';
        if(useConf.value.useSpice32) res = 'spice';
        if(useConf.value.use720p) res += ` -sdvx720`;
        if(useConf.value.window) res += ` -w`;
        if(useConf.value.usePrinter){
            res += ' -printer';
            if(useConf.value.printerPath) res += ` -printerath ${useConf.value.printerPath}`;
        }
        let network = conf.value.useAbleNetWorkConf.find( x => x.id === useConf.value.nowUseNetwork);
        if(network !== undefined){
            if(network.url) res += ` -url ${network.url}`;
            res += network.urlSlash ? ' -urlslash 1' : ' -urlslash 0';
            res += network.http11 ? ' -http11 1' : ' -http11 0';
            if(network.pcbId) res += ` -p ${network.pcbId}`;
        }
        if(nowLocalNetwork && nowLocalNetwork.value.v4){
            let v4 = nowLocalNetwork.value.v4;
            res += ` -network ${v4.address}`;
            res += ` -subnet ${v4.netmask}`;
        }
        let sc = conf.value.useAbleSC.find( x => x.id === useConf.value.nowUseSC);
        if(sc){
            res += ` -cfgpath ${sc.filename}`;
        }
        return res;
    });

    let servCommand = computed( () => {
        let network = conf.value.useAbleNetWorkConf.find( x => x.id === useConf.value.nowUseNetwork);

        if(network?.localServCommand){
            return network.localServCommand;
        }

        return '';
    });

    return {
        servCommand,
        runCommand,
        localNetworks,
        nowLocalNetwork,
        useConf
    }
}