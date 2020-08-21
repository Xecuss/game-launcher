<template>
    <div id="main-container">
        <top-banner @close="closeApp"/>
        <label>
            <input type="checkbox" :checked="use720">强制720p分辨率
        </label>
        <label>
            <input type="checkbox" :checked="windowMode">窗口模式
        </label>
    </div>
</template>
<script lang="ts">
import { ref } from 'vue';
import topBanner from './components/topBanner.vue';

import { ipcRenderer } from 'electron';

export default {
    setup(props: any, ctx: any){
        let use720 = ref(false);
        let windowMode = ref(false);

        function closeApp(){
            console.log('close!');
            ipcRenderer.send('close');
        }

        return { 
            use720, 
            windowMode,
            closeApp
        };
    },
    components: {
        topBanner
    }
}
</script>
<style scoped>
#main-container{
    position: absolute;
    width: 100%;
    height: 100%;
    box-shadow: inset 0 0 1px 0 var(--theme-color-main);
}
</style>