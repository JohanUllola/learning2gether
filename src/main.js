import { createApp } from 'vue';
import {createPinia} from 'pinia';
import App from './App.vue';
import router from './router';


//import './styles/main.scss';
//import './styles/rules.scss';



createApp(App).use(router).use(createPinia()).mount('#app')
