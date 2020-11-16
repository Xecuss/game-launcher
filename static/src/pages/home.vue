<template>
    <div class="page">
        <a @click="start" class="start-btn mui-btn mui-btn--raised">
            <p>Start!</p>
            <p class="config-name" v-if="name">[{{name}}]</p>
        </a>
    </div>
</template>
<script lang="ts">
import { defineComponent, inject, Ref, ref, computed } from 'vue';
import { useRunCommand } from '../lib/runCommand';
import { ILauncherConfig } from '../interface/config.interface';

export default defineComponent({
    setup({}, ctx){
        let conf = inject<Ref<ILauncherConfig>>('globalConfig');

        if(!conf) return {};

        let { useConf } = useRunCommand(conf);

        let name = computed(() => {
            return useConf.value.name;
        });
        
        function start(){
            ctx.emit('start');
        }
        return {
            name,
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
    display: flex;
    background-color: var(--theme-color-main);
    color: var(--theme-font-white-main);
    position: absolute;
    right: 20px;
    bottom: 20px;
    font-size: 30px;
    cursor: pointer;
    height: 80px;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    max-width: 120px;
}
.start-btn .config-name{
    line-height: 13px;
    font-size: 12px;
    color: var(--theme-font-white-second);
    text-transform: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>