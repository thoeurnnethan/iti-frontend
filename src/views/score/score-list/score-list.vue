<template src="./score-list.html"></template>

<script lang="ts">
import { API_PATH } from '@/shared/common/api-path';
import { GenderCodeList, SemesterList, YearList } from '@/shared/common/common';
import { ExportExcel } from '@/shared/services/export-excel-class';
import { RequestService } from '@/shared/services/request-service';
import { CLASS_LIST, CLASS_LIST_REQ, CLASS_LIST_RES } from '@/shared/types/class-list';
import { DEPARTMENT_LIST, DEPARTMENT_LIST_REQ, DEPARTMENT_LIST_RES } from '@/shared/types/department-list';
import { SCORE_LIST,Subject } from '@/shared/types/student-score';
import { ref } from 'vue';

const requestService = new RequestService();
const exportExcel = new ExportExcel();

export default {
    data() {
        const dataTable = ref<SCORE_LIST[]>([]);
        return {
            dataTable,
            semesterList: SemesterList,
            genderCodeList: GenderCodeList,
            yearList: YearList,
            studentScoreList: [],
            subjectList: [] as Subject[],
            subject: {},
            request: [] as any,
            studentScoreInfo: {} as SCORE_LIST[],
            departmentList: [] as DEPARTMENT_LIST[],
            classList: [] as CLASS_LIST[],
            classInfo: {} as CLASS_LIST,
            isSelectedClassID : false,
            isClickBtnSearch: false,
            filterInfo: {
                departmentID: '',
                classID: '',
                classYear: '',
                semester: ''
            }
        }
    },

    watch:{
        '$i18n.locale'(){
            this.yearList = this.$codeConverter.codeToStringList(this.yearList,'yearCode')
            this.semesterList = this.$codeConverter.codeToStringList(this.semesterList,'semesterCode')
        },
        'filterInfo.departmentID'(){
            this.checkIsSelectClassID
            this.getClassList()
            this.studentScoreList = []
            this.subjectList = []
        },
        'filterInfo.classID'(){
            this.checkIsSelectClassID
        }, 
        isDisableSearchBtn(){
            this.isClickBtnSearch = false
        }
    },

    computed:{
        checkIsSelectClassID(){
            this.isSelectedClassID = this.filterInfo.classID !== ''
        },
        isDisableSearchBtn(): boolean  {
            return this.filterInfo.classID === '' ||
            this.filterInfo.classYear === '' ||
            this.filterInfo.semester === ''
        },
        isValidFilterInfo(): boolean{
            return this.filterInfo.departmentID !== '' ||
            this.filterInfo.classID !== '' ||
            this.filterInfo.classYear !== '' ||
            this.filterInfo.semester !== ''
        },
        setData(){
            this.filterInfo.departmentID = this.classInfo.departmentID
            this.filterInfo.classID = this.classInfo.classID
            this.filterInfo.classYear = this.classInfo.year
            this.filterInfo.semester = this.classInfo.semester
            this.onClearFilterInfo(false)
        },
        checkTotal(): boolean{
            return this.studentScoreList.length === 0;
        }
    },

    mounted() {
        this.getDepartmentList()
        this.getClassList()
        this.yearList = this.$codeConverter.codeToStringList(this.yearList,'yearCode')
        this.semesterList = this.$codeConverter.codeToStringList(this.semesterList,'semesterCode')
    },

    methods: {
        onCellEditComplete(event: { data: any; newValue: any; field: any;}) {
            let { data, newValue, field } = event;
            if(newValue === null || newValue === 0){
                return
            }else if(data[field] !== newValue){
                data[field] = newValue
                this.subject = this.subjectList.filter(data => data.subjectName === field)
                const scoreObj = {
                    studentID: data.studentID,
                    subjectID: this.subject[0].subjectID,
                    score: newValue
                }
                this.request.push(scoreObj)
                this.request = Array.from(
                    this.request.reduce((map: { set: (arg0: string, arg1: any) => void; }, item: { studentID: any; subjectID: any; }) => {
                        const key = `${item.studentID}-${item.subjectID}`;
                        map.set(key, item);
                        return map;
                    }, new Map()).values()
                );
            }
        },

        async onClickSave(){
            const reqBody = {
                classID: this.filterInfo.classID,
                classYear: this.filterInfo.classYear,
                semester: this.filterInfo.semester,
                studentScoreList: this.request
            }
            const res = await requestService.request(API_PATH.SCORE_REGISTR, reqBody, true);
            if(res.header.result){
                this.subjectList = res.body.subjects
                this.studentScoreList = res.body.data.map((data: any,index: number) =>{
                    return {
                        ...data,
                        seqNo: index + 1,
                        fullName:  `${data.firstName} ${data.lastName}`
                    }
                })
                this.request = []
            }
        },

        async onGetStudentScoreList(){
            this.isClickBtnSearch = true
            const reqBody = {
                classInfoID: this.filterInfo.classID + this.filterInfo.classYear + this.filterInfo.semester,
                studentID: '',
                subjectID: ''
            }

            const res = await requestService.request(API_PATH.SCORE_LIST, reqBody, false)
            if(res.body.data){
                this.subjectList = res.body.subjects
                this.studentScoreList = res.body.data.map((data: any,index: number) =>{
                    return {
                        ...data,
                        seqNo: index + 1,
                        fullName:  `${data.firstName} ${data.lastName}`
                    }
                })
                this.dataTable = res.body?.data.map((data: any, index: number) => {
                    return {
                        no: index + 1,
                        ...data
                    }
                });
            }
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
                searchKey: '',
                departmentID: this.filterInfo.departmentID,
                year: this.filterInfo.classYear,
                semester: this.filterInfo.semester,
                pageSize: 1000,
                pageNumber: 1
            }
            const response = (await requestService.request(API_PATH.CLASS_LIST, reqBody, false)) as CLASS_LIST_RES;
            this.classList = response.body?.classList
        },

        onClearFilterInfo(isClearFilter: boolean){
            this.studentScoreList = []
            this.subjectList = []
            if(isClearFilter){
                this.classInfo = {} as CLASS_LIST
                this.filterInfo = {
                    departmentID: '',
                    classID: '',
                    classYear: '',
                    semester: ''
                }
            }
        },

        async exportToExcel() {
            const excelData = this.dataTable.map(student => {
                const subjectScores = this.subjectList.reduce((scores, subject) => {
                    const score = student[subject.subjectName];
                    if (score !== undefined) {
                        scores[subject.subjectName] = score;
                    }
                    return scores;
                }, {} as { [key: string]: number });
                return {
                    "No": student.no,
                    "Student ID": student.studentID,
                    "Student Name": `${student.firstName} ${student.lastName}`,
                    "Gender": this.$codeConverter.codeToString(this.genderCodeList,student.gender),
                    "Phone Number": this.$phoneNumberFormater.formatPhoneNumber(student.phoneNumber),
                    ...subjectScores, 
                    "Total Score": student.totalScore,
                    "Average": student.average,
                    "Grade": student.grade
                };
            });
            const exportExcelData = [
                {
                    data: excelData
                },
            ];
            exportExcel.exportSheet(exportExcelData, 'student-score')
        },
    }
};
</script>

<style scoped>
/* @import url('./score-list.scss'); */
</style>