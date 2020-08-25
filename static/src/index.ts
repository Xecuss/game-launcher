import { createApp } from 'vue';
import { router } from './router';
import main from './main.vue';
import "./style.css";
import "muicss/dist/css/mui.min.css";
import "muicss/dist/js/mui.min.js";

const App = createApp(main);

App.use(router);

App.mount('#app');