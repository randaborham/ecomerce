import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/tailwind.css';
import 'vue-toastification/dist/index.css';
import store from './store';
import ToastPlugin from 'vue-toast-notification';
// Import one of the available themes
import 'vue-toast-notification/dist/theme-bootstrap.css';



const vueapp = createApp(App);

vueapp
  .use(router)
  .use(store)
  .use(ToastPlugin)  // تم تصحيح استخدام ToastPlugin هنا
  .mount('#app');




