import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import axios from 'axios';


axios.defaults.baseURL = 'http://localhost:8081';

const app = createApp(App);
const pinia = createPinia();


app.use(router)
app.use(pinia)


app.mount('#app')