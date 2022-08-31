import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import utils from './plugins/utils'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(utils)

app.mount('#app')
