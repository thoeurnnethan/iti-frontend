<template src="./student-list.html"></template>

<script lang="ts">
import { API_PATH } from '@/shared/common/api-path';
import { STUDENT_DETAILS_RES, STUDENT_LIST,STUDENT_LIST_REQ, STUDENT_LIST_RES, ACADEMIC_LIST,PARENT_LIST } from '@/shared/types/student-list';
import { defineComponent } from 'vue';
import student_detail from '../student-detail/student-detail.vue';
import { RequestService } from '@/shared/services/request-service';

const requestService = new RequestService();

export default defineComponent({
    name: "student-list",
    inheritAttrs: false,
    components: {
        // 
    },

    data() {
        return {
            studentList: [] as STUDENT_LIST[],
            studentInfo: {} as STUDENT_LIST,
            parentList: [] as PARENT_LIST[],
            academicList: [] as ACADEMIC_LIST[],
            totalCount: 0,
            pageSize: 10 ,
            pageNumber: 1 
        }
    },
    mounted() {
        this.getStudentList()
    },

    methods: {
        async getStudentList(){
            const body: STUDENT_LIST_REQ={
                userID: "",
                pageSize: this.pageSize,
                pageNumber: this.pageNumber
            }
            
            const response = (await requestService.request(API_PATH.STUDENT_LIST,body, false) ) as STUDENT_LIST_RES;
            this.totalCount = response.body.totalCount;
            this.studentList = response.body.studentList;
        },
        async getStudentDetail(){
            const body={
                userID: "",
                studentID: this.studentInfo.studentID,
            }
            
            const response = (await requestService.request(API_PATH.STUDENT_DETAIL,body, false) ) as STUDENT_DETAILS_RES;
            this.studentInfo  = response.body.studentInfo,
            this.academicList =  response.body.academicList,
            this.parentList =  response.body.parentList
        },

        onClickRow(data: STUDENT_LIST){
            this.$popupService.onOpen({
                component: student_detail,
                dataProp: {
                    studentDetails: data
                }
            })
        }
    },

})
</script>

<style>
@import url('./student-list.scss');
</style>