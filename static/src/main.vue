<template>
    <div id="main-container"  spellcheck="false">
        <top-banner @close="closeApp"/>
        <div class="content">
            <my-nav :configs="configs"/>
            <router-view />
        </div>
    </div>
</template>
<script lang="ts">
import { provide, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import topBanner from './components/topBanner.vue';
import Nav from './components/nav.vue';

import { ILocalNetwork } from './interface/localNet.interface';
import { ILauncherConfig } from './interface/config.interface';
import { defaultConf } from './data/defaultConfig';

import { getLocalNetwork } from './lib/getLocalNetwork';
import { readConfigOrDefault, safeCreateDir, writeConf } from './lib/readConfig';
import { closeApp, getScreens } from './lib/callSystemAPI';

export default {
    setup(props: any, ctx: any){
        let conf = ref(readConfigOrDefault('./sxLauncher.json', defaultConf));

        //注入全局配置
        provide('globalConfig', conf);

        //由于deep watch无法保存对象的旧值，所以手动保存
        let oldEnableMSCM = conf.value.enableMSCM;

        //修改配置自动保存
        watch(conf, (obj) => {
            if(obj) {
                writeConf('./sxLauncher.json', conf.value);
                //当开启多spice配置管理的时候会尝试创建文件夹
                if(!oldEnableMSCM && obj.enableMSCM){
                    safeCreateDir(conf.value.SCPath);
                }
                oldEnableMSCM = conf.value.enableMSCM;
            }
        }, {
            deep: true
        });

        let router = useRouter();

        router.push('/');

        return { 
            configs: conf.value.configs,
            closeApp
        };
    },
    components: {
        topBanner,
        MyNav: Nav
    }
}
</script>
<style scoped>
#main-container{
    position: absolute;
    width: 100%;
    height: 100%;
    box-shadow: inset 0 0 1px 0 var(--theme-color-main);
    overflow: hidden;
    background-image: url('./assets/nianoa.jpg');
    background-size: 100% auto;
    background-position: top center;
}
#main-container .content{
    display: flex;
    height: calc(100% - 40px);
}
#main-container .page{
    padding: 10px;
    box-sizing: border-box;
    flex-grow: 1;
}
.form-group{
    display: block;
    padding: 10px;
    border-bottom: 1px solid  rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
}
.command-prev{
    color: var(--theme-color-main);
}
.start-btn{
    font-size: 30px;
}
</style>