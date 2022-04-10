import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import components from './components'
// 提交测试

const app = createApp(App)
Object.keys(components).forEach(name => {
  app.component(name, (components as any)[name])
})
app.use(router).use(store).use(ElementPlus).mount('#app')
