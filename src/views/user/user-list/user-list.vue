<template src="./user-list.html"></template>

<script lang="ts">
import { API_PATH } from '@/shared/common/api-path';
import { USER_LIST_RES, USER_LIST, USER_DETAIL_RES } from '@/shared/types/user-list';
import { defineComponent, ref } from 'vue';
import { RequestService } from '@/shared/services/request-service';
import { UserRoleList, GenderCodeList, globalStatusCodeList } from '@/shared/common/common';
import user_detail from "@/views/user/user-detail/user-detail.vue";
import { ExportExcel } from '@/shared/services/export-excel-class';

const requestService = new RequestService();
const exportExcel = new ExportExcel();

export default defineComponent({
    name: "user-list",
    inheritAttrs: false,
    components: {
    },

    data() {
        const dataTable = ref<USER_LIST[]>([]);
        return {
            userList: [] as USER_LIST[],
            userInfo: {} as USER_LIST,
            userRoleList: UserRoleList,
            genderCodeList: GenderCodeList,
            dataTable,
            customNoClass: 'table_no',
            searchKey: '',
            roleID: 'all',
            roleTitle: '',
            totalCount: 0,
            totalMale: 0,
            totalFemale: 0,
            pageSize: 10,
            pageNumber: 0,
            statusCodeList: globalStatusCodeList
        }
    },

    watch:{
        '$i18n.locale'(){
            this.updateTranslatedUserroleList()
        }
    },

    mounted() {
        this.getUserList()
        this.updateTranslatedUserroleList()
    },

    methods: {
        async getUserList() {
            const body = {
                searchKey: this.searchKey,
                roleID: this.roleID === 'all' ? '' : this.roleID,
                statusCode: "",
                pageSize: this.pageSize,
                pageNumber: this.pageNumber + 1
            }
            const response = (await requestService.request(API_PATH.USER_LIST, body, false)) as USER_LIST_RES;
            this.totalCount = response?.body?.totalCount;
            this.totalMale = response?.body?.totalMale;
            this.totalFemale = response?.body?.totalFemale;
            this.roleTitle = this.roleID
            this.userList = response.body.userList.map((data, index) => {
                return {
                    ...data,
                    no: index + 1 + (this.pageSize) * this.pageNumber
                }
            })
        },

        async onClickRow() {
            const body = {
                userID: this.userInfo?.userID,
                studentID: this.userInfo?.specID
            };
            const response = (await requestService.request(API_PATH.USER_DETAIL, body, false)) as USER_DETAIL_RES;
            this.$popupService.onOpen({
                component: user_detail,
                dataProp: {
                    userDetail: response.body
                }
            })
        },

        async deleteUser(_item: USER_LIST) {
            this.$confirm.require({
                message: 'Do you want to delete this record?',
                header: 'Please Comfirm',
                acceptClass: 'btn btn-danger',
                rejectClass: 'btn btn-secondary',
                accept: async () => {
                    const reqBody = {
                        userID: _item.userID,
                        roleID: _item.roleID,
                        statusCode: '02',
                        isDeleted: 'Y'
                    }
                    await requestService.request(API_PATH.USER_UPDATE, reqBody, false) as USER_LIST;
                    this.getUserList();
                    this.$toast.add({ summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
                },
                reject: () => {
                    this.$toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
                }
            });
        },

        editUser(_item: USER_LIST) {
            this.$router.push({ path: `/user-update/${_item.userID}` });
        },

        // Handle page size page number
        onPage(event: { page: number; rows: number; }) {
            this.pageNumber = event.page;
            this.pageSize = event.rows;
            this.getUserList();
        },

        //download excel
        async exportToExcel() {
            const body = {
                searchKey: this.searchKey,
                roleID: this.roleID === 'all' ? '' : this.roleID,
                statusCode: "",
                pageSize: this.pageSize,
                pageNumber: this.pageNumber + 1
            }
            const response = (await requestService.request(API_PATH.USER_LIST_DOWNLOAD, body, false)) as USER_LIST_RES;
            this.dataTable = response.body.userList
            const excelData = this.dataTable.map((data, index) => {
                return {
                    "No": index + 1,
                    "System User ID": data.userID,
                    "User ID": data.specificID,
                    "First Name": data.firstName,
                    "Last Name": data.lastName,
                    "Nickname": data.nickName,
                    "User Role": this.$codeConverter.codeToString(this.userRoleList, data.roleID),
                    "Gender": this.$codeConverter.codeToString(this.genderCodeList, data.gender),
                    "Date of birth": this.$format.formatDateTime(data.dateOfBirth ,'yyyy-mm-dd','Slash','FullMonth'),
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

        updateTranslatedUserroleList() {
            this.userRoleList = this.userRoleList.map(item => ({
                codeValue: item.codeValue,
                codeValueDesc: this.$codeConverter.codeToString(this.userRoleList, String(item.codeValue), 'userRoleCode')
            }));
        },

    },

})
</script>

<style>
@import url('./user-list.scss');
</style>