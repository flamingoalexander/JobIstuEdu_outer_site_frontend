import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import router from './router'


 import { createPinia } from 'pinia'
 import 'bootstrap/dist/css/bootstrap.css'
 import 'bootstrap-vue/dist/bootstrap-vue.css'
 import 'bootstrap-icons/font/bootstrap-icons.css'
 import "bootstrap"

createApp(App).use(router).use(createPinia()).mount('#app')