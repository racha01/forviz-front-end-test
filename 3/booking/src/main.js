import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import { format, differenceInDays, endOfWeek } from 'date-fns';

const app = createApp(App)
app.use(endOfWeek)
app.use(router)
app.mount('#app')

