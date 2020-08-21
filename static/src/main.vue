<template>
    <div id="main-container">
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

export default {
    setup(){
        let use720 = ref(false);
        let windowMode = ref(false);

        return { 
            use720, 
            windowMode 
        };
    }
}
</script>
<style scoped>
#main-container{
    position: absolute;
    width: 100%;
    height: 100%;
}
</style>