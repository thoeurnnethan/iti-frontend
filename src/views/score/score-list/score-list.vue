<template src="./score-list.html"></template>

<script lang="ts">
import { API_PATH } from '@/shared/common/api-path';
import { SemesterList, YearList } from '@/shared/common/common';
import { RequestService } from '@/shared/services/request-service';
import { CLASS_LIST, CLASS_LIST_REQ, CLASS_LIST_RES } from '@/shared/types/class-list';
import { DEPARTMENT_LIST, DEPARTMENT_LIST_REQ, DEPARTMENT_LIST_RES } from '@/shared/types/department-list';
import { SCORE_LIST } from '@/shared/types/student-score';

const requestService = new RequestService();

export default {
    data() {
        return {
            semesterList: SemesterList,
            yearList: YearList,
            studentScoreList: [],
            sujectList: [],
            studentScoreInfo: {} as SCORE_LIST[],
            departmentList: [] as DEPARTMENT_LIST[],
            classList: [] as CLASS_LIST[],
            isSelectedClassID : false,
            filterInfo: {
                departmentID: '',
                classID: '',
                classYear: '',
                semester: ''
            }
        }
    },

    watch:{
        'i18n.locale'(){
            this.updateTranslatedYearList()
            this.updateTranslatedSemesterList()
        },
        'filterInfo.departmentID'(){
            this.getClassList()
            this.checkIsSelectClassID
        },
        'filterInfo.classID'(){
            this.checkIsSelectClassID
        }
    },

    computed:{
        checkIsSelectClassID(){
            this.isSelectedClassID = this.filterInfo.classID !== ''
        },
        isDisableSearchBtn(): boolean  {
            return this.filterInfo.classID === ''
        },
        isValidFilterInfo(): boolean{
            return this.filterInfo.departmentID !== '' ||
            this.filterInfo.classID !== '' ||
            this.filterInfo.classYear !== '' ||
            this.filterInfo.semester !== ''
        }
    },

    mounted() {
        this.getDepartmentList()
        this.updateTranslatedYearList()
        this.updateTranslatedSemesterList()
        this.getClassList()
    },

    methods: {
        async onGetStudentScoreList(){
            const reqBody = {
                classInfoID: this.filterInfo.classID + this.filterInfo.classYear + this.filterInfo.semester,
                studentID: '',
                subjectID: ''
            }

            const res = await requestService.request(API_PATH.SCORE_LIST, reqBody, false)
            this.sujectList = res.body.subjects
            this.studentScoreList = res.body.data.map((data: any,index: number) =>{
                return {
                    ...data,
                    seqNo: index + 1,
                    fullName:  `${data.firstName} ${data.lastName}`
                }
            })
        },

        async getDepartmentList() {
            const reqBody: DEPARTMENT_LIST_REQ = {
                userID: '',
                searchKey: '',
                pageSize: 1000,
                pageNumber: 1
            }
            const response = (await requestService.request(API_PATH.DEPARTMENT_LIST, reqBody, false)) as DEPARTMENT_LIST_RES;
            this.departmentList = response.body?.departmentList
        },

        async getClassList() {
            const reqBody: CLASS_LIST_REQ = {
                classID: '',
                departmentID: this.filterInfo.departmentID,
                searchKey: '',
                year: this.filterInfo.classYear,
                semester: this.filterInfo.semester,
                pageSize: 1000,
                pageNumber: 1
            }
            const response = (await requestService.request(API_PATH.CLASS_LIST, reqBody, false)) as CLASS_LIST_RES;
            this.classList = response.body?.classList
        },

        onCellEditComplete(event: { preventDefault?: any; data?: any; newValue?: any; field?: any; }) {
            let { data, newValue, field } = event;
            alert(newValue)
        },

        onClearFilterInfo(){
            this.filterInfo = {
                departmentID: '',
                classID: '',
                classYear: '',
                semester: ''
            }
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
    }
};
</script>

<style scoped>
/* @import url('./score-list.scss'); */
</style>