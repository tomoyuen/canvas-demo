import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
});

new Vue({
  router,
  render (h) {
    return h('router-view', {
      attrs: {
        id: 'app'
      },
    });
  }
}).$mount('#app');
