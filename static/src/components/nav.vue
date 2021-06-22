<template>
    <div class="nav">
        <div class="config-top">
            <a class="top-btn" @click="home"><i class="fa fa-home" /></a>
            <a class="top-btn" @click="addHandle"><i class="fa fa-plus"/></a>
        </div>
        <div class="config-item" v-for="item in configs" :key="item.id" :class="{active: nowSelect === item.id}">
            <p class="config-name">{{ item.name }}</p>
            <div class="config-opt">
                <a class="opt-btn" @click="requestStart(item.id)"><i class="fa fa-play"/></a>
                <a class="opt-btn" @click="toSetting(item.id)"><i class="fa fa-cog"/></a>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, Ref, ref } from "vue"
import { useRouter } from 'vue-router';

export default defineComponent({
    props: {
        configs: Array
    },
    setup({}, ctx){
        const router = useRouter();

        let nowSelect: Ref<number> = ref(0);

        async function toSetting(id: number){
            await router.push({ 
                path: '/settings',
                query: { id }
            });
            nowSelect.value = id;
        }

        async function home(){
            await router.push({ 
                path: '/'
            });
            nowSelect.value = 0;
        }

        function requestStart(id: number){
            ctx.emit('start', id);
        }

        function addHandle(){
            ctx.emit('add');
        }

        return {
            nowSelect,
            requestStart,
            toSetting,
            addHandle,
            home
        }
    }
});
</script>
<style scoped>
.nav{
    height: 100%;
    min-width: 100px;
    background-color: rgba(255, 255, 255, 0.4);
    border-right: 1px solid rgba(0, 0, 0, 0.2);
    flex-shrink: 0;
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
.nav .nav-item, .nav .config-item.active{
    background: rgba(0, 0, 0, 0.1);
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