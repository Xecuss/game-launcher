<template>
    <div class="page">
        <a @click="start" class="start-btn mui-btn mui-btn--raised">Start!</a>
    </div>
</template>
<script lang="ts">
import { inject, Ref } from 'vue';
import { useRunCommand } from '../lib/runCommand';
import { ILauncherConfig } from '../interface/config.interface';
import { exec, ChildProcess, spawn } from 'child_process';

export default {
    setup(){
        let conf = inject<Ref<ILauncherConfig>>('globalConfig');

        if(!conf) return {};

        let {
            servCommand,
            runCommand,
        } = useRunCommand(conf);

        let localServProcess: ChildProcess | null = null;

        function start(){
            if(servCommand.value){
                localServProcess = spawn(servCommand.value);
            }
            exec(runCommand.value, () => {
                //当游戏终止的时候终止离线服务器进程
                if(localServProcess !== null) localServProcess.kill();
            });
        }
        return {
            start
        };
    }
}
</script>
<style scoped>
.page{
    position: relative;
}
.page .start-btn{
    display: block;
    background-color: var(--theme-color-main);
    color: var(--theme-font-white-main);
    position: absolute;
    right: 20px;
    bottom: 20px;
    font-size: 30px;
    cursor: pointer;
    /* border-radius: 2px; */
    height: 80px;
    line-height: 80px;
    /* width: 100px; */
    text-align: center;
}
</style>