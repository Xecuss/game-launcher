<template>
<div class="page">
    <div class="block">
    <label class="form-group">
        <input type="checkbox" v-model="use720"> 强制720p分辨率
    </label>
    <label class="form-group">
        <input type="checkbox" v-model="windowMode"> 窗口模式
    </label>
    <label class="form-group">
        加入网络 
        <select v-model="nowLocalNetwork">
            <option 
            v-for="item in localNetworks" 
            :key="item.name"
            :value="item">
                {{ item.name }}
            </option>
        </select>
    </label>
    <label class="form-group">
        <p>命令预览：</p>
        <p class="command-prev">{{ runCommand }}</p>
    </label>
    <label class="form-group">
        <button @click="start" class="start-btn">Start!</button>
    </label>
    </div>
</div>
</template>
<script lang="ts">
import { ref, reactive, computed } from 'vue';
import { ILocalNetwork } from '../interface/localNet.interface';
import { getLocalNetwork } from '../lib/getLocalNetwork';
import { exec } from 'child_process';

export default {
    setup(props: any, ctx: any){
        let use720 = ref(false);
        let windowMode = ref(false);
        let localNetworks: Array<ILocalNetwork> = reactive<ILocalNetwork[]>(getLocalNetwork());
        let nowLocalNetwork = ref(localNetworks[0]);

        function start(){
            exec(runCommand.value);
        }

        let runCommand = computed(() => {
            let res = 'spice64';
            if(use720.value) res += ` -sdvx720`;
            if(windowMode.value) res += ` -w`;
            if(nowLocalNetwork && nowLocalNetwork.value.v4){
                let v4 = nowLocalNetwork.value.v4;
                res += ` -network ${v4.address}`;
                res += ` -subnet ${v4.netmask}`;
            }
            return res;
        });

        return { 
            use720, 
            windowMode,
            localNetworks,
            nowLocalNetwork,
            runCommand,
            start
        };
    }
}
</script>
<style scoped>
.page{
    background-color: rgba(255, 255, 255, 0.4);
}
.block{
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