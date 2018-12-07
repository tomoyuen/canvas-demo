/* eslint no-new: off */
import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
});

const root = Vue.component('root', {
  template: '<router-view id="app"></router-view>',
});

new Vue({
  router,
  render: h => h(root),
}).$mount('#app');
