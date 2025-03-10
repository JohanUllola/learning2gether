import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './styles/sidebar.scss';
import './styles/main.scss';
//import './styles/rules.scss';


const app = createApp(App);
const pinia = createPinia();

app.use(pinia);app.use(router);

app.mount('#app');

// Después de montar la aplicación, accede al store y carga el estado del modo oscuro
import { useConfigStore } from './stores/configStore';
const configStore = useConfigStore(pinia);
configStore.loadDarkMode();