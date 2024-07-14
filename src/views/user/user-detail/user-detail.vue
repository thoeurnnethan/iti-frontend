<template src="./user-detail.html"></template>

<script lang="ts">
import { modalController } from '@ionic/vue';
import { defineComponent, PropType } from 'vue';
import { API_PATH } from '@/shared/common/api-path';
import { USER_DETAIL_REQ,USER_DETAIL_RES, USER_LIST } from '@/shared/types/user-list';
import { RequestService } from '@/shared/services/request-service';
import { GenderCodeList } from '@/shared/common/common';

const requestService = new RequestService();

export default defineComponent({
    name: "user-detail",
    props: {
        userDetail: {
            type: Object as PropType<USER_DETAIL_REQ>,
            required: true,
        },
    },

    data() {
        return {
            userInfo: {} as USER_LIST,
            genderCodeList: GenderCodeList
        }
    },

    mounted() {
        this.getStudentDetailSummary();
    },

    methods: {
        async getStudentDetailSummary() {
            const body = {
                userID:this.userDetail.userID,
                studentID: this.userDetail.specificID
            };
            const response = (await requestService.request(API_PATH.USER_DETAIL, body, false)) as USER_DETAIL_RES;
            this.userInfo = {
                formatDateOfBirth: this.$format.formatDateTime(response.body.dateOfBirth, 'yyyy-mm-dd'),
                ...response.body
            }
        },

        handleClose() {
            modalController.dismiss();
        }
    },
});
</script>
