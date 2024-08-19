<template src="./department-list.html"></template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { API_PATH } from '@/shared/common/api-path';
import { RequestService } from '@/shared/services/request-service';
import { DEPARTMENT_LIST, DEPARTMENT_LIST_REQ, DEPARTMENT_LIST_RES } from '@/shared/types/department-list';
import department_detail from '../department-detail/department-detail.vue';
import teacherDepartment_action from '@/views/department/teacherDepartment-action/teacherDepartment-action.vue';
import department_edit from '../department-edit/department-edit.vue';
import { ExportExcel } from '@/shared/services/export-excel-class';
import MyLoading from '../../MyLoading.vue';
import { globalStatusCodeList } from '@/shared/common/common';

const requestService = new RequestService();
const exportExcel = new ExportExcel();

export default defineComponent({
    name: "department-list",
    components: {
        department_edit,
        MyLoading
    },
    data() {
        const dataTable = ref<DEPARTMENT_LIST[]>([]);
        return {
            departmentList: [] as DEPARTMENT_LIST[],
            departmentInfo: {} as DEPARTMENT_LIST,
            Loading: false,
            searchKey: '',
            totalCount: 0,
            pageSize: 10,
            pageNumber: 0,
            startingIndex: 1,
            dataTable,
            customNoClass: 'table_no',
            departmentInfoUpdate: {
                departmentID: '',
                departmentName: '',
                departmentDesc: '',
                statusCode: ''
            } as DEPARTMENT_LIST,
            statusCodeList: globalStatusCodeList
        }
    },

    mounted() {
        // Call get department on mount
        this.getDepartmentList();
    },

    computed: {
        // Check is input form is valid to Save
        isValidForm(): boolean {
            return this.departmentInfoUpdate.departmentID !== '' &&
                this.departmentInfoUpdate.departmentName !== '' &&
                this.departmentInfoUpdate.departmentDesc !== '' &&
                this.departmentInfoUpdate.statusCode !== '';
        }
    },

    methods: {
        // Get Department List
        async getDepartmentList() {
            this.Loading = true;
            const reqBody: DEPARTMENT_LIST_REQ = {
                userID: "",
                searchKey: this.searchKey,
                pageSize: this.pageSize,
                pageNumber: this.pageNumber + 1
            }
            const response = (await requestService.request(API_PATH.DEPARTMENT_LIST, reqBody, false)) as DEPARTMENT_LIST_RES;
            this.totalCount = response.body?.totalCount;
            this.departmentList = response.body?.departmentList.map((data, index) => {
                return {
                    ...data,
                    no: index + 1 + (this.pageSize) * this.pageNumber
                }
            });
            this.Loading = false;
        },

        rowClass(data: { statusCode: string; }) {
            return data.statusCode === '09' ? 'we_bg_row' : '';
        },

        // Handle page size page number
        onPage(event: { page: number; rows: number; }) {
            this.pageSize = event.rows;
            this.pageNumber = event.page;
            this.getDepartmentList();
        },

        async onClickInsertTeacher(item: DEPARTMENT_LIST) {

            this.$popupService.onOpen({
                component: teacherDepartment_action,
                dataProp: {
                    teacherInfoData: item, 
                },
                callback: () => {
                    this.getDepartmentList();
                },
                onClose: () => {
                    this.getDepartmentList();
                }
            });

        },

        async onClickRow(item: DEPARTMENT_LIST) {
            const reqBody = {
                departmentID: this.departmentInfo.departmentID
            };
            const responseDepartmentMember = await requestService.request(API_PATH.TEACHER_DEPARTMENT_LIST, reqBody, false);

            this.$popupService.onOpen({
                component: department_detail,
                dataProp: {
                    department: item,
                    departmentMember: responseDepartmentMember.body.departmentList,
                }
            })
        },

        async onClickAction(item: DEPARTMENT_LIST, statusCode: string) {
            let messageHeader = ''
            let messageAcceptDetail = ''
            let messageRejectDetail = 'You have rejected'
            let btnAcceptClass = 'btn '
            if (statusCode === '01') {
                messageHeader = "Do you want to set to Active ?";
                messageAcceptDetail = 'The record has been set.';
                btnAcceptClass += 'btn-success'
            } else if (statusCode === '02') {
                messageHeader = "Do you want to delete this record?";
                messageAcceptDetail = 'The record has been deleted.';
                btnAcceptClass += 'btn-danger'
            } else {
                messageHeader = "Do you want to hide this record?";
                messageAcceptDetail = 'The record has been set.';
                btnAcceptClass += 'btn-warning'
            }
            this.$confirm.require({
                message: messageHeader,
                header: 'Please Comfirm',
                acceptLabel: 'Yes',
                acceptClass: btnAcceptClass,
                rejectLabel: 'No',
                rejectClass: 'btn btn-secondary',
                accept: async () => {
                    const reqBody = {
                        departmentID: item.departmentID,
                        statusCode: statusCode
                    }
                    await requestService.request(API_PATH.DEPARTMENT_UPDATE, reqBody, false) as DEPARTMENT_LIST;
                    this.getDepartmentList();
                    this.$toast.add({ summary: 'Confirmed', detail: messageAcceptDetail, life: 1000 });
                },
                reject: () => {
                    this.$toast.add({ severity: 'error', summary: 'Rejected', detail: messageRejectDetail, life: 1000 });
                }
            });
        },

        // On click save
        async onClickAddNew() {
            this.$popupService.onOpen({
                component: department_edit,
                dataProp: {
                    department: this.departmentInfo,
                    isRegister: true
                },
                callback: () => {
                    this.getDepartmentList();
                },
                onClose: () => {
                    this.getDepartmentList();
                }
            })
        },

        async onClickEdit(item: DEPARTMENT_LIST) {
            this.$popupService.onOpen({
                component: department_edit,
                dataProp: {
                    department: item,
                    isRegister: false
                },
                callback: () => {
                    this.getDepartmentList();
                },
                onClose: () => {
                    this.getDepartmentList();
                }
            })
        },

        //downlaod excel
        async exportToExcel() {
            const reqBody = {
                userID: "",
                searchKey: this.searchKey
            }
            const response = (await requestService.request(API_PATH.DEPARTMENT_LIST_DOWNLOAD, reqBody, false)) as DEPARTMENT_LIST_RES;
            this.dataTable = response.body?.departmentList.map((data, index) => {
                return {
                    ...data,
                    no: this.startingIndex + index,
                }
            });
            const excelData = this.dataTable.map((data, index) => {
                return {
                    "No": index + 1,
                    "Department ID": data.departmentID,
                    "Department Name": data.departmentName,
                    "Department Description": data.departmentDesc,
                    "Department Manager": data.firstName + '-' + data.lastName,
                    "Status": this.$codeConverter.codeToString(this.statusCodeList, data.statusCode),
                    "First Register Date": this.$format.formatDateTime(data.firstRegisterDate ? data.firstRegisterDate : '', 'yyyy-mm-dd'),
                    "Last Change Date": this.$format.formatDateTime(data.lastChangeDate ? data.lastChangeDate : '', 'yyyy-mm-dd')
                };
            })
            const exportExcelData = [
                {
                    data: excelData
                },
            ];
            exportExcel.exportSheet(exportExcelData, 'Department')
        },
    },
})
</script>

<style scoped>
@import url('./department-list.scss');
</style>