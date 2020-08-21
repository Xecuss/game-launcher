<template>
    <div class="top-bar">
        <p class="title">Sx Launcher</p>
        <div class="opt-group">
            <span class="btn" @click="close">X</span>
        </div>
    </div>
</template>
<script lang="ts">
export default {
    setup(props: any, ctx: any){
        return {
            close(){
                ctx.emit('close');
            }
        }
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
}
.top-bar .title{
    font-size: 16px;
}
.opt-group .btn{
    display: inline-block;
    cursor: pointer;
    -webkit-app-region: no-drag;
}
</style>