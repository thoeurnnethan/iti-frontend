<template src="./user-detail.html"></template>

<script lang="ts">
import { modalController } from '@ionic/vue';
import { defineComponent, PropType } from 'vue';
import { USER_LIST } from '@/shared/types/user-list';
import { GenderCodeList, UserRoleList } from '@/shared/common/common';

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
            userRoleList: UserRoleList,
            userRole: ''
        }
    },

    computed:{
        isStudentRole(): boolean{
            return this.userRole === '04'
        }
    },

    mounted(){
        this.userInfo = {
            ...this.userDetail,
            dateOfBirth: this.$format.formatDateTime(this.userDetail.dateOfBirth,'yyyy-mm-dd','Slash','FullMonth'),
            
        }
        this.userRole = this.userDetail.roleID
    },

    methods: {
        handleClose() {
            modalController.dismiss();
        }
    },
});
</script>
