import { createApp } from 'vue';
import App from './App.vue';
import store from './store'; // Import the Vuex store
import router from './router'; // Import the Vue Router

const app = createApp(App);

app.use(store); // Register Vuex
app.use(router); // Register Vue Router

app.mount('#app');
