import { createApp, defineAsyncComponent } from 'vue';

import App from './App.vue';

import router from './app/router.js';
import store from './app/store/index.js'


import BaseCard from './app/components/ui/BaseCard.vue';
import BaseButton from './app/components/ui/BaseButton.vue';
import BaseBadge from './app/components/ui/BaseBadge.vue';
import BaseSpinner from './app/components/ui/BaseSpinner.vue';

const BaseDialog = defineAsyncComponent(() => import('./app/components/ui/BaseDialog.vue'));

const app = createApp(App)

app.use(router);
app.use(store);

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-badge', BaseBadge);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);

app.mount('#app');
