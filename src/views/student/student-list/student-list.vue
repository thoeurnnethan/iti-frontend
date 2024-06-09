<template src="./student-list.html"></template>

<script lang="ts">
import { API_PATH } from '@/shared/common/api-path';
import { STUDENT_LIST,STUDENT_LIST_REQ, STUDENT_LIST_RES } from '@/shared/types/student-list';
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
            totalCount: 0,
            pageSize: 15 ,
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
            
            const response = (await requestService.request(API_PATH.STUDENT_LIST,body) ) as STUDENT_LIST_RES;
            this.totalCount = response.body.totalCount;
            this.studentList = response.body.studentList;
        },

        onClickRow(data: STUDENT_LIST){
            this.$popupService.onOpen({
                component: student_detail,
                dataProp: {
                    notification: data
                }
            })
        }
    },

})
</script>

<style>
@import url('./student-list.scss');
</style>