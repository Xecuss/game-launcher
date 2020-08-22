<template>
    <div id="main-container">
        <top-banner @close="closeApp"/>
        <setting />
    </div>
</template>
<script lang="ts">
import { ref, reactive, computed } from 'vue';
import topBanner from './components/topBanner.vue';
import { ILocalNetwork } from './interface/localNet.interface';
import { getLocalNetwork } from './lib/getLocalNetwork';

import { ipcRenderer } from 'electron';

import Setting from './pages/setting.vue';

export default {
    setup(props: any, ctx: any){
        function closeApp(){
            ipcRenderer.send('close');
        }
        function start(){
        }

        return { 
            closeApp,
            start
        };
    },
    components: {
        topBanner,
        Setting
    }
}
</script>
<style scoped>
#main-container{
    position: absolute;
    width: 100%;
    height: 100%;
    box-shadow: inset 0 0 1px 0 var(--theme-color-main);
    overflow: auto;
    background-image: url('./assets/nianoa.jpg');
    background-size: 100% auto;
    background-position: top center;
}
#main-container .page{
    padding: 10px;
    box-sizing: border-box;
    min-height: calc(100% - 40px);
}
.form-group{
    display: block;
    padding: 10px;
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