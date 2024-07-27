<template src="./class-insert.html"></template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { API_PATH } from '@/shared/common/api-path';
import { RequestService } from '@/shared/services/request-service';
import { CLASS_LIST, CLASS_LIST_RES } from '@/shared/types/class-list';
import MyLoading from '../../MyLoading.vue';
import { YearList , SemesterList , generation , time } from '@/shared/common/common';

const requestService = new RequestService();
export default defineComponent({
    name: 'ClassInsert',
    components: {
        MyLoading
    },
    
    data() {
        const dataTable = ref<CLASS_LIST[]>([]);
        return {
            year: YearList,
            semester: SemesterList,
            generation: generation,
            time: time,
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
            await requestService.request(API_PATH.CLASS_REGISTER, reqBody, true) as CLASS_LIST_RES;
            this.Loading = false;
        },

        backToList(){
            this.$router.push('/class-list');
        },
    }
});
</script>

<style scoped>
@import url('./class-insert.scss');
</style>
