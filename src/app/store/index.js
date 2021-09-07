import { createStore } from 'vuex';

import coachesModule  from '../../coaches/store/index.js'
import requestsModule from '../../requests/store/index.js';
import authModule     from '../../auth/store/index.js';

const store = createStore({
  modules: {
    coaches: coachesModule,
    requests: requestsModule,
    auth: authModule
  }
});

export default store;