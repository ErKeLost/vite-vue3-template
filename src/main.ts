import { createApp } from 'vue'
import App from './App.vue'
// 用来注入 Windi CSS 所需的样式，一定要加上！
import 'virtual:windi.css'
createApp(App).mount('#app')
