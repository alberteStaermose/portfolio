import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import HomeView from './views/HomeView.vue'
import ProjectView from './views/ProjectView.vue'
import './styles/main.css'
const router = createRouter({ history: createWebHistory(), routes: [{ path: '/', component: HomeView }, { path: '/projekter/:slug', component: ProjectView }, { path: '/:pathMatch(.*)*', redirect: '/' }], scrollBehavior: () => ({ top: 0 }) })
createApp(App).use(router).mount('#app')
