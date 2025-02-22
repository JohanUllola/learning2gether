import { createApp } from 'vue';
import {createPinia} from 'pinia';
import App from './App.vue';
import router from './router';


//import './styles/rules.scss';
//import './styles/variables.scss';



createApp(App).use(router).use(createPinia()).mount('#app')
