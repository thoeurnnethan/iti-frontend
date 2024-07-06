<template src="./class-insert.html"></template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { API_PATH } from '@/shared/common/api-path';
import { RequestService } from '@/shared/services/request-service';
import { CLASS_LIST, CLASS_LIST_RES } from '@/shared/types/class-list';
import { StandardCodeData } from '@/shared/types/standard-code';

export default defineComponent({
    name: 'ClassInsert',
    data() {
        const dataTable = ref<CLASS_LIST[]>([]);
        return {
            dataTable,
            searchKey: '',
            totalCount: 0,
            pageSize: 10,
            pageNumber: 0,
            startingIndex: 1,
            classInfoUpdate: {
                classID: '',
                className: '',
                departmentID: '',
                classDesc: '',
                statusCode: ''
            } as CLASS_LIST,
            statusCodeList: [
                { codeValue: '01', codeValueDesc: 'Active' },
                { codeValue: '02', codeValueDesc: 'Inactive' },
            ] as StandardCodeData[]
        }
    },
    computed: {
        isValidForm(): boolean {
            return  this.classInfoUpdate.className !== '' &&
                    this.classInfoUpdate.classDesc !== '';
        }
    },
    methods: {
        async classInsert(_item: CLASS_LIST) {
            if (!this.isValidForm) {
                alert('Please fill out all required fields');
                return;
            }
            const reqBody: CLASS_LIST = this.classInfoUpdate;
            const response = (await new RequestService().request(API_PATH.CLASS_REGISTER, reqBody, true)) as CLASS_LIST_RES;
            this.$router.push('/class-list');
            console.log(response);
        }
    }
});
</script>

<style scoped>
@import url('./class-insert.scss');
</style>
