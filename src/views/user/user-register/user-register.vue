<template src="./user-register.html"></template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { FormItem } from '@/shared/types/menu-list';
import { UserRegister } from './UserRegister';

export default defineComponent({
    data() {
        return {
            formList: [] as FormItem[],
        }
    },

    mounted() {
        this.getFormList();
    },

    methods: {
        getFormList() {
            this.formList = UserRegister.getFormList();
        }
    },
});
</script>

<style>
@import url('./user-register.scss');
</style>
