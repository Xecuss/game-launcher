<template>
    <div class="page">
        <a @click="start" class="start-btn">Start!</a>
    </div>
</template>
<script lang="ts">
import { inject, Ref } from 'vue';
import { useRunCommand } from '../lib/runCommand';
import { ILauncherConfig } from '../interface/config.interface';
import { exec } from 'child_process';

export default {
    setup(){
        let conf = inject<Ref<ILauncherConfig>>('globalConfig');

        if(!conf) return {};

        let {
            runCommand,
        } = useRunCommand(conf);

        function start(){
            exec(runCommand.value);
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
    box-sizing: border-box;
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 20px;
    font-size: 30px;
    cursor: pointer;
    border-radius: 2px;
    box-shadow: var(--theme-shadow-depth8);
}
</style>