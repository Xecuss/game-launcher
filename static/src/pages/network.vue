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
                <div>
                <a class="mui-btn mui-btn--danger mui-btn--raised" @click="del(item)">删除</a>
                </div>
            </div>
        </div>
        <a @click="add" class="add-btn mui-btn mui-btn--fab">+</a>
    </div>
</template>
<script lang="ts">
import { inject, Ref } from 'vue'
import { useRouter } from 'vue-router';
import { ILauncherConfig, INetworkConfig } from '../interface/config.interface';

export default {
    setup(){
        let conf = inject<Ref<ILauncherConfig>>('globalConfig');
        if(!conf) return {};

        let networks = conf.value.useAbleNetWorkConf;

        let router = useRouter();

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

        function back(){
            router.back();
        }
        function del(item: INetworkConfig){
            let idx = networks.findIndex(x => x === item);
            if(idx !== -1){
                let res = networks.splice(idx, 1);
                if(conf && conf.value.nowUseNetwork === res[0].id){
                    conf.value.nowUseNetwork = -1;
                }
            }
        }

        return {
            networks,
            add,
            back,
            del
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
    right: 10px;
    bottom: 10px;
    background-color: var(--theme-color-main);
    text-align: center;
    color: var(--theme-font-white-main);
    cursor: pointer;
}
</style>