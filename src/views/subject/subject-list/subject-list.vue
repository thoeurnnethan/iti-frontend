<template src="./subject-list.html"></template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { API_PATH } from '@/shared/common/api-path';
import { RequestService } from '@/shared/services/request-service';
import { SUBJECT_LIST, SUBJECT_LIST_DOWNLOAD, SUBJECT_LIST_REQ, SUBJECT_LIST_RES } from '@/shared/types/subject-list';
import subject_action from '../subject-action/subject-action.vue';
import { ExportExcel } from '@/shared/services/export-excel-class';
import { YearList, SemesterList, globalStatusCodeList } from '@/shared/common/common';
import MyLoading from '../../MyLoading.vue';

const requestService = new RequestService();
const exportExcel = new ExportExcel();

export default defineComponent({
    name: "class-list",
    inheritAttrs: false,
    components: {
        MyLoading
    },
    data() {
        const dataTable = ref<SUBJECT_LIST_DOWNLOAD[]>([]);
        return {
            yearList: YearList,
            semesterList: SemesterList,
            statusCodeList: globalStatusCodeList,
            subjectList: [] as SUBJECT_LIST[],
            subjectInfo: {} as SUBJECT_LIST,
            selectTime: '',
            searchKey: '',
            Loading: false,
            totalCount: 0,
            pageSize: 10,
            pageNumber: 0,
            startingIndex: 1,
            expandedRowGroups: null,
            selectClassId: '',
            dataTable
        }
    },

    mounted() {
        this.getSubjectList();
    },

    methods: {

        async getSubjectList() {
            this.Loading = true;
            const reqBody: SUBJECT_LIST_REQ = {
                classID: this.selectClassId,
                classYear: '',
                semester: '',
                pageSize: this.pageSize,
                pageNumber: this.pageNumber + 1,
                searchKey: this.searchKey,
            }
            const response = (await requestService.request(API_PATH.SUBJECT_LIST, reqBody, false)) as SUBJECT_LIST_RES;
            this.totalCount = response.body?.totalCount;
            this.subjectList = response.body?.subjectList
            this.dataTable = response.body.subjectList
            this.Loading = false;
        },

        calculateTotalSubjects(classInfoID: string) {
            let total = 0;
            if (this.subjectList) {
                total = this.subjectList.filter(subject => subject.classInfoID === classInfoID).length;
            }
            return total;
        },

        rowClass(data: { statusCode: string; }) {
            return data.statusCode === '09' ? 'we_bg_row' : '';
        },

        onPage(event: { page: number; rows: number; }) {
            this.pageNumber = event.page;
            this.pageSize = event.rows;
            this.getSubjectList();
        },

        onClickAction(item: SUBJECT_LIST, statusCode: string) {
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
                        ...item,
                        classID: item.classInfoID,
                        subjectList: [{
                            subjectID: item.subjectID,
                            statusCode: statusCode
                        }]
                    }
                    const res = await requestService.request(API_PATH.SUBJECT_UPDATE, reqBody, false);
                    if (res.header.result) {
                        this.getSubjectList();
                        this.$toast.add({ summary: 'Confirmed', detail: messageAcceptDetail, life: 1000 });
                    }
                },
                reject: () => {
                    this.$toast.add({ severity: 'error', summary: 'Rejected', detail: messageRejectDetail, life: 1000 });
                }
            });
        },

        async onClickInsert() {
            this.$popupService.onOpen({
                component: subject_action,
                dataProp: {
                    subjectInfoData: this.subjectInfo,
                    isInsert: true,
                    isAdd: false
                },
                callback: () => {
                    this.getSubjectList();
                },
                onClose: () => {
                    this.getSubjectList();
                }
            })
        },

        async onClickEdit(item: SUBJECT_LIST) {
            this.$popupService.onOpen({
                component: subject_action,
                dataProp: {
                    subjectInfoData: item,
                    isInsert: false,
                    isAdd: false
                },
                callback: () => {
                    this.getSubjectList();
                },
                onClose: () => {
                    this.getSubjectList();
                }
            })
        },

        async onClickAdd(item: SUBJECT_LIST) {
            // Filter subjects related to the selected class
            const filteredSubjects = this.subjectList.filter(subject => subject.classInfoID === item.classInfoID);

            this.$popupService.onOpen({
                component: subject_action,
                dataProp: {
                    subjectInfoData: filteredSubjects,
                    isInsert: true,
                    isAdd: true
                },
                callback: () => {
                    this.getSubjectList();
                },
                onClose: () => {
                    this.getSubjectList();
                }
            });
        },

        exportToExcel() {
            const excelData = this.dataTable.map((data, index) => {
                return {
                    "No": index + 1,
                    "Class Name": data.className,
                    "Year": data.year,
                    "Semester": data.semester,
                    "Subject Name": data.subjectName,
                    "Subject Description": data.subjectDesc
                };
            })
            const exportExcelData = [
                {
                    data: excelData
                },
            ];
            exportExcel.exportSheet(exportExcelData, 'Subject info')
        },

    },
})
</script>

<style scoped>
/* @import url('./subject-list.scss'); */
</style>