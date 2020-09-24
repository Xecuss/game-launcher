<template>
    <div class="page">
        <a @click="start" class="start-btn mui-btn mui-btn--raised">Start!</a>
    </div>
</template>
<script lang="ts">
import { defineComponent, inject, Ref, ref } from 'vue';
import { useRunCommand } from '../lib/runCommand';
import { ILauncherConfig } from '../interface/config.interface';

export default defineComponent({
    setup({}, ctx){
        function start(){
            ctx.emit('start');
        }
        return {
            start
        };
    }
});
</script>
<style scoped>
.page{
    position: relative;
}
.page .start-btn{
    display: block;
    background-color: var(--theme-color-main);
    color: var(--theme-font-white-main);
    position: absolute;
    right: 20px;
    bottom: 20px;
    font-size: 30px;
    cursor: pointer;
    /* border-radius: 2px; */
    height: 80px;
    line-height: 80px;
    /* width: 100px; */
    text-align: center;
}
</style>