<template src="./auth.html"></template>

<script lang="ts">
import { EmployeeList, EmployeeList_Res } from '@/shared/types/employeeList';
import { defineComponent } from 'vue';
import axios from 'axios';
import ConfirmDialog from 'primevue/confirmdialog';
import Button from 'primevue/button';
import RadioButton from 'primevue/radiobutton';
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

export default defineComponent({
    name: "Auth",
    components: {
        ConfirmDialog,
        Button,
        RadioButton,
        InputText,
        Calendar,
        DataTable,
        Column
    },
    data() {
        return {
            studentInfo: {} as EmployeeList,
            products: null as any,
            studentList: [] as EmployeeList[],
            totalCount: 0 as Number,
            pageSize: 10 as Number,
            pageNumber: 1 as Number,
            selectedStudent: null
        }
    },

    methods:{

        async onClickSumbit() {
            if(this.validateInput()){
                const requestBody = {
                    body:this.studentInfo
                };
                try {
                    //======================================================
                    // await axios.post(`${import.meta.env.VITE_APP_SERVER_URL}/employee/register`, requestBody).then(res =>{
                    //     this.studentList = res.data.body.studentList;
                    //     this.totalCount = res.data.body.totalCount;
                    // });
                    //======================================================
                    const response = (await axios.post(`${import.meta.env.VITE_APP_SERVER_URL}/employee/register`, requestBody));
                    const result = response.data.body as EmployeeList_Res;
                    this.studentList = result.employeeList
                    this.totalCount = result?.totalCount
                } catch (error) {
                    console.error('Error fetching todos:', error);
                }
                this.fetchDataFromApi();
            }else{
                alert("error")
            }
        },

        validateInput(): boolean {
            if(this.studentInfo.studentName == null || this.studentInfo.studentName == ""){
                return false;
            }
            return true;
        },

        async fetchDataFromApi() {
            const requestBody = {
                "body": {
                    pageSize: this.pageSize,
                    pageNumber: this.pageNumber,
                }
            };
            try {
                const response = (await axios.post(`${import.meta.env.VITE_APP_SERVER_URL}/employee/list`, requestBody));
                const result = response.data.body as EmployeeList_Res;
                this.studentList = result.employeeList
                this.totalCount = result?.totalCount
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        },

        clearList(){
            this.studentList = [];
        },

        showTemplate() {
            this.$confirm.require({
                group: 'templating',
                header: 'Confirmation',
                message: 'Please confirm to proceed moving forward.',
                icon: 'pi pi-exclamation-circle',
                acceptIcon: 'pi pi-check',
                rejectIcon: 'pi pi-times',
                rejectClass: 'p-button-outlined p-button-sm',
                acceptClass: 'p-button-sm',
                rejectLabel: 'Cancel',
                acceptLabel: 'Save',
                accept: this.onClickSumbit,
                reject: this.clearForm
            });
        },

        clearForm(){
            this.studentInfo.studentName = ""
        }

    }
})
</script>

<style scoped>
@import "./auth.scss";
</style>