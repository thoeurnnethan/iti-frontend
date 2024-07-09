<template src="./user-register.html"></template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { FormItem } from '@/shared/types/menu-list';
import { UserRegister } from './UserRegister';
import { UserRoleList, GenderCodeList } from '@/shared/common/common';

export default defineComponent({
    data() {
        return {
            formList: [] as FormItem[],
            userRoleList: UserRoleList,
            genderCodeList: GenderCodeList,
            select_Role: '',
            roleTitle: '',
        }
    },

    mounted() {
        this.getFormList();
    },

    methods: {
        getFormList() {
            this.formList = UserRegister.getFormList();
        },

        selectRole(){
            this.roleTitle = this.select_Role
        }
    },
});
</script>

<style>
@import url('./user-register.scss');
</style>
