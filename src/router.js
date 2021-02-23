import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Personal from './views/runner/Personal.vue';
import History from './views/runner/History.vue';
import Emergency from './views/runner/Emergency.vue';
import Medical from './views/runner/Medical.vue';
import Souvenir from './views/runner/Souvenir.vue';
import Info_Runing from './views/runner/Info_Runing.vue';
Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
        path: '/Personal',
        component: Personal
    },
    {
      path: '/Medical',
      component: Medical
    },
    {
      path: '/Souvenir',
      component: Souvenir
    },
    {
    path: '/History',
    component: History
    },
    {
      path: '/Emergency',
      component: Emergency
      },
      {
        path: '/Info_Runing',
        component: Info_Runing
        },
    {
      path: '/profile',
      name: 'profile',
      // lazy-loaded
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      // lazy-loaded
      component: () => import('./views/BoardAdmin.vue')
    },
   
    {
      path: '/user',
      name: 'user',
      // lazy-loaded
      component: () => import('./views/BoardUser.vue')
    }
  ]
});