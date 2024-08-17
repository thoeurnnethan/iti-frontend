<template src="./class-detail.html"></template>

<script lang="ts">
import { modalController } from '@ionic/vue';
import { PropType, defineComponent } from 'vue';
import { CLASS_LIST } from '@/shared/types/class-list';
import { GenderCodeList, globalStatusCodeList } from '@/shared/common/common';
import { STUDENT_CLASS_LIST } from '@/shared/types/studentClass-list';

export default defineComponent({
    name: "class-detail",
    props: {
        subjectDetails: {
            type: Object as PropType<CLASS_LIST>,
            required: true
        },
        studentDetails: {
            type: Array as PropType<STUDENT_CLASS_LIST>,
            required: true
        }
    },

    data() {
        return {
            classInfo: {} as CLASS_LIST,
            statusCodeList: globalStatusCodeList,
            GenderCodeList: GenderCodeList,
            studentInfo: [] as Array<any>,
        }
    },

    mounted() {
        this.classInfo = this.subjectDetails.map((item: any, index: number) => ({
            ...item,
            no: index + 1
        }));

        this.studentInfo = this.studentDetails.map((student: { firstName: any; lastName: any, statusCode: any, gender: any }, index: number) => ({
            ...student,
            no: index + 1,
            fullName: `${student.firstName} ${student.lastName}`,
            status: this.$codeConverter.codeToString(this.statusCodeList, student.statusCode, 'statusCode'),
            gender: this.$codeConverter.codeToString(this.GenderCodeList, student.gender, 'genderCode'),
        }));
    },


    methods: {
        handleClose() {
            this.classInfo = {} as CLASS_LIST;
            this.studentInfo = [] as Array<any>;
            modalController.dismiss();
        },
    },
});
</script>

<style scoped>
@import url('./class-detail.scss');
</style>
