import { createStore } from 'vuex';

import coachesModule  from '../../domain/coaches/store/index.js'
import requestsModule from '../../domain/requests/store/index.js';
import authModule     from '../../domain/auth/store/index';


const store = createStore({
  modules: {
    coaches: coachesModule,
    requests: requestsModule,
    auth: authModule
  }
});

export default store;