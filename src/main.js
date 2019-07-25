import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Axios from 'axios';
import Cookies from 'js-cookie';

Vue.config.productionTip = false;
Vue.prototype.$http = Axios;
const accessToken = Cookies.get('access_token');

if (accessToken) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = accessToken;
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
