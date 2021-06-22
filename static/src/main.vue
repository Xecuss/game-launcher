<template>
    <div id="main-container"  spellcheck="false">
        <top-banner @close="closeApp"/>
        <div class="content">
            <my-nav :configs="configs" @start="start" @add="addConfig"/>
            <router-view @start="start" @delete="delConfig"/>
        </div>
    </div>
</template>
<script lang="ts">
import { provide, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { ChildProcess, exec, spawn } from 'child_process';

import topBanner from './components/topBanner.vue';
import Nav from './components/nav.vue';

import { defaultConf, defaultGameConfig } from './data/defaultConfig';

import { useRunCommand } from './lib/runCommand';
import { readConfigOrDefault, safeCreateDir, writeConf } from './lib/readConfig';
import { closeApp, openMessageBox } from './lib/callSystemAPI';

export default {
    setup(props: any, ctx: any){
        let conf = ref(readConfigOrDefault('./sxLauncher.json', defaultConf));
        let nowSelect = ref(conf.value.lastUseConfig);
        let {
            servCommand,
            runCommand,
        } = useRunCommand(conf, nowSelect);

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

        let localServProcess: ChildProcess | null = null;

        function start(id?: number){
            if(id) nowSelect.value = id;

            conf.value.lastUseConfig = nowSelect.value;
            
            if(servCommand.value){
                localServProcess = spawn(servCommand.value);
            }
            console.log(`run: ${runCommand.value}`);
            exec(runCommand.value, () => {
                //当游戏终止的时候终止离线服务器进程
                if(localServProcess !== null){
                    localServProcess.kill();
                }
            });
        }

        function addConfig(){
            let newConfig = Object.assign({}, defaultGameConfig);
            newConfig.id = new Date().valueOf();
            conf.value.configs.push(newConfig);
        }

        function delConfig(id: number){
            if(conf.value.configs.length <= 1){
                openMessageBox({
                    type: 'error',
                    title: '错误',
                    defaultId: 1,
                    message: '请至少保留一个配置项！'
                });
                return;
            }
            let offset = conf.value.configs.findIndex( x => x.id === id);
            if(offset !== -1) {
                let deleted = conf.value.configs.splice(offset, 1);
                if(conf.value.lastUseConfig === deleted[0].id) {
                    conf.value.lastUseConfig = conf.value.configs[0].id;
                }
            }
        }

        return { 
            configs: conf.value.configs,
            closeApp,
            addConfig,
            delConfig,
            start
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