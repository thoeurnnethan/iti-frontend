<template src="./user-register.html"></template>

<script lang="ts">
import { defineComponent } from 'vue';
import { API_PATH } from '@/shared/common/api-path';
import { USER_LIST, USER_LIST_RES, QUALIFICATION_LIST } from '@/shared/types/user-list';
import { RequestService } from '@/shared/services/request-service';
import { modalController } from '@ionic/vue';

export default defineComponent({
    name: 'UserRegister',
    data() {
        return {
            select_Role: '03',
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
            } as USER_LIST,

            qualificationList: {
                qualificationName: '',
                qualificationDesc: '',
                startDate: '',
                endDate: '',
                certificatedDate: ''
            } as QUALIFICATION_LIST,
            teacherQualification: [] as QUALIFICATION_LIST[],
            fieldQualificationName: false,
            fieldStartDate: false,
            fieldEndDate: false,
            fieldCertificatedDate: false,
            qualificationValid: true,
            appleButton: false,
            editingIndex: -1 // Track the index of the currently editing item
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
                updatedQualification.no = this.teacherQualification.length + 1;
                this.teacherQualification.push(updatedQualification);
            } else {
                // Update existing entry
                this.teacherQualification[this.editingIndex] = updatedQualification;
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
                    this.editingIndex = this.teacherQualification.findIndex(item => item.no === data.no);
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
                    this.teacherQualification = this.teacherQualification.filter(qual => qual.no !== item.no);
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
            this.teacherQualification.forEach((qual, index) => {
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
        }
    }
});
</script>

<style>
@import url('./user-register.scss');
</style>
