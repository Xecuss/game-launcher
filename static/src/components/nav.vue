<template>
    <div class="nav">
        <div class="config-top">
            <router-link to="/" class="top-btn"><i class="fa fa-home" /></router-link>
            <a class="top-btn" @click="addHandle"><i class="fa fa-plus"/></a>
        </div>
        <div class="config-item" v-for="item in configs" :key="item.id">
            <p class="config-name">{{ item.name }}</p>
            <div class="config-opt">
                <a class="opt-btn" @click="requestStart(item.id)"><i class="fa fa-play"/></a>
                <a class="opt-btn" @click="toSetting(item.id)"><i class="fa fa-cog"/></a>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue"
import { useRouter } from 'vue-router';

export default defineComponent({
    props: {
        configs: Array
    },
    setup({}, ctx){
        const router = useRouter();

        function toSetting(id: number){
            router.push({ 
                path: '/settings',
                query: { id }
            });
        }

        function requestStart(id: number){
            ctx.emit('start', id);
        }

        function addHandle(){
            ctx.emit('add');
        }

        return {
            requestStart,
            toSetting,
            addHandle
        }
    }
});
</script>
<style scoped>
.nav{
    height: 100%;
    background-color: rgba(255, 255, 255, 0.4);
    border-right: 1px solid rgba(0, 0, 0, 0.2);
}
.opt-btn{
    color: rgba(0, 0, 0, 0.8);
    text-decoration: none;
    cursor: pointer;
    margin-left: 10px;
}
.nav .config-top{
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 5px 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.nav .config-top .top-btn{
    color: rgba(0, 0, 0, 0.8);
    cursor: pointer;
}
.nav .nav-item, .nav .config-item{
    display: flex;
    box-sizing: border-box;
    height: 40px;
    color: rgba(0, 0, 0, 0.8);
    text-decoration: none;
    padding: 10px;
    line-height: 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    white-space: nowrap;
    cursor: pointer;
}
.nav .config-item .config-name{
    max-width: 100px;
    min-width: 50px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    vertical-align: top;
    flex-grow: 1;
    text-align: left;
}
</style>