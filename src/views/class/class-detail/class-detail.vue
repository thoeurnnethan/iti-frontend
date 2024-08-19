<template src="./class-detail.html"></template>

<script lang="ts">
import { modalController } from '@ionic/vue';
import { PropType, defineComponent } from 'vue';
import { API_PATH } from '@/shared/common/api-path';
import { RequestService } from '@/shared/services/request-service';
import { CLASS_LIST } from '@/shared/types/class-list';
import { GenderCodeList, globalStatusCodeList } from '@/shared/common/common';
import { STUDENT_CLASS_LIST } from '@/shared/types/studentClass-list';

const requestService = new RequestService();

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

        async onClickAction(item: STUDENT_CLASS_LIST, statusCode: string) {
            let messageHeader = '';
            let messageAcceptDetail = '';
            let messageRejectDetail = 'You have rejected';
            let btnAcceptClass = 'btn ';
            
            if (statusCode === '02') {
                messageHeader = "Do you want to delete this record?";
                messageAcceptDetail = 'The record has been deleted.';
                btnAcceptClass += 'btn-danger';
            } 

            this.$confirm.require({
                message: messageHeader,
                header: 'Please Confirm',
                acceptLabel: 'Yes',
                acceptClass: btnAcceptClass,
                rejectLabel: 'No',
                rejectClass: 'btn btn-secondary',                

                accept: async () => {
                    const reqBody = {
                        classInfoID: item.classID+item.classYear+item.semester,
                        studentList: [{
                            studentID: item.studentID,
                            statusCode: '02'
                        }],
                    };

                    await requestService.request(API_PATH.STUDENT_CLASS_UPDATE, reqBody, false) as STUDENT_CLASS_LIST;
                    this.studentInfo
                    this.$toast.add({ summary: 'Confirmed', detail: messageAcceptDetail, life: 1000 });
                    modalController.dismiss();
                },
                reject: () => {
                    this.$toast.add({ severity: 'error', summary: 'Rejected', detail: messageRejectDetail, life: 1000 });
                }
            });
        },
    },
});
</script>

<style scoped>
@import url('./class-detail.scss');
</style>
