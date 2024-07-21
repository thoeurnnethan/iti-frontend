<template src="./user-detail.html"></template>

<script lang="ts">
import { modalController } from '@ionic/vue';
import { defineComponent, PropType } from 'vue';
import { USER_LIST } from '@/shared/types/user-list';
import { GenderCodeList } from '@/shared/common/common';

export default defineComponent({
    name: "user-detail",
    props: {
        userDetail: {
            type: Object as PropType<USER_LIST>,
            required: true,
        },
    },

    data() {
        return {
            userInfo: {} as any,
            genderCodeList: GenderCodeList,
        }
    },

    mounted(){
        this.userInfo = {
            formatDOB: this.$format.formatDateTime(this.userDetail.dateOfBirth,'yyyy-mm-dd','Slash','FullMonth'),
            ...this.userDetail
            
        }
        console.log(this.userInfo);

    },

    methods: {
        handleClose() {
            modalController.dismiss();
        }
    },
});
</script>
