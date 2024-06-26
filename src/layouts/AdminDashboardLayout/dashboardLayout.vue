<template src="./dashboardLayout.html"></template>

<script lang="ts">
import type { EmployeeList, EmployeeList_Res } from '@/shared/types/employeeList';
import type { MenuItem } from '@/shared/types/menu-list';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import axios from 'axios';
import { defineComponent } from 'vue';
import { DahsboardService } from './DashboardService';
import Toast from 'primevue/toast';
import SelectButton from 'primevue/selectbutton';
import { LanguageCode } from '@/shared/types/language-code';

export default defineComponent({
    name: "Dashboard",
    components: {
        FontAwesomeIcon,
        Toast,
        SelectButton
    },

    data() {
        return {
            responseData: [] as EmployeeList[],
            totalCount: 0 as Number,
            pageSize: 100 as Number,
            pageNumber: 1 as Number,
            message: "" as String,
            isCollapse: false,
            telegramURL: "https://t.me/Thoeurn_Nethan",
            menuList:[] as MenuItem[],
            currentLanguage: this.$i18n.locale,
            // language: this.$util.getDataStorage('lang'),
            languageList: ['en', 'km']
        }
    },

    mounted() {
        this.isCollapse = localStorage.getItem('collapse') === "true";
        this.getMenuList();
    },

    methods: {
        async getStudentList() {
            const requestBody = {
                "body": {
                    pageSize: this.pageSize,
                    pageNumber: this.pageNumber,
                }
            };
            try {
                const response = (await axios.post(`${import.meta.env.VITE_APP_SERVER_URL}/employee/list`, requestBody));
                const result = response.data.body as EmployeeList_Res;
                this.responseData = result.employeeList
                this.totalCount = result?.totalCount
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
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
        }

    },
    watch: {
        currentLanguage(newLang: string) {
            this.changeLanguage(newLang);
        }
    }
})
</script>

<style lang="scss" scoped>
    @import "./dashboardLayout.scss";
</style>