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
/* Theme variables */
import './theme/variable.scss';

/* Bootstrap */
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

/* Font awesome */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
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
        ,faBars } from '@fortawesome/free-solid-svg-icons';

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

const app = createApp(App);
const pinia = createPinia();
const primeVue = PrimeVue;

app.component("font-awesome-icon", FontAwesomeIcon);

app.use(router)
app.use(pinia)
app.use(primeVue);
app.use(ConfirmationService);

app.mount('#app')