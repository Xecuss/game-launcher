<template>
    <div class="nav">
        <!--<router-link to="/" class="nav-item"><i class="fa fa-home" /> 首页</router-link>
        <router-link to="/settings" class="nav-item"><i class="fa fa-cog"/> 设置</router-link>-->
        <div class="config-item" v-for="item in configs" :key="item.id">
            {{ item.name }}
            <a class="opt-btn" @click="requestStart(item.id)"><i class="fa fa-play"/></a>
            <a class="opt-btn" @click="toSetting(item.id)"><i class="fa fa-cog"/></a>
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
            router.push(`/settings?id=${id}`);
        }

        function requestStart(id: number){
            ctx.emit('start', id);
        }
        return {
            requestStart,
            toSetting
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
.nav .nav-item, .nav .config-item{
    display: block;
    box-sizing: border-box;
    height: 40px;
    color: rgba(0, 0, 0, 0.8);
    text-decoration: none;
    padding: 10px;
    line-height: 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    text-align: center;
    white-space: nowrap;
}
</style>