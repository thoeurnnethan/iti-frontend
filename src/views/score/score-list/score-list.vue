<template src="./score-list.html"></template>

<script lang="ts">
import { API_PATH } from '@/shared/common/api-path';
import { RequestService } from '@/shared/services/request-service';
import { SCORE_LIST } from '@/shared/types/student-score';

const requestService = new RequestService();

export default {
    data() {
        return {
            studentScoreList: [],
            sujectList: [],
            studentScoreInfo: {} as SCORE_LIST[]
        }
    },
    mounted() {
        this.onGetStudentScoreList()
    },
    methods: {
        async onGetStudentScoreList(){
            const reqBody = {
                classInfoID: 'CLS100111',
                studentID: '',
                subjectID: ''
            }

            const res = await requestService.request(API_PATH.SCORE_LIST, reqBody, false)
            this.studentScoreList = res.body.data
            this.sujectList = res.body.subjects
            console.log('StudentList',this.studentScoreList);
            console.log('Score',this.sujectList);
        }
    }
};
</script>

<style scoped>
/* @import url('./score-list.scss'); */
</style>