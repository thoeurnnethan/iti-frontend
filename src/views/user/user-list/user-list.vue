<template src="./user-list.html"></template>

<script lang="ts">
import { API_PATH } from '@/shared/common/api-path';
import { USER_LIST_RES, USER_LIST, USER_LIST_REQ, ACADEMIC_LIST, PARENT_LIST } from '@/shared/types/user-list';
import { defineComponent, ref } from 'vue';
import { RequestService } from '@/shared/services/request-service';
import { STUDENT_LIST } from '@/shared/types/student-list';
import { UserRoleList, GenderCodeList } from '@/shared/common/common';
import user_detail from "@/views/user/user-detail/user-detail.vue";
import { ExportExcel } from '@/shared/services/export-excel-class';


const requestService = new RequestService();
const exportExcel = new ExportExcel();

export default defineComponent({
    name: "user-list",
    inheritAttrs: false,
    components: {
        // 
    },

    data() {
        const dataTable = ref<USER_LIST[]>([]);
        return {
            userList: [] as USER_LIST[],
            userInfo: {} as USER_LIST,
            userRoleList: UserRoleList,
            genderCodeList: GenderCodeList,
            dataTable,
            startingIndex: 1,
            searchKey: '',
            roleID: '',
            roleTitle: '',
            studentList: [] as STUDENT_LIST[],
            parentList: [] as PARENT_LIST[],
            academicList: [] as ACADEMIC_LIST[],
            totalCount: 0,
            pageSize: 10,
            pageNumber: 1
        }
    },
    mounted() {
        this.getStudentList()
    },

    methods: {
        async getStudentList() {
            const body: USER_LIST_REQ = {
                searchKey: this.searchKey,
                roleID: this.roleID,
                statusCode: "",
                pageSize: this.pageSize,
                pageNumber: this.pageNumber
            }

            const response = (await requestService.request(API_PATH.USER_LIST, body, false)) as USER_LIST_RES;
            this.totalCount = response.body.totalCount;
            this.userList = response.body.userList;
            this.roleTitle = this.roleID
            this.dataTable = response.body?.userList.map((data, index) => {
                return {
                    ...data,
                    no: this.startingIndex + index,
                }
            });
        },
        
        onClickRow(data: STUDENT_LIST) {
            this.$popupService.onOpen({
                component: user_detail,
                dataProp: {
                    userDetail: data
                }
            })
        },

        //download excel
        exportToExcel() {
            const excelData = this.dataTable.map((data, index) => {
                return {
                    "No": index + 1,
                    "First Name": data.firstName,
                    "Last Name": data.lastName,
                    "Nickname": data.nickName,
                    "Gender": data.gender,
                    "Date of birth": data.dateOfBirth,
                    "Place of birth": data.placeOfBirth,
                    "Address": data.address,
                    "Phone": data.phone,
                    "Email": data.email,
                    "Password": data.passwd,
                };
            })
            const exportExcelData = [
                {
                    data: excelData
                },
            ];
            exportExcel.exportSheet(exportExcelData, 'User info')
        },
    },

})
</script>

<style>
@import url('./user-list.scss');
</style>