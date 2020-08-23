<template>
    <div class="page">
        <a @click="back" class="back-btn">返回</a>
        <div v-for="item in networks" :key="item.id">
            <p class="block-title">{{ item.name || '无标题' }}</p>
            <div class="block">
                <label class="form-group">
                    配置名称 <input type="text" v-model="item.name" placeholder="配置名称">
                </label>
                <label class="form-group">
                    URL <input type="text" v-model="item.url" placeholder="ID">
                </label>
                <label class="form-group">
                    PCBID <input type="text" v-model="item.pcbId" placeholder="ID">
                </label>
                <label class="form-group">
                    <input type="checkbox" v-model="item.http11"> HTTP11
                </label>
                <label class="form-group">
                    <input type="checkbox" v-model="item.urlSlash"> Url Slash
                </label>
                <label class="form-group">
                    <button @click="del(item)">删除</button>
                </label>
            </div>
        </div>
        <a @click="add" class="add-btn">+</a>
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
    border-radius: 25px;
    box-shadow: var(--theme-shadow-depth8);
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