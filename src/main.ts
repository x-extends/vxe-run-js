import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'

import VxeUI from 'vxe-pc-ui'
import 'vxe-pc-ui/lib/style.css'

import './style/layout.scss'

createApp(App).use(router).use(store).use(i18n).use(VxeUI).mount('#app')
