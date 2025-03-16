import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import router from './router'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as Icons from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import "bootstrap"

const app = createApp(App).use(router).use(createPinia()).use(ElementPlus)
for (const [key, component] of Object.entries(Icons)) {
    app.component(key, component)
}
app.mount('#app')