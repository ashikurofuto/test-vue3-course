import { createApp } from 'vue'
import App from './App.vue';
import components from '@/Components/UI/index.js';
import router from './Router/Router';
import DirectiveStorage from './Directives/DirectiveStorage';


const app = createApp(App);

components.forEach(component => {
    app.component(component.name,component);
});

DirectiveStorage.forEach(dir => {
    app.directive(dir.name,dir);
});

app
.use(router)
.mount('#app');
