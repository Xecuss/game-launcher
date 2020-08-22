<template>
    <div class="top-bar">
        <p class="title">Sx Launcher</p>
        <div class="opt-group">
            <span class="btn" @click="callClose">×</span>
        </div>
    </div>
</template>
<script lang="ts">
import { SetupContext } from 'vue';

export default {
    setup(props: any, { emit }: SetupContext){

        function callClose(){
            emit('close');
        }

        return {
            callClose
        };
    }
}

</script>
<style scoped>
.top-bar{
    width: 100%;
    display: flex;
    height: 40px;
    background-color: var(--theme-color-main);
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 20px;
    color: var(--theme-font-white-main);
    -webkit-app-region: drag;
}
.top-bar .title{
    font-size: 16px;
}
.opt-group .btn{
    display: inline-block;
    cursor: pointer;
    -webkit-app-region: no-drag;
    font-size: 30px;
    font-weight: 100;
}
</style>