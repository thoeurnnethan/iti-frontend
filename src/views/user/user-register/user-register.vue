<template src="./user-register.html"></template>

<script lang="ts">
import { defineComponent } from 'vue';
import { API_PATH } from '@/shared/common/api-path';
import { USER_LIST, QUALIFICATION_LIST ,PARENT_LIST ,ACADEMIC_LIST } from '@/shared/types/user-list';
import { RequestService } from '@/shared/services/request-service';
const requestService = new RequestService();

export default defineComponent({
    name: 'UserRegister',
    data() {
        return {
            select_Role: '03',
            teacherRegisterInfo: {
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
            } as USER_LIST,
            userList: [] as USER_LIST[],
            qualificationList: {
                qualificationName: '',
                qualificationDesc: '',
                startDate: '',
                endDate: '',
                certificatedDate: ''
            } as QUALIFICATION_LIST,
            teacherInfo: [] as QUALIFICATION_LIST[],
            hello_kon_papa:'',
            fieldQualificationName: false,
            fieldStartDate: false,
            fieldEndDate: false,
            fieldCertificatedDate: false,
            qualificationValid: true,
            appleButton: false,
            editingIndex: -1 ,

            studentRegisterInfo: {
                roleID: '04',
                firstName: '',
                lastName: '',
                nickName: '',
                gender: '',
                dateOfBirth: '',
                phone: '',
                email: '',
                passwd: '',
                placeOfBirth: '',
                address: '',
            } as USER_LIST,

            fatherInfo:[] as PARENT_LIST[],
            motherInfo:[] as PARENT_LIST[],
            academicList:[] as ACADEMIC_LIST[],
        };
    },

    computed: {
        isValid(): boolean {
            return (
                this.qualificationList.qualificationName !== '' &&
                this.qualificationList.startDate !== '' &&
                this.qualificationList.endDate !== '' &&
                this.qualificationList.certificatedDate !== ''
            );
        }
    },

    methods: {

        // studentRegister
            async studentRegister() {
                console.table(this.studentRegisterInfo);
                console.table(this.fatherInfo);
                console.table(this.motherInfo);
            },
        // studentRegister

        //--------------------------------------------------------------------------------

        // teacherRegister
            async teacherRegister() {
                const qualList = this.teacherInfo.map((data) =>{
                    return {
                        qualificationName: data.qualificationName,
                        qualificationDesc: data.qualificationDesc,
                        startDate: this.formatDateDatabase(data.startDate),
                        endDate: this.formatDateDatabase(data.endDate),
                        certificatedDate: data.certificatedDate,
                    }
                })
                const userInfoList = {
                    ...this.teacherRegisterInfo,
                    dateOfBirth: this.formatDateDatabase(this.teacherRegisterInfo.dateOfBirth),
                    teacherInfo: {
                        qualificationList: qualList
                    }
                };
                this.userList.push(userInfoList)
                const reqBody = {
                    userList: this.userList
                }
                await requestService.request(API_PATH.USER_REGISTER, reqBody, true)
            },
        // teacherRegister

        // qualification
            saveQualification() {
                // Reset validation flags
                this.fieldQualificationName = false;
                this.fieldStartDate = false;
                this.fieldEndDate = false;
                this.fieldCertificatedDate = false;
                this.appleButton = true;

                // Validate form
                if (!this.isValid) {
                    this.fieldQualificationName = this.qualificationList.qualificationName === '';
                    this.fieldStartDate = this.qualificationList.startDate === '';
                    this.fieldEndDate = this.qualificationList.endDate === '';
                    this.fieldCertificatedDate = this.qualificationList.certificatedDate === '';
                    return;
                }

                const updatedQualification: QUALIFICATION_LIST = {
                    ...this.qualificationList,
                    startDate: this.formatDate(this.qualificationList.startDate),
                    endDate: this.formatDate(this.qualificationList.endDate)
                };

                if (this.editingIndex === -1) {
                    // New entry
                    updatedQualification.no = this.teacherInfo.length + 1;
                    this.teacherInfo.push(updatedQualification);
                } else {
                    // Update existing entry
                    this.teacherInfo[this.editingIndex] = updatedQualification;
                    this.editingIndex = -1; // Reset editing index
                }

                this.updateQualificationNumbers();
                this.resetQualificationForm();
                this.appleButton = false;
            },

            onChangeValidate() {
                // Validate fields on input change
                if (this.appleButton) {
                    this.fieldQualificationName = this.qualificationList.qualificationName === '';
                    this.fieldStartDate = this.qualificationList.startDate === '';
                    this.fieldEndDate = this.qualificationList.endDate === '';
                    this.fieldCertificatedDate = this.qualificationList.certificatedDate === '';
                }
            },

            resetQualificationForm() {
                // Reset form fields
                this.qualificationList = {
                    qualificationName: '',
                    qualificationDesc: '',
                    startDate: '',
                    endDate: '',
                    certificatedDate: ''
                };
            },

            onClickEdit(data: QUALIFICATION_LIST) {
                if (this.editingIndex !== -1) {
                    this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Please finish editing the current record first.', life: 3000 });
                    return;
                }

                this.$confirm.require({
                    message: 'Do you want to edit this record?',
                    header: 'Danger Zone',
                    accept: () => {
                        this.$toast.add({ summary: 'Confirmed', detail: 'Record edit', life: 3000 });
                        this.qualificationList = { ...data };
                        this.editingIndex = this.teacherInfo.findIndex(item => item.no === data.no);
                    },
                    reject: () => {
                        this.$toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
                    }
                });
            },

            onClickDelete(item: QUALIFICATION_LIST) {
                if (this.editingIndex !== -1) {
                    this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Please finish editing the current record first.', life: 3000 });
                    return;
                }

                this.$confirm.require({
                    message: 'Do you want to delete this record?',
                    header: 'Danger Zone',
                    accept: () => {
                        this.teacherInfo = this.teacherInfo.filter(qual => qual.no !== item.no);
                        this.updateQualificationNumbers();
                        this.$toast.add({ summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
                    },
                    reject: () => {
                        this.$toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
                    }
                });
            },

            updateQualificationNumbers() {
                // Update the 'no' field for each qualification
                this.teacherInfo.forEach((qual, index) => {
                    qual.no = index + 1;
                });
            },

            formatDate(dateString: string): string {
                const date = new Date(dateString);
                if (isNaN(date.getTime())) return ''; // Return empty string if invalid date

                const year = date.getFullYear();
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const day = date.getDate().toString().padStart(2, '0');

                return `${year}-${month}-${day}`;
            },

            formatDateDatabase(dateString: string): string {
                const date = new Date(dateString);
                if (isNaN(date.getTime())) return ''; // Return empty string if invalid date

                const year = date.getFullYear();
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const day = date.getDate().toString().padStart(2, '0');

                return `${year}${month}${day}`;
            },
        // qualification




    }
});
</script>

<style>
@import url('./user-register.scss');
</style>
