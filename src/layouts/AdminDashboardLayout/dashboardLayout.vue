<template src="./dashboardLayout.html"></template>

<script lang="ts">
import type { USER_LIST } from '@/shared/types/user-list';
import type { MenuItem } from '@/shared/types/menu-list';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { defineComponent } from 'vue';
import { DashboardService } from './DashboardService';
import Toast from 'primevue/toast';
import SelectButton from 'primevue/selectbutton';
import { RequestService } from '@/shared/services/request-service';
import { API_PATH } from '@/shared/common/api-path';
import { UserRoleList } from '@/shared/common/common';

const requestService = new RequestService();

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
            userRoleList: UserRoleList,
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

    created(){
        this.updateGreeting();
        this.interval = setInterval(this.updateGreeting, 60000);
    },

    mounted() {
        this.isCollapse = localStorage.getItem('collapse') === "true";
        this.getMenuList();
    },

    methods: {
        isActive(item: { path: string }) {
            return this.$route.path === item.path;
        },

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
        },

        async onClickLogout(){
            var reqBody ={}
            this.$confirm.require({
                message: "Are you sure want to logout?",
                header: 'Please Confirm',
                acceptLabel: 'Yes',
                acceptClass: 'btn btn-danger',
                rejectLabel: 'No',
                rejectClass: 'btn btn-secondary',                
                accept: async () => {
                    const res = await requestService.request(API_PATH.USER_LOGOUT, reqBody, false);
                    if(res.header.result){
                        this.$util.removeDataStorage('userInfo', true)
                        this.$util.removeDataStorage('lastRoute', true)
                        this.$util.setDataStorage('isAuthenticated', false, true)
                        this.$router.push('/')
                    }else if(res.header.error_code === '401'){
                        this.$util.removeDataStorage('userInfo', true)
                        this.$router.push('/')
                    }else{
                        return
                    }
                },
                reject: () => {
                    return
                }
            });
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