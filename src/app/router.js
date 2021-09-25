import { createRouter, createWebHistory } from 'vue-router';


import store              from '../app/store/index.js';

import CoachesList        from '../domain/coaches/pages/CoachesList.vue';
import CoachRegistation   from '../domain/coaches/pages/CoachRegistration.vue';
import ContactCoach       from '../domain/requests/pages/ContactCoach.vue';
import RequestsReceived   from '../domain/requests/pages/RequestsReceived.vue';
import UserAuth           from '../domain/auth/pages/UserAuth.vue';
import NotFound           from '../app/pages/NotFound.vue';

const CoachDetail = () => import('../domain/coaches/pages/CoachDetail.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      props: true,
      children: [
        { path: 'contact', component: ContactCoach } // /coaches/c1/contact
      ]
    },
    { path: '/register', component: CoachRegistation, meta: { requiresAuth: true } },
    { path: '/requests', component: RequestsReceived, meta: { requiresAuth: true } },
    { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
    { path: '/:notFound(.*)', component: NotFound }
  ]
});

router.beforeEach(function(to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/coaches');
  } else {
    next();
  }
});

export default router;
