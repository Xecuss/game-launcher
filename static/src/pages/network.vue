<template>
    <div class="page">
        <a @click="back" class="back-btn"><i class="fa fa-arrow-left"/> 返回</a>
        <div v-for="item in networks" :key="item.id">
            <p class="block-title">{{ item.name || '无标题' }}</p>
            <div class="mui-panel">
                <div class="mui-textfield mui-textfield--float-label">
                    <input type="text" v-model="item.name">
                    <label>配置名称</label>
                </div>
                <div class="mui-textfield mui-textfield--float-label">
                    <input type="text" v-model="item.url">
                    <label>URL</label>
                </div>
                <div class="mui-textfield mui-textfield--float-label">
                    <input type="text" v-model="item.pcbId">
                    <label>PCBID</label>
                </div>
                <div class="mui-checkbox">
                    <label>
                        <input type="checkbox" v-model="item.http11"> HTTP11
                    </label>
                </div>
                <div class="mui-checkbox">
                    <label>
                    <input type="checkbox" v-model="item.urlSlash"> Url Slash
                    </label>
                </div>
                <div class="mui-textfield mui-textfield--float-label" v-if="isLocal(item)">
                    <input type="text" v-model="item.localServCommand" @click="focusHandle(item)" ref="localServInput">
                    <label>离线服务器位置</label>
                </div>
                <div>
                <a class="mui-btn mui-btn--danger mui-btn--raised" @click="del(item)">删除</a>
                </div>
            </div>
        </div>
        <a @click="add" class="add-btn mui-btn mui-btn--fab"><i class="fa fa-plus"/></a>
    </div>
</template>
<script lang="ts">
import { inject, Ref, computed, ref } from 'vue'
import { useRouter } from 'vue-router';
import { ILauncherConfig, INetworkConfig } from '../interface/config.interface';
import { openFileDialog } from '../lib/callSystemAPI';

const localReg = /https?\:\/\/(localhost|127\.0\.0\.1)/;

export default {
    setup(){
        let conf = inject<Ref<ILauncherConfig>>('globalConfig');
        if(!conf) return {};

        let networks = conf.value.useAbleNetWorkConf;

        let router = useRouter();

        let localServInput: Ref<HTMLElement | null> = ref(null);

        function add(){
            let temp: INetworkConfig = {
                id: new Date().valueOf(),
                url: '',
                pcbId: '',
                urlSlash: false,
                http11: false,
                name: ''
            };
            networks.push(temp);
        }

        async function focusHandle(item: INetworkConfig){
            let file = await openFileDialog({
                title: '选择离线服务器文件',
                properties: ['openFile'],
                filters: [
                    { name: '可执行文件', extensions: ['*.exe'] }
                ]
            });
            console.log(file);
            if(file){
                item.localServCommand = file;
                if(localServInput.value !== null) {
                    localServInput.value.classList.remove('mui--is-empty');
                    localServInput.value.classList.add('mui--is-not-empty');
                }
            }
        }

        function isLocal(item: INetworkConfig): boolean{
            let res = localReg.test(item.url);
            if(!res && item.localServCommand !== undefined){
                item.localServCommand = '';
            }
            return res;
        }

        function back(){
            router.back();
        }
        function del(item: INetworkConfig){
            let idx = networks.findIndex(x => x === item);
            if(idx !== -1){
                let res = networks.splice(idx, 1);

                if(!conf) return;

                for(let innerConf of conf.value.configs){
                    if(innerConf.nowUseNetwork === res[0].id){
                        innerConf.nowUseNetwork = -1;
                    }
                }
            }
        }

        return {
            networks,
            localServInput,
            add,
            back,
            del,
            isLocal,
            focusHandle
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