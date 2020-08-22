import { createRouter, createWebHistory } from 'vue-router';

import Setting from './pages/setting.vue';
import Home from './pages/home.vue';

const routerHistory = createWebHistory();

export const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: Home
        },
        {
            path: '/settings',
            component: Setting
        }
    ]
});