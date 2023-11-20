import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from "axios";

import './assets/main.css';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

const app = createApp(App)

app.use(router)

app.mount('#app')
