<template src="./class-edit.html"></template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import { CLASS_LIST } from '@/shared/types/class-list';
import { API_PATH } from '@/shared/common/api-path';
import { RequestService } from '@/shared/services/request-service';
import { globalStatusCodeList, YearList, SemesterList, generation, ClassTypeList } from '@/shared/common/common';
import { DEPARTMENT_LIST, DEPARTMENT_LIST_REQ, DEPARTMENT_LIST_RES } from '@/shared/types/department-list';
import { modalController } from '@ionic/vue';

const requestService = new RequestService();

export default defineComponent({
    name: 'class-edit',
    props: {
        classInfoData: {
            type: Object as PropType<CLASS_LIST>,
            required: true
        },
        isInsert: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            classInfo: {
                departmentID: '',
                className: '',
                classDesc: '',
                year: '',
                generation: '',
                semester: '',
                statusCode: '01',
                classType: '01'
            } as CLASS_LIST,
            classInfoUpdate: {} as CLASS_LIST,
            departmentList: [] as DEPARTMENT_LIST[],
            selectedStatus: null,
            statusCodeList: globalStatusCodeList,
            yearList: YearList,
            semesterList: SemesterList,
            generation: generation,
            classTypeList: ClassTypeList
        };
    },
    computed: {
        isValidInsert(): boolean {
            return (
                this.classInfo.className !== '' &&
                this.classInfo.departmentID !== '' &&
                this.classInfo.year !== '' &&
                this.classInfo.semester !== '' &&
                this.classInfo.generation !== '' &&
                this.classInfo.classDesc !== '' &&
                this.classInfo.statusCode !== ''
            );
        },
        isValidUpdate(): boolean {
            return (
                this.classInfo.className !== this.classInfoUpdate.className ||
                this.classInfo.departmentID !== this.classInfoUpdate.departmentID ||
                this.classInfo.year !== this.classInfoUpdate.year ||
                this.classInfo.semester !== this.classInfoUpdate.semester ||
                this.classInfo.generation !== this.classInfoUpdate.generation ||
                this.classInfo.classDesc !== this.classInfoUpdate.classDesc ||
                this.classInfo.statusCode !== this.classInfoUpdate.statusCode
            );
        }
    },

    watch:{
        '$i18n.locale'(){
            this.semesterList = this.$codeUtil.translateSemesterlist()
            this.yearList = this.$codeUtil.translateYearlist()
            this.classTypeList = this.$codeUtil.translateClassTypelist()
        }
    },

    mounted() {
        this.onDataLoad();
        this.getDepartmentList();
        this.semesterList = this.$codeUtil.translateSemesterlist()
        this.yearList = this.$codeUtil.translateYearlist()
        this.classTypeList = this.$codeUtil.translateClassTypelist()
    },

    methods: {
        onDataLoad() {
            if (!this.isInsert) {
                this.classInfo = { ...this.classInfoData };
                this.classInfoUpdate = { ...this.classInfo };
            }
        },

        async classInsert() {
            const reqBody = {
                ...this.classInfo,
                cyear: this.classInfo.year,
                generation: this.classInfo.generation + ''
            }

            const res = await requestService.request(API_PATH.CLASS_REGISTER, reqBody, false) as CLASS_LIST;
            this.classInfo = res;
            if (res) {
                modalController.dismiss();
                this.$toast.add({ summary: 'Confirmed', detail: 'The information has been inserted.', life: 1500 });
            }
        },

        async classEdit() {
            const reqBody = {
                ...this.classInfo,
                cyear: this.classInfo.year,
                generation: this.classInfo.generation + ''
            };

            const res = await requestService.request(API_PATH.CLASS_UPDATE, reqBody, false) as CLASS_LIST;
            this.classInfo = res;
            if (res) {
                modalController.dismiss();
                this.$toast.add({ summary: 'Confirmed', detail: 'The information has been updated.', life: 1500 });
            }
        },

        onClose() {
            modalController.dismiss();
        },

        async getDepartmentList() {
            const reqBody: DEPARTMENT_LIST_REQ = {
                userID: "",
                searchKey: '',
                pageSize: 1000,
                pageNumber: 1
            }
            const response = (await requestService.request(API_PATH.DEPARTMENT_LIST, reqBody, false)) as DEPARTMENT_LIST_RES;
            this.departmentList = response.body?.departmentList;
        }
    }
});
</script>

<style scoped>
@import url('./class-edit.scss');
</style>