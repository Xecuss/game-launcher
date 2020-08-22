<template>
    <div class="nav">
        <router-link to="/" class="nav-item">首 页</router-link>
        <router-link to="/settings" class="nav-item">设 置</router-link>
    </div>
</template>
<script lang="ts">
export default{
    setup(){
        return {}
    }
}
</script>
<style scoped>
.nav{
    height: 100%;
    background-color: rgba(255, 255, 255, 0.4);
    border-right: 1px solid rgba(0, 0, 0, 0.2);
}
.nav .nav-item{
    display: block;
    box-sizing: border-box;
    height: 40px;
    color: rgba(0, 0, 0, 0.8);
    text-decoration: none;
    padding: 10px;
    line-height: 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
</style>