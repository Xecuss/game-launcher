<template>
<div class="page beautify-scroll">
    <div class="mui-panel">
        <p>命令预览：</p>
        <p class="command-prev">{{ runCommand }}</p>
    </div>

    <p class="block-title">显示</p>
    <div class="mui-panel">
        <div class="mui-checkbox">
            <label>
                <input type="checkbox" v-model="useConf.use720p"> 强制720p分辨率
            </label>
        </div>
        <div class="mui-checkbox">
            <label>
                <input type="checkbox" v-model="useConf.window"> 窗口模式
            </label>
        </div>
    </div>

    <p class="block-title">网络</p>
    <div class="mui-panel">
        <div>
        <div class="mui-select my-select">
            <select v-model="nowLocalNetwork">
                <option 
                v-for="item in localNetworks" 
                :key="item.name"
                :value="item">
                    {{ item.name }}
                </option>
            </select>
            <label>好友网络</label>
        </div>
        </div>
        <div>
        <div class="mui-select my-select">
            <select v-model="useConf.nowUseNetwork">
                <option :value="-1">使用ea3(默认)</option>
                <option 
                v-for="item in conf.useAbleNetWorkConf" 
                :key="item.id"
                :value="item.id">
                    {{ item.name || '无标题' }}
                </option>
            </select>
            <label>外部网络</label>
        </div>
        <router-link to="/networks" class="mui-btn mui-btn--raised mui-btn--primary" style="margin-left: 20px;">管理网络</router-link>
        </div>
    </div>

    <p class="block-title">spice</p>
    <div class="mui-panel">
        <div class="mui-checkbox">
            <label>
                <input type="checkbox" v-model="conf.enableMSCM"> 启用多Spice配置管理
            </label>
        </div>
        <template v-if="conf.enableMSCM">
        <div>
        <div class="mui-select my-select">
            <select v-model="useConf.nowUseSC">
                <option :value="-1">使用默认</option>
                <option 
                v-for="item in conf.useAbleSC" 
                :key="item.id"
                :value="item.id">
                    {{ item.name || '无标题' }}
                </option>
            </select>
            <label>外部网络</label>
        </div>
        <router-link to="/mscm" class="mui-btn mui-btn--raised mui-btn--primary" style="margin-left: 20px;">管理配置</router-link>
        </div>
        </template>
    </div>

    <p class="block-title">杂项</p>
    <div class="mui-panel">
        <div class="mui-checkbox">
            <label>
                <input type="checkbox" v-model="useConf.useSpice32"> 使用32位spice(四代及以下勾选)
            </label>
        </div>
        <div class="mui-checkbox">
            <label>
                <input type="checkbox" v-model="useConf.usePrinter"> 模拟印卡机
            </label>
        </div>
        <div class="mui-textfield mui-textfield--float-label">
            <input type="text" v-model="useConf.name">
            <label>配置名称</label>
        </div>
        <template v-if="useConf.usePrinter">
        <div class="mui-textfield mui-textfield--float-label">
            <input type="text" v-model="useConf.printerPath" @click="focusHandle()" ref="cardSaveInput">
            <label>模拟印卡机保存位置</label>
        </div>
        </template>
    </div>
    <div class="action-btn-group">
        <button class="mui-btn mui-btn--raised mui-btn--danger" @click="deleteHandle"><i class="fa fa-trash-o"/> 删除此配置</button>
        <button class="mui-btn mui-btn--raised mui-btn--primary" @click="createBatchFile">生成批处理</button>
    </div>
</div>
</template>
<script lang="ts">
import { ref, reactive, computed, inject, watchEffect, Ref, defineComponent } from 'vue';
import { useRouter, onBeforeRouteUpdate } from 'vue-router';
import { ILocalNetwork } from '../interface/localNet.interface';
import { getLocalNetwork } from '../lib/getLocalNetwork';
import { exec } from 'child_process';
import { IGameConfig, ILauncherConfig } from '../interface/config.interface';
import { useRunCommand } from '../lib/runCommand';
import { openFileDialog, openMessageBox } from '../lib/callSystemAPI';
import { promises as fs } from 'fs';

export default defineComponent({
    setup(props, ctx){
        let conf = inject<Ref<ILauncherConfig>>('globalConfig');
        const router = useRouter();

        if(!conf) return {};

        let nowSelect: Ref<number> = ref(Number(router.currentRoute.value.query.id));

        let {
            runCommand,
            localNetworks,
            nowLocalNetwork,
            useConf
        } = useRunCommand(conf, nowSelect);
        let cardSaveInput: Ref<null | HTMLElement> = ref(null);

        watchEffect(() => {
            if(conf) useConf.value.nowLocalNetwork = nowLocalNetwork.value.name;
        });

        onBeforeRouteUpdate((to, from) => {
            nowSelect.value = Number(to.query.id);
        });

        async function focusHandle(){
            let file = await openFileDialog({
                title: '选择保存未知',
                properties: ['openDirectory'],
                filters: [
                    { name: '可执行文件', extensions: ['*.exe'] }
                ]
            });
            if(file){
                useConf.value.printerPath = file;
                if(cardSaveInput.value !== null) {
                    cardSaveInput.value.classList.remove('mui--is-empty');
                    cardSaveInput.value.classList.add('mui--is-not-empty');
                }
            }
        }

        async function deleteHandle(){
            let res = await openMessageBox({
                type: 'warning',
                title: '警告',
                defaultId: 1,
                message: `确定要删除配置[${useConf.value.name}]吗？您将会失去该配置项`,
                buttons: ['取消', '确定']
            });
            if(res === 1) ctx.emit('delete', useConf.value.id);
        }

        async function createBatchFile(){
            let command = '@echo "create by sxLauncher :)"\n';
            command += `${ runCommand.value }\n`;

            let fix = new Date().toLocaleString().slice(-2);
            let fileName = `./start-${useConf.value.name}-${fix}.bat`;

            await fs.writeFile(fileName, command);

            await openMessageBox({
                type: 'info',
                title: '生成批处理',
                defaultId: 0,
                message: `已生成批处理[${fileName}]`,
                buttons: ['确定']
            });
        }

        return { 
            conf,
            useConf,
            cardSaveInput,
            localNetworks,
            nowLocalNetwork,
            runCommand,
            focusHandle,
            deleteHandle,
            createBatchFile
        };
    }
})
</script>
<style scoped>
.page{
    background-color: rgba(255, 255, 255, 0.4);
    overflow: auto;
}
.mui-select.my-select{
    display: inline-block;
}
</style>