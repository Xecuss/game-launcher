import { computed, Ref, ref } from 'vue';
import { ILauncherConfig } from '../interface/config.interface';
import { getLocalNetwork } from './getLocalNetwork';
import { defaultGameConfig } from '../data/defaultConfig';
import { ILocalNetwork } from '../interface/localNet.interface';


export function useRunCommand(conf: Ref<ILauncherConfig>, selectConf?: Ref<number>) {
    let localNetworks: Ref<ILocalNetwork[]> = ref([]);
    let useConf = computed(() => {
        let trueSelect = selectConf || ref(conf.value.lastUseConfig);
        return conf.value.configs.find( x => x.id === trueSelect.value) || conf.value.configs[0] || defaultGameConfig;
    });

    async function refreshLocalNetwork(){
        let res = await getLocalNetwork();
        localNetworks.value = res;
    }

    refreshLocalNetwork();

    let runCommand = computed(() => {
        let res = 'spice64';
        if(useConf.value.useSpice32) res = 'spice';
        if(useConf.value.use720p) res += ` -sdvx720`;
        if(useConf.value.window) res += ` -w`;
        if(useConf.value.usePrinter){
            res += ' -printer';
            if(useConf.value.printerPath) res += ` -printerath ${useConf.value.printerPath}`;
        }
        if(useConf.value.card) res += ` -card0 ${useConf.value.card}`;
        //外部网络
        let network = conf.value.useAbleNetWorkConf.find( x => x.id === useConf.value.nowUseNetwork);
        if(network !== undefined){
            if(network.url) res += ` -url ${network.url}`;
            res += network.urlSlash ? ' -urlslash 1' : ' -urlslash 0';
            res += network.http11 ? ' -http11 1' : ' -http11 0';
            if(network.pcbId) res += ` -p ${network.pcbId}`;
        }
        //好友网络
        let nowLocalNetwork = localNetworks.value[0];
        for(let item of localNetworks.value){
            if(item.name === useConf.value.nowLocalNetwork){
                nowLocalNetwork = item;
            }
        }
        if(nowLocalNetwork && nowLocalNetwork.v4){
            let v4 = nowLocalNetwork.v4;
            res += ` -network ${v4.address}`;
            res += ` -subnet ${v4.netmask}`;
        }
        //多spice配置
        let sc = conf.value.useAbleSC.find( x => x.id === useConf.value.nowUseSC);
        if(sc){
            res += ` -cfgpath ${sc.filename}`;
        }
        return res;
    });

    let servCommand = computed(() => {
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
        useConf,
        refreshLocalNetwork
    }
}