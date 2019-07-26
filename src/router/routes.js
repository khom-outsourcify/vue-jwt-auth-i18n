import { translation } from '@/plugins/translation';
import Login from '@/views/Login.vue';

function load(component) {
  // '@' is aliased to src/components
  return () => import(/* webpackChunkName: "[request]" */ `@/views/${component}.vue`);
}

export default [
  {
    path: '/:lang',
    component: {
      template: '<router-view></router-view>'
    },
    beforeEnter: translation.routeMiddleware,
    children: [
      {
        path: 'login',
        name: 'login',
        component: Login
      },
      {
        path: '',
        name: 'home',
        component: load('Home'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'about',
        name: 'about',
        component: load('About'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '*',
        component: load('404')
      }
    ]
  },
  {
    // Redirect user to supported lang version.
    path: '*',
    redirect(to) {
      return translation.getUserSupportedLang();
    }
  }
];
