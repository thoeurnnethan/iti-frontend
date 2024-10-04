<template src="./class-list.html"></template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { API_PATH } from '@/shared/common/api-path';
import { RequestService } from '@/shared/services/request-service';
import { CLASS_LIST, CLASS_LIST_REQ, CLASS_LIST_RES } from '@/shared/types/class-list';
import { ExportExcel } from '@/shared/services/export-excel-class';
import class_edit from '../class-edit/class-edit.vue';
import { YearList, SemesterList, globalStatusCodeList, ClassTypeList } from '@/shared/common/common';
import studentClass_action from '@/views/class/studentClass-action/studentClass-action.vue';
import class_upgrade from '../class-upgrade/class-upgrade.vue';
import class_detail from '../class-detail/class-detail.vue';
import MyLoading from '../../MyLoading.vue';
import { DEPARTMENT_LIST, DEPARTMENT_LIST_REQ, DEPARTMENT_LIST_RES } from '@/shared/types/department-list';

const requestService = new RequestService();
const exportExcel = new ExportExcel();

export default defineComponent({
    name: "class-list",
    inheritAttrs: false,
    components: {
        MyLoading
    },
    data() {
        const dataTable = ref<CLASS_LIST[]>([]);
        return {
            yearList: YearList,
            semesterList: SemesterList,
            statusCodeList: globalStatusCodeList,
            classTypeList: ClassTypeList,
            classList: [] as CLASS_LIST[],
            classInfo: {} as CLASS_LIST,
            departmentList: [] as DEPARTMENT_LIST[],
            selectedDepartment: '',
            selectedYear: '',
            selectedStatus: '',
            selectSemester: '',
            searchKey: '',
            classID: '',
            Loading: false,
            totalCount: 0,
            pageSize: 10,
            pageNumber: 0,
            dataTable,
            lastLevelClass: '',
            classInfoUpdate: {
                classID: '',
                departmentID: '',
                departmentName: '',
                className: '',
                classDesc: '',
                year: '',
                generation: '',
                semester: '',
                statusCode: '',
            } as CLASS_LIST
        }
    },

    watch:{
        '$i18n.locale'(){
            this.updateTranslatedSemesterList()
            this.updateTranslatedYearList()
        }
    },

    mounted() {
        this.getClassList()
        this.getDepartmentList()
        this.updateTranslatedSemesterList()
        this.updateTranslatedYearList()
    },

    methods: {
        async getClassList() {
            this.Loading = true;
            const reqBody: CLASS_LIST_REQ = {
                classID: this.classID,
                departmentID: this.selectedDepartment,
                searchKey: this.searchKey,
                year: this.selectedYear === 'All' ? '' : this.selectedYear,
                semester: this.selectSemester === 'All' ? '' : this.selectSemester,
                pageSize: this.pageSize,
                pageNumber: this.pageNumber + 1
            }
            const response = (await requestService.request(API_PATH.CLASS_LIST, reqBody, false)) as CLASS_LIST_RES;
            this.classList = response.body?.classList.map((data,index) =>{
                return {
                    ...data,
                    no: index + 1
                }
            })
            // Check isLast only when search by ClassID, So default will be false
            if(this.checkIsValidPrefixClassID(this.classID)){
                let lastClassIndex = 0;
                this.classList.forEach((item,index) =>{
                    if (
                        parseInt(item.year) > parseInt(this.classList[lastClassIndex].year) ||
                        (parseInt(item.year) === parseInt(this.classList[lastClassIndex].year) && 
                        parseInt(item.semester) > parseInt(this.classList[lastClassIndex].semester))
                    ) {
                        lastClassIndex = index;
                    }
                })
                this.classList.forEach((item, index) => {
                    if(Number(item.year) >= 4 && Number(item.semester) >= 2){
                        item.isLast = false;
                    }else{
                        item.isLast = index === lastClassIndex;
                    }
                });
            }
            this.totalCount = response.body?.totalCount;
            this.Loading = false;
        },

        checkIsValidPrefixClassID(classID: string): boolean{
            return classID.length >= 6;
        },

        async getDepartmentList() {
            const reqBody: DEPARTMENT_LIST_REQ = {
                userID: "",
                searchKey: this.searchKey,
                pageSize: 1000,
                pageNumber: 1
            }
            const response = (await requestService.request(API_PATH.DEPARTMENT_LIST, reqBody, false)) as DEPARTMENT_LIST_RES;
            this.departmentList = response.body?.departmentList
        },

        rowClass(data: { statusCode: string; }) {
            return data.statusCode === '09' ? 'we_bg_row' : '';
        },

        async onClickRow() {
            const body_1 = {
                classID: this.classInfo?.classID,
                classYear: this.classInfo?.year, 
                semester: this.classInfo?.semester, 
            }; 
            const responseSubject = await requestService.request(API_PATH.SUBJECT_LIST, body_1, false);

            const body_2 = {
                classInfoID: this.classInfo?.classInfoID
            };
            const responseStudent = await requestService.request(API_PATH.STUDENT_CLASS_LIST, body_2, false);

            // Format the dateOfBirth in studentList
            const formattedStudentList = responseStudent.body.studentList.map(student => {
                return {
                    ...student,
                    dateOfBirth: this.$format.formatDateTime(student.dateOfBirth,'yyyy-mm-dd','Slash','FullMonth')
                };
            });

            this.$popupService.onOpen({
                component: class_detail,
                dataProp: {
                    subjectDetails: responseSubject.body.subjectList,
                    studentDetails: formattedStudentList
                } 
            });
            
        },


        onPage(event: { page: number; rows: number; }) {
            this.pageNumber = event.page;
            this.pageSize = event.rows;
            this.getClassList();
        },

        async onClickAction(item: CLASS_LIST, statusCode: string) {
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
                header: 'Please Confirm',
                acceptLabel: 'Yes',
                acceptClass: btnAcceptClass,
                rejectLabel: 'No',
                rejectClass: 'btn btn-secondary',
                accept: async () => {
                    const reqBody = {
                        ...item,
                        cyear: item.year,
                        statusCode: statusCode
                    }
                    const res = await requestService.request(API_PATH.CLASS_UPDATE, reqBody, false);
                    if (res.header.result) {
                        this.getClassList();
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
                component: class_edit,
                dataProp: {
                    classInfoData: this.classInfo,
                    isInsert: true
                },
                callback: () => {
                    this.getClassList();
                },
                onClose: () => {
                    this.getClassList();
                }
            })
        },

        onClickInsertStudent(item: CLASS_LIST) {
            this.$popupService.onOpen({
                component: studentClass_action,
                dataProp: {
                    studentInfoData: item, 
                },
                callback: () => {
                    this.getClassList();
                },
                onClose: () => {
                    this.getClassList();
                }
            });
        },

        async onClickEdit(item: CLASS_LIST) {
            this.$popupService.onOpen({
                component: class_edit,
                dataProp: {
                    classInfoData: item,
                    isInsert: false
                },
                callback: () => {
                    this.getClassList();
                },
                onClose: () => {
                    this.getClassList();
                }
            })
        },

        async exportToExcel() {
            const reqBody: CLASS_LIST_REQ = {
                classID: '',
                departmentID: this.selectedDepartment,
                searchKey: this.searchKey,
                year: this.selectedYear === 'All' ? '' : this.selectedYear,
                semester: this.selectSemester === 'All' ? '' : this.selectSemester
            }
            const response = (await requestService.request(API_PATH.CLASS_LIST_DOWNLOAD, reqBody, false)) as CLASS_LIST_RES;
            this.dataTable = response.body?.classList.map((data, index) => {
                return {
                    ...data,
                    no: 1 + index,
                }
            });

            const excelData = this.dataTable.map((data, index) => {
                return {
                    "លេខរៀង": index + 1,
                    "លេខសម្គាល់ថ្នាក់រៀន": data.classID,
                    "ឈ្មោះថ្នាក់រៀន": data.className,
                    "ឆ្នាំ": data.year,
                    "ឆមាស": data.semester,
                    "ជ៉នាន់": data.generation,
                    "លម្អិតអំពីថ្នាក់រៀន": data.classDesc,
                    "ប្រភេទថ្នាក់រៀន": this.$codeConverter.codeToString(this.classTypeList, data.classType),
                    "ឈ្មោះដេប៉ាតឺម៉ង់": data.departmentName,
                    "ស្ថានភាព": this.$codeConverter.codeToString(this.statusCodeList, data.statusCode),
                    "ថ្ងៃចុះបញ្ជីដំបូង": this.$format.formatDateTime(data.firstRegisterDate ? data.firstRegisterDate : '', 'yyyy-mm-dd'),
                    "ថ្ងៃផ្លាស់ប្តូរចុងក្រោយ": this.$format.formatDateTime(data.lastChangeDate ? data.lastChangeDate : '', 'yyyy-mm-dd')
                };
            })
            const exportExcelData = [
                {
                    data: excelData
                },
            ];
            exportExcel.exportSheet(exportExcelData, 'Class info')
        },

        onClickUpgrade(item: CLASS_LIST) {
            this.$popupService.onOpen({
                component: class_upgrade,
                dataProp: {
                    classInfoData: item
                },
                callback: () => {
                    this.getClassList();
                },
                onClose: () => {
                    this.getClassList();
                }
            })
        },

        updateTranslatedSemesterList() {
            this.semesterList = this.semesterList.map(item => ({
                codeValue: item.codeValue,
                codeValueDesc: this.$codeConverter.codeToString(this.semesterList, String(item.codeValue), 'semesterCode')
            }));
        },

        updateTranslatedYearList() {
            this.yearList = this.yearList.map(item => ({
                codeValue: item.codeValue,
                codeValueDesc: this.$codeConverter.codeToString(this.yearList, String(item.codeValue), 'yearCode')
            }));
        },
    },
})
</script>

<style scoped>
@import url('./class-list.scss');
</style>