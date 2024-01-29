import { createApp } from 'vue';
import axios from "axios";
import Root from './root.vue';
import router from './router';
import './assets/main.css';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

const app = createApp(Root)

app.use(router)

app.mount('#app')
