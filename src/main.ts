import { createApp } from 'vue';
import { vMaska } from 'maska';
import App from './App.vue';
import router from './router';
import { loadFonts } from '@/plugins/webfontloader';
import { vuetify } from '@/plugins/vuetify';
import '@/assets/global-styles.scss';
import '@fortawesome/fontawesome-free/css/all.css';
import { setupCalendar } from 'v-calendar';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

loadFonts();

createApp(App)
  .use(setupCalendar, {})
  .use(router)
  .use(vuetify)
  .use(pinia)
  .directive('maska', vMaska)
  .mount('#app');
