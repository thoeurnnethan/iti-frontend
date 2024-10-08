import { createApp } from 'vue';
import { createPinia } from 'pinia';
import i18n from './i18n';
import App from './App.vue';
import router from './router';

/* Service */
import PopupService from './shared/services/popup.service';
import { DateFormat } from './shared/services/date-time';
import { ConvertCode } from './shared/services/code-convert';
import { PhoneNumberFormat } from './shared/services/phone-number';
import Utils from './shared/util';
import { TranslateCodeUtil } from './shared/services/translate-code-list';

/* Global Style */
import "../src/assets/scss/global.scss";
import './theme/variable.scss';

/* Bootstrap */
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

/* PrimeVue UI Component */
import "primeicons/primeicons.css";// icons
import 'primevue/resources/primevue.min.css'; // core css
import 'primevue/resources/themes/saga-blue/theme.css'; // choose a theme
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import AnimateOnScroll from 'primevue/animateonscroll';
import Badge from 'primevue/badge';
import BadgeDirective from "primevue/badgedirective";
import BlockUI from 'primevue/blockui';
import Calendar from 'primevue/calendar';
import Checkbox from 'primevue/checkbox';
import Column from 'primevue/column';
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmPopup from 'primevue/confirmpopup';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import DialogService from 'primevue/dialogservice'
import FocusTrap from 'primevue/focustrap';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Ripple from 'primevue/ripple';
import Tooltip from 'primevue/tooltip';
import SelectButton from 'primevue/selectbutton';
import StyleClass from 'primevue/styleclass';
import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
/* Font awesome */
import {
    faArrowRightFromBracket,
    faArrowRotateLeft,
    faBars,
    faBarsProgress,
    faBell,
    faBookOpen,
    faBoxArchive,
    faBuilding,
    faCalendarDays,
    faCaretRight,
    faChevronDown,
    faChevronRight,
    faCircleRight,
    faEye,
    faEyeSlash,
    faFileExcel,
    faGear,
    faHouse,
    faHouseUser,
    faLandmark,
    faLayerGroup,
    faListOl,
    faMessage,
    faPencil,
    faPhone,
    faPlus,
    faRegistered,
    faRightToBracket,
    faRotateBack,
    faRotateLeft,
    faSchool,
    faShieldHalved,
    faShop,
    faTrash,
    faUser,
    faUserGraduate,
    faUsers,
    faX,
    faXmark,
    faUserPlus,
    faMedal,
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
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
library.add(faPlus);
library.add(faListOl);
library.add(faChevronRight);
library.add(faHouse);
library.add(faFileExcel);
library.add(faBuilding);
library.add(faPencil);
library.add(faCalendarDays);
library.add(faTrash);
library.add(faBars);
library.add(faMessage);
library.add(faXmark);
library.add(faEye);
library.add(faUser);
library.add(faChevronDown);
library.add(faEyeSlash);
library.add(faRotateBack);
library.add(faArrowRotateLeft);
library.add(faRotateLeft);
library.add(faShop);
library.add(faX);
library.add(faUserGraduate);
library.add(faBookOpen);
library.add(faCaretRight);
library.add(faUsers);
library.add(faBoxArchive);
library.add(faCalendarDays);
library.add(faLandmark);
library.add(faCircleRight);
library.add(faUserPlus);
library.add(faMedal);
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

//ionic
import {
    IonicVue
    , alertController
    , loadingController
    , toastController
    , useIonRouter
} from '@ionic/vue';

const pinia = createPinia();
const app = createApp(App)
    .use(i18n)
    .use(pinia).use(IonicVue)
    .use(PrimeVue, { ripple: true })
    .use(ConfirmationService)
    .use(ToastService)
    .use(DialogService)
    .use(router);

app.config.globalProperties.$format = new DateFormat();
app.config.globalProperties.$popupService = new PopupService();
app.config.globalProperties.$codeConverter = new ConvertCode();
app.config.globalProperties.$phoneNumberFormater = new PhoneNumberFormat();
app.config.globalProperties.$util = new Utils();
app.config.globalProperties.$codeUtil = new TranslateCodeUtil();


app.directive('tooltip', Tooltip)
    .directive('badge', BadgeDirective)
    .directive('ripple', Ripple)
    .directive('styleclass', StyleClass)
    .directive('focustrap', FocusTrap)
    .directive('animateonscroll', AnimateOnScroll);

app.component('Badge', Badge)
    .component('BlockUI', BlockUI)
    .component('Calendar', Calendar)
    .component('Checkbox', Checkbox)
    .component('Column', Column)
    .component('ConfirmDialog', ConfirmDialog)
    .component('ConfirmPopup', ConfirmPopup)
    .component('DataTable', DataTable)
    .component('DataView', DataView)
    .component('Dialog', Dialog)
    .component('Image', Image)
    .component('InputGroup', InputGroup)
    .component('InputGroupAddon', InputGroupAddon)
    .component('InputNumber', InputNumber)
    .component('InputText', InputText)
    .component('Password', Password)
    .component('SelectButton', SelectButton)
    .component('TabView', TabView)
    .component('TabPanel', TabPanel)
    .component('Textarea', Textarea)
    .component('Toast', Toast)
    .component("font-awesome-icon", FontAwesomeIcon)
    .component("alertController", alertController)
    .component("useIonRouter", useIonRouter)
    .component("loadingController", loadingController)
    .component("toastController", toastController)

app.mount('#app')