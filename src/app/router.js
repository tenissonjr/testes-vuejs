import { createRouter, createWebHistory } from 'vue-router';


import store              from '../app/store/index.js';

import CoachesList        from '../coaches/pages/CoachesList.vue';
import CoachRegistation   from '../coaches/pages/CoachRegistration.vue';
import ContactCoach       from '../requests/pages/ContactCoach.vue';
import RequestsReceived   from '../requests/pages/RequestsReceived.vue';
import UserAuth           from '../auth/pages/UserAuth.vue';
import NotFound           from '../app/pages/NotFound.vue';

const CoachDetail = () => import('../coaches/pages/CoachDetail.vue');

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
