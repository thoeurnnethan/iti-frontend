<template src="./student-detail.html"></template>

<script lang="ts">
import { modalController } from '@ionic/vue';
import { defineComponent, PropType } from 'vue';
import { API_PATH } from '@/shared/common/api-path';
import { STUDENT_DETAIL_REQ, STUDENT_DETAIL_RES } from '@/shared/types/student-detail';
import { RequestService } from '@/shared/services/request-service';

const requestService = new RequestService();

export default defineComponent({
    name: "student-detail",
    props: {
        notification: {
            type: Object as PropType<STUDENT_DETAIL_REQ>,
            required: true,
        },
    },

    data() {
        return {
            studentDetail: {} as STUDENT_DETAIL_RES
        }
    },

    mounted() {
        this.getStudentDetailSummary()
    },

    methods: {
        async getStudentDetailSummary(){
            const body= {
                studentID: this.notification.studentID
            }
            const response = this.studentDetail = (await requestService.request(API_PATH.STUDENT_DETAIL, body) ) as STUDENT_DETAIL_RES;
            this.studentDetail = response
        },

        handleClose(){
            modalController.dismiss()
        }
    },
})
</script>