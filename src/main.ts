import { createPinia } from 'pinia';
import { createApp } from 'vue';
// import i18n from '@/i18n';
import App from './App.vue';
import router from './router';

/* Service */
import PopupService from './shared/services/popup.service';

/* PrimeVue UI Component */
import "primeicons/primeicons.css";
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import "primevue/resources/themes/aura-light-green/theme.css";

/* Global Style */
import "../src/assets/scss/global.scss";
import './theme/variable.scss';

/* Bootstrap */
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

/* Font awesome */
import { library } from '@fortawesome/fontawesome-svg-core';
import {
        faArrowRightFromBracket,
        faBars,
        faBarsProgress,
        faBell,
        faChevronRight,
        faGear,
        faHouseUser,
        faLayerGroup,
        faListOl,
        faMessage,
        faPhone,
        faRegistered,
        faRightToBracket,
        faSchool,
        faShieldHalved,
        faUser
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { IonAccordion, IonAccordionGroup, IonAvatar, IonBackButton, IonBackdrop, IonButton, IonButtons, IonCheckbox, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonInput, IonItem, IonItemDivider, IonItemGroup, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonNote, IonPage, IonPopover, IonRadio, IonRadioGroup, IonRow, IonSegment, IonSegmentButton, IonSelect, IonSelectOption, IonSlide, IonSlides, IonSpinner, IonText, IonTextarea, IonTitle, IonToolbar, IonicVue, alertController, loadingController, toastController, useIonRouter } from '@ionic/vue';
import { DateFormat } from './shared/services/date-time';
import { ConvertCode } from './shared/services/code-convert';

const app = createApp(App);
const pinia = createPinia();
const primeVue = PrimeVue;

library.add(faPhone); 
library.add(faHouseUser); 
library.add(faUser); 
library.add(faSchool); 
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
        .component("IonContent", IonContent)
        .component("IonPage", IonPage)
        .component("IonHeader", IonHeader)
        .component("IonToolbar", IonToolbar)
        .component("IonTitle", IonTitle)
        .component("IonFooter", IonFooter)
        .component("IonBackButton", IonBackButton)
        .component("IonItem", IonItem)
        .component("IonList", IonList)
        .component("IonText", IonText)
        .component("IonSelect", IonSelect)
        .component("IonSelectOption", IonSelectOption)
        .component("IonButton", IonButton)
        .component("IonButtons", IonButtons)
        .component("IonPopover", IonPopover)
        .component("IonAccordion", IonAccordion)
        .component("IonAccordionGroup", IonAccordionGroup)
        .component("alertController", alertController)
        .component("IonCheckbox", IonCheckbox)
        .component("IonInput", IonInput)
        .component("IonTextarea", IonTextarea)
        .component("IonLabel", IonLabel)
        .component("IonItemDivider", IonItemDivider)
        .component("IonItemGroup", IonItemGroup)
        .component("IonItemOption", IonItemOption)
        .component("IonItemOptions", IonItemOptions)
        .component("IonItemSliding", IonItemSliding)
        .component("IonNote", IonNote)
        .component("IonBackdrop", IonBackdrop)
        .component("useIonRouter", useIonRouter)
        .component("loadingController", loadingController)
        .component("IonSpinner", IonSpinner)
        .component("IonRadio", IonRadio)
        .component("IonRadioGroup", IonRadioGroup)
        .component("IonRow", IonRow)
        .component("IonCol", IonCol)
        .component("IonGrid", IonGrid)
        .component("IonSegmentButton", IonSegmentButton)
        .component("IonSegment", IonSegment)
        .component("IonSlides", IonSlides)
        .component("IonSlide", IonSlide)
        .component("IonAvatar", IonAvatar)
        .component("toastController", toastController)

app.config.globalProperties.$format = new DateFormat();
app.config.globalProperties.$popupService = new PopupService();
app.config.globalProperties.$codeConverter = new ConvertCode();

app.use(router)
app.use(pinia)
app.use(IonicVue)
app.use(primeVue);
app.use(ConfirmationService);

app.mount('#app')