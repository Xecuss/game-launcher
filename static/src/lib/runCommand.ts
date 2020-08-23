import { computed, Ref, ref } from 'vue';
import { ILauncherConfig } from '../interface/config.interface';
import { getLocalNetwork } from './getLocalNetwork';


export function useRunCommand(conf: Ref<ILauncherConfig>) {
    let localNetworks = ref(getLocalNetwork());
    let nowLocalNetwork = ref(localNetworks.value[0]);

    for(let item of localNetworks.value){
        if(item.name === conf.value.nowLocalNetwork){
            nowLocalNetwork = ref(item);
        }
    }

    let runCommand = computed(() => {
        if(!conf) return '';

        let res = 'spice64';
        if(conf.value.use720p) res += ` -sdvx720`;
        if(conf.value.window) res += ` -w`;
        if(conf.value.usePrinter){
            res += ' -printer';
            if(conf.value.printerPath) res += ` -printerath ${conf.value.printerPath}`;
        }
        let network = conf.value.useAbleNetWorkConf.find( x => x.id === conf.value.nowUseNetwork);
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
        return res;
    });

    return {
        runCommand,
        localNetworks,
        nowLocalNetwork
    }
}