import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { makeServer } from './server';

Vue.config.productionTip = false;

if (process.env.NODE_ENV === 'development') {
  makeServer();
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
