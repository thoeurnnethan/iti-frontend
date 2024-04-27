import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

/* PrimeVue UI Component */
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primevue/resources/themes/aura-light-green/theme.css";

/* Global Style */
// import "../src/assets/css/global.scss";
import './theme/variable.scss';

/* Bootstrap */
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

/* Font awesome */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { DateFormat } from './shared/services/date-time';
import { faPhone
        ,faHouseUser
        ,faUser
        ,faBarsProgress
        ,faShieldHalved
        ,faRightToBracket
        ,faRegistered
        ,faBell
        ,faGear
        ,faArrowRightFromBracket
        ,faLayerGroup
        ,faListOl
        ,faChevronRight
        ,faBars
        ,faMessage } from '@fortawesome/free-solid-svg-icons';

const app = createApp(App);
const pinia = createPinia();
const primeVue = PrimeVue;

library.add(faPhone); 
library.add(faHouseUser); 
library.add(faUser); 
library.add(faBarsProgress); 
library.add(faShieldHalved); 
library.add(faRightToBracket); 
library.add(faRegistered); 
library.add(faBell); 
library.add(faGear); 
library.add(faArrowRightFromBracket); 
library.add(faLayerGroup); 
library.add(faListOl); 
library.add(faChevronRight); 
library.add(faBars); 
library.add(faMessage); 

app.component("font-awesome-icon", FontAwesomeIcon)

app.config.globalProperties.$format = new DateFormat();

app.use(router)
app.use(pinia)
// app.use(primeVue, {unstyled: true});
app.use(primeVue);
app.use(ConfirmationService);

app.mount('#app')