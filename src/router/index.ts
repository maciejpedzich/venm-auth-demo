import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

import store from '@/store';
import AuthModuleState from '@/interfaces/states/auth-module';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/login',
    name: 'LogIn',
    component: () => import('../views/LogIn.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const state = store.state.auth as AuthModuleState;
  const isAuthenticated = !!state.access_token && !!state.current_user;

  if (to.name === 'Home' && !isAuthenticated) {
    return next({ name: 'LogIn' });
  } else {
    return next();
  }
});

export default router;
