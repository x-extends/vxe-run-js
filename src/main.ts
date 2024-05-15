import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VxeUI from 'vxe-pc-ui'

import '@/assets/style.scss'
import 'vxe-pc-ui/lib/style.css'

createApp(App).use(router).use(store).use(VxeUI).mount('#app')
