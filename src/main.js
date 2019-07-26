import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import Cookies from 'js-cookie';
import { i18n } from '@/plugins/i18n';
import { translation } from './plugins/translation';

Vue.config.productionTip = false;

Vue.prototype.$i18nRoute = translation.i18nRoute.bind(translation);
Vue.prototype.$http = axios;

const accessToken = Cookies.get('access_token');
if (accessToken) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = accessToken;
}

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
