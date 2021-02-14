import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import initAxios from './utils/init-axios';

initAxios();

createApp(App)
  .use(store)
  .use(router)
  .mount('#app');
