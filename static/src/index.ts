import { createApp } from 'vue';
import { router } from './router';
import main from './main.vue';
import "muicss/dist/css/mui.min.css";
import "muicss/dist/js/mui.min.js";
import "./style.css";

const App = createApp(main);

App.use(router);

App.mount('#app');