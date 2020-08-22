<template>
<div class="page">
    <div class="block">
        <label class="form-group">
            <p>命令预览：</p>
            <p class="command-prev">{{ runCommand }}</p>
        </label>
    </div>

    <p class="block-title">显示</p>
    <div class="block">
        <label class="form-group">
            <input type="checkbox" v-model="conf.use720p"> 强制720p分辨率
        </label>
        <label class="form-group">
            <input type="checkbox" v-model="conf.window"> 窗口模式
        </label>
    </div>

    <p class="block-title">网络</p>
    <div class="block">
        <label class="form-group">
            好友网络 
            <select v-model="nowLocalNetwork">
                <option 
                v-for="item in localNetworks" 
                :key="item.name"
                :value="item">
                    {{ item.name }}
                </option>
            </select>
        </label>
    </div>

    <p class="block-title">杂项</p>
    <div class="block">
        <label class="form-group">
            <input type="checkbox" v-model="conf.usePrinter"> 模拟印卡机
        </label>
        <template v-if="conf.usePrinter">
        <label class="form-group">
            <input type="text" v-model="conf.printerPath" placeholder="模拟印卡机保存位置">
        </label>
        </template>
    </div>
</div>
</template>
<script lang="ts">
import { ref, reactive, computed, inject, watchEffect, Ref } from 'vue';
import { ILocalNetwork } from '../interface/localNet.interface';
import { getLocalNetwork } from '../lib/getLocalNetwork';
import { exec } from 'child_process';
import { ILauncherConfig } from '../interface/config.interface';
import { useRunCommand } from '../lib/runCommand';

export default {
    setup(props: any, ctx: any){
        let conf = inject<Ref<ILauncherConfig>>('globalConfig');

        if(!conf) return {};

        let {
            runCommand,
            localNetworks,
            nowLocalNetwork
        } = useRunCommand(conf);

        watchEffect(() => {
            if(conf) conf.value.nowLocalNetwork = nowLocalNetwork.value.name;
        });

        return { 
            conf,
            localNetworks,
            nowLocalNetwork,
            runCommand
        };
    }
}
</script>
<style scoped>
.page{
    background-color: rgba(255, 255, 255, 0.4);
    overflow: auto;
}
.block{
    margin: 10px;
}
.block-title{
    font-size: 16px;
    color: rgba(0, 0, 0, 0.7);
    margin: 10px;
}
.form-group{
    display: block;
    padding: 15px 10px;
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