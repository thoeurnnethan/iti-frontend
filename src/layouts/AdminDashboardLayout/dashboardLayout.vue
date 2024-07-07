<template src="./dashboardLayout.html"></template>

<script lang="ts">
import type { UserList } from '@/shared/types/user-list';
import type { MenuItem } from '@/shared/types/menu-list';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { defineComponent } from 'vue';
import { DahsboardService } from './DashboardService';
import Toast from 'primevue/toast';
import SelectButton from 'primevue/selectbutton';

export default defineComponent({
    name: "Dashboard",
    components: {
        FontAwesomeIcon,
        Toast,
        SelectButton
    },

    data() {
        return {
            userInfo : this.$util.getDataStorage('userInfo',true),
            responseData: [] as UserList[],
            totalCount: 0 as Number,
            pageSize: 100 as Number,
            pageNumber: 1 as Number,
            greeting: '',
            interval: 0,
            message: "" as String,
            isCollapse: false,
            telegramURL: "https://t.me/Thoeurn_Nethan",
            menuList:[] as MenuItem[],
            currentLanguage: this.$i18n.locale,
            languageList: ['en', 'km'],
            activeMenu: null
        }
    },

    watch: {
        currentLanguage(newLang: string) {
            this.changeLanguage(newLang);
        }
    },

    mounted() {
        this.isCollapse = localStorage.getItem('collapse') === "true";
        this.getMenuList();
        this.updateGreeting();
        this.interval = setInterval(this.updateGreeting, 60000);
    },

    methods: {
        toggleMenu(menu) {
            this.activeMenu = this.activeMenu === menu ? null : menu;
        },
        closeAllMenus() {
            this.activeMenu = null;
        },
        toggleSidebar() {
            this.isCollapse = localStorage.getItem('collapse') === "true";
            this.isCollapse = !this.isCollapse
            localStorage.setItem('collapse', String(this.isCollapse))
        },
        getMenuList(){
            this.menuList = DahsboardService.getMenuList();
        },
        isActive(item:any) {
            return this.$route.path.startsWith(item.path);
        },
        changeLanguage(lang: string) {
            this.$util.setDataStorage('lang', lang)
            this.$i18n.locale = lang;
        },
        updateGreeting() {
            const currentHour = new Date().getHours();
            if (currentHour < 12) {
                this.greeting = 'common.goodMorning';
            } else if (currentHour < 18) {
                this.greeting = 'common.goodAfternoon';
            } else {
                this.greeting = 'common.goodEvening';
            }
        }
    },

    beforeDestroy() {
        clearInterval(this.interval);
    }
})
</script>

<style lang="scss" scoped>
    @import "./dashboardLayout.scss";
</style>