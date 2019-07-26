import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';
import store from '@/store';
import { DEFAULT_LANGUAGE } from '@/constants/trans';

Vue.use(Router);

const router = new Router({
  routes,
  mode: 'history',
  base: __dirname,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  }
});

router.beforeEach((to, from, next) => {
  const lang = to.params.lang || DEFAULT_LANGUAGE;

  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters['security/isAuthenticated']) {
      next({
        name: 'login',
        params: { lang: lang }
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
