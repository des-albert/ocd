import Vue from 'vue';
import VueRouter from 'vue-router';
import e1000 from '../components/e1000.vue';
import shasta from '../components/shasta.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/e1000',
    name: 'e1000',
    component: e1000
  },
  {
    path: '/shasta',
    name: 'shasta',
    component: shasta
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
