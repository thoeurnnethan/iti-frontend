<template src="./user-register.html"></template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { FormItem } from '@/shared/types/menu-list';
import { USER_LIST, USER_LIST_REQ, USER_LIST_RES } from '@/shared/types/user-list';
import { UserRegister } from './UserRegister';
import { API_PATH } from '@/shared/common/api-path';
import { RequestService } from '@/shared/services/request-service';
import { UserRoleList, GenderCodeList } from '@/shared/common/common';

export default defineComponent({

    name: 'UserRegister',
    data() {
        const dataTable = ref<USER_LIST[]>([]);
        return {
            formList: [] as FormItem[],
            userRoleList: UserRoleList,
            genderCodeList: GenderCodeList,
            select_Role: '03',
            dataTable,
            searchKey: '',
            totalCount: 0,
            pageSize: 10,
            pageNumber: 0,
            startingIndex: 1,
            userInfoUpdate: {
                roleID: '03',
                firstName: '',
                lastName: '',
                nickName: '',
                gender: '',
                dateOfBirth: '',
                placeOfBirth: '',
                address: '',
                phone: '',
                email: '',
                passwd: '',
                imageUrl: '',
            } as USER_LIST,
        }
    },

    mounted() {
        this.getFormList();
    },

    computed: {
        isValidForm(): boolean {
            return  this.userInfoUpdate.firstName !== '' &&
                    this.userInfoUpdate.lastName !== '';
        }
    },

    methods: {

        async teacherSubmit(_item: USER_LIST) {
            if (!this.isValidForm) {
                alert('Please fill out all required fields');
                return;
            }
            console.table(this.userInfoUpdate);
            
            const reqBody: USER_LIST = this.userInfoUpdate;
            const response = (await new RequestService().request(API_PATH.USER_REGISTER, reqBody, false)) as USER_LIST_RES;
            this.$router.push('/user-list');
            console.log(response);
        },

        getFormList() {
            this.formList = UserRegister.getFormList();
        },

        selectRole(){
            this.select_Role
        },

        handleFileUpload(event: Event) {
            const target = event.target as HTMLInputElement;
            const file = target.files ? target.files[0] : null;
            this.userInfoUpdate.imageUrl = file ? file.name : '';
            console.log(this.userInfoUpdate.imageUrl);
        }
    },
});
</script>

<style>
@import url('./user-register.scss');
</style>
