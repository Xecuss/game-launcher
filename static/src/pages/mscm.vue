<template>
    <div class="page">
        <a @click="back" class="back-btn"><i class="fa fa-arrow-left"/> 返回</a>
        <div v-for="item in spiceConfigs" :key="item.id">
            <p class="block-title">{{ item.name || '无标题' }}</p>
            <div class="mui-panel">
                <div class="mui-textfield mui-textfield--float-label">
                    <input type="text" v-model="item.name">
                    <label>配置名称</label>
                </div>
                <div>
                <a class="mui-btn mui-btn--primary mui-btn--raised .mui-form--inline" @click="spiceSetConfig(item)">配置</a>
                <a class="mui-btn mui-btn--danger mui-btn--raised .mui-form--inline" @click="del(item)">删除</a>
                </div>
            </div>
        </div>
        <a @click="add" class="add-btn mui-btn mui-btn--fab"><i class="fa fa-plus"/></a>
    </div>
</template>
<script lang="ts">
import { inject, Ref } from 'vue'
import { useRouter } from 'vue-router';
import { ILauncherConfig, ISpiceConfig } from '../interface/config.interface';
import { safeReadSC } from '../lib/readConfig';
import { exec } from 'child_process';

const localReg = /https?\:\/\/(localhost|127\.0\.0\.1)/;

export default {
    setup(){
        let conf = inject<Ref<ILauncherConfig>>('globalConfig');
        if(!conf) return {};

        let spiceConfigs = conf.value.useAbleSC;

        let router = useRouter();

        function add(){
            if(!conf) return;

            //利用精确到毫秒的时间戳当id，重复概率极小
            let id = new Date().valueOf();
            let temp: ISpiceConfig = {
                id,
                name: '',
                filename: `${conf.value.SCPath}${id}.xml`
            };
            spiceConfigs.push(temp);
        }

        function back(){
            router.back();
        }
        function del(item: ISpiceConfig){
            let idx = spiceConfigs.findIndex(x => x === item);
            if(idx !== -1){
                let res = spiceConfigs.splice(idx, 1);

                if(!conf) return;

                for(let innerConf of conf.value.configs){
                    if(innerConf.nowUseSC === res[0].id){
                        innerConf.nowUseSC = -1;
                    }
                }
            }
        }

        function spiceSetConfig(item: ISpiceConfig){
            let cmdName = 'spice64';
            exec(`${cmdName} -cfg -cfgpath ${safeReadSC(item.filename)}`);
        }

        return {
            spiceConfigs,
            add,
            back,
            del,
            spiceSetConfig
        }
    }
}
</script>
<style scoped>
.page{
    background-color: rgba(255, 255, 255, 0.4);
    overflow: auto;
}
.page .back-btn{
    margin: 10px;
    cursor: pointer;
    text-decoration: none;
    color: black;
}
.page .add-btn{
    position: fixed;
    display: block;
    width: 50px;
    height: 50px;
    line-height: 50px;
    font-size: 30px;
    font-weight: 100;
    right: 20px;
    bottom: 20px;
    background-color: var(--theme-color-main);
    text-align: center;
    color: var(--theme-font-white-main);
    cursor: pointer;
    -webkit-text-stroke: 5px var(--theme-color-main);
    padding-top: 2px;
    padding-left: 2px;
    box-sizing: border-box;
}
</style>