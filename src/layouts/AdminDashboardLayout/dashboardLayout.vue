<template src="./dashboardLayout.html"></template>

<script lang="ts">
import type { USER_LIST } from '@/shared/types/user-list';
import type { MenuItem } from '@/shared/types/menu-list';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { defineComponent } from 'vue';
import { DashboardService } from './DashboardService';
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
            userInfo: this.$util.getDataStorage('userInfo', true),
            responseData: [] as USER_LIST[],
            totalCount: 0 as Number,
            pageSize: 100 as Number,
            pageNumber: 1 as Number,
            greeting: '',
            interval: 0,
            message: "" as String,
            isCollapse: false,
            telegramURL: "https://t.me/Thoeurn_Nethan",
            menuList: [] as MenuItem[],
            currentLanguage: this.$i18n.locale,
            languageList: ['en', 'km']
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
        // toggleMenu(menu) {
        //     this.activeMenu = this.activeMenu === menu ? null : menu;
        // },

        // closeAllMenus() {
        //     this.activeMenu = null;
        // },

        toggleSubMenu(name: string) {
            this.menuList = this.menuList.map(item => {
                if (item.name === name) {
                    item.open = !item.open;
                } else {
                    item.open = false;
                }
                return item;
            });
        },

        toggleSidebar() {
            this.isCollapse = localStorage.getItem('collapse') === "true";
            this.isCollapse = !this.isCollapse
            localStorage.setItem('collapse', String(this.isCollapse))
        },

        getMenuList() {
            this.menuList = DashboardService.getMenuList();
        },

        isActive(item: { path: string; }) {
            // Check if the current route matches the item's path
            return this.$route.path.startsWith(item.path);
        },

        changeLanguage(lang: string) {
            this.$util.setDataStorage('lang', lang)
            this.$i18n.locale = lang;
        },

        updateGreeting() {
            const currentHour = new Date().getHours();
            if (currentHour >= 5 && currentHour < 12) {
                this.greeting = 'common.goodMorning';
            } else if (currentHour >= 12 && currentHour < 17) {
                this.greeting = 'common.goodAfternoon';
            } else if (currentHour >= 17 && currentHour < 21) {
                this.greeting = 'common.goodEvening';
            } else {
                this.greeting = 'common.goodNight';
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