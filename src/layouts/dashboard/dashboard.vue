<template src="./dashboard.html"></template>

<script lang="ts">
import type { EmployeeList, EmployeeList_Res } from '@/shared/types/employeeList';
import type { MenuItem } from '@/shared/types/menu-list';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import axios from 'axios';
import { defineComponent } from 'vue';
import { DahsboardService } from './DashboardService';

export default defineComponent({
    name: "Dashboard",
    components: {
        FontAwesomeIcon,
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
            menuList:[] as MenuItem[]
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
            // return item;
        }
    },
})
</script>

<style lang="scss" scoped>
    @import "./dashboard.scss";
</style>