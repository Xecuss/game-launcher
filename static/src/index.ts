import { createApp } from 'vue';
import { router } from './router';
import main from './main.vue';
import "./style.css";

const App = createApp(main);

App.use(router);

App.mount('#app');