<template src="./class-insert.html"></template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { API_PATH } from '@/shared/common/api-path';
import { RequestService } from '@/shared/services/request-service';
import { CLASS_LIST, CLASS_LIST_RES } from '@/shared/types/class-list';
import MyLoading from '../../MyLoading.vue';
import { DEPARTMENT_LIST_REQ, DEPARTMENT_LIST_RES } from '@/shared/types/department-list';
import { year , semester , generation , time } from '@/shared/common/common';

const requestService = new RequestService();
export default defineComponent({
    name: 'ClassInsert',
    components: {
        MyLoading
    },
    
    data() {
        const dataTable = ref<CLASS_LIST[]>([]);
        return {
            year: year,
            semester:semester,
            generation:generation,
            time:time,
            Loading: false,
            dataTable,
            searchKey: '',
            totalCount: 0,
            pageSize: 10,
            pageNumber: 0,
            startingIndex: 1,
            classInfoUpdate: {
                departmentID: '',
                className: '',
                classDesc: '',
                year: '',
                generation: '',
                time: '',
                semester: 0,
                statusCode: '01',
            } as CLASS_LIST,
        }
    },

    computed: {
        isValidForm(): boolean {
            return this.classInfoUpdate.className !== '';
        }
    },
    
    methods: {
        async classInsert(_item: CLASS_LIST) {
            this.Loading = true;
            if (!this.isValidForm) {
                alert('Please fill out all required fields');
                return;
            }
            const reqBody = {
                cyear: this.classInfoUpdate.year,
                ctime: this.classInfoUpdate.time,
                ...this.classInfoUpdate,
            }
            const response = (await new RequestService().request(API_PATH.CLASS_REGISTER, reqBody, true)) as CLASS_LIST_RES;
            console.table(response);
            this.Loading = false;
        },

        backToList(){
            this.$router.push('/class-list');
        }

    }
});
</script>

<style scoped>
@import url('./class-insert.scss');
</style>
