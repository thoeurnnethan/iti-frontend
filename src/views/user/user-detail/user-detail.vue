<template src="./user-detail.html"></template>

<script lang="ts">
import { modalController } from '@ionic/vue';
import { ACADEMIC_LIST, PARENT_LIST, STUDENT_DETAILS_RES } from '@/shared/types/student-list';
import { defineComponent, PropType } from 'vue';
import { API_PATH } from '@/shared/common/api-path';
import { STUDENT_DETAIL_REQ } from '@/shared/types/student-detail';
import { RequestService } from '@/shared/services/request-service';

const requestService = new RequestService();

export default defineComponent({
    name: "user-detail",
    props: {
        userDetail: {
            type: Object as PropType<STUDENT_DETAIL_REQ>,
            required: true,
        },
    },

    data() {
        return {
            parentList: [] as PARENT_LIST[],
            academicList: [] as ACADEMIC_LIST[],
            studentDetail: {} as STUDENT_DETAILS_RES
        }
    },

    mounted() {
        this.getStudentDetailSummary();
    },

    methods: {
        async getStudentDetailSummary() {
            const body = {
                studentID: this.userDetail.studentID
            };
            try {
                const response = (await requestService.request(API_PATH.STUDENT_DETAIL, body, false)) as STUDENT_DETAILS_RES;
                this.studentDetail = response;
                console.log(this.studentDetail);
                
                this.parentList = response.body.parentList;
                this.academicList = response.body.academicList;
                
            } catch (error) {
                console.error("Error fetching student details:", error);
            }
        },

        handleClose() {
            modalController.dismiss();  
        }
    },
});
</script>
