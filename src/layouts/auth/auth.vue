<!-- <template src="./auth.html"></template> -->
<template>
    <div>
        <p>{{ totalCount }}</p>
        <button v-on:click="pageSize=100">Click page size =100</button>
        <p>{{ pageSize }} - {{ pageNumber }}</p>
       <table>
        <tr>
            <th style="padding-right: 100px;" >ID</th>
            <th style="padding-right: 100px;">Name</th>
            <th style="padding-right: 100px;">position</th>
            <th style="padding-right: 100px;">gender</th>
        </tr>
        <tr v-for="(item) in responseData" :key="item.studentID">
            <td>{{ item.studentID }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.position }}</td>
            <td>{{ item.gender }}</td>
        </tr>
       </table>
    </div>
</template>

<script lang="ts">
import type { EmployeeList, EmployeeList_Res } from '@/shared/types/employeeList';
import axios from 'axios';
import { defineComponent } from 'vue';

export default defineComponent({
    name: "Auth",
    components: {
        // 
    },
    data() {
        return {
            responseData : [] as EmployeeList[],
            totalCount: 0 as Number,
            pageSize:12 as Number,
            pageNumber: 1 as Number
        }
    },
    computed:{
    },
    watch: {
        // 
    },
    
    methods: {
       async fetchDataFromApi() {
            const requestBody = {
                pageSize: this.pageSize,
                pageNumber: this.pageNumber,
            };

            try {
                const response = (await axios.post("http://localhost:8081/employee/employeeList",requestBody)).data as EmployeeList_Res;
                console.log(response)
                this.responseData = response.employeeList
                this.totalCount = response?.totalCount
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        },
    },

    /** Option LifeCycle */
    beforeCreate() {
        console.log("Before Create")
    },
    created() {
        console.log("Created")
    },
    beforeMount() {
        console.log("Before Mount");
    },
    mounted() {
        console.log("Page Mounted")
        this.fetchDataFromApi();
    },
    beforeUnmount() {
        console.log("Page Before Unmount")
    },
    unmounted() {
        console.log("Unmounted")
    },
})
</script>

<style scoped>
@import "./auth.css";
</style>