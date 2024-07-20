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
            qualificationValidate: true,
            appleButton: false

        };
    },

    methods: {

        saveQualification() {
            this.fieldQualificationName = false,
            this.fieldStartDate = false,
            this.fieldEndDate = false,
            this.fieldCertificatedDate = false
            this.appleButton = true

            const newQualification: any = {
                qualificationName: this.qualificationList.qualificationName,
                qualificationDesc: this.qualificationList.qualificationDesc,
                startDate: this.formatDate(this.qualificationList.startDate),
                endDate: this.formatDate(this.qualificationList.endDate),
                certificatedDate: this.qualificationList.certificatedDate,
                no: this.teacherQualification.length + 1
            };

            if (this.qualificationList.qualificationName == '') {
                this.fieldQualificationName = true;
                this.qualificationValidate = false
            }
            if (this.qualificationList.startDate == '') {
                this.fieldStartDate = true;
                this.qualificationValidate = false
            }
            if (this.qualificationList.endDate == '') {
                this.fieldEndDate = true;
                this.qualificationValidate = false
            }
            if (this.qualificationList.certificatedDate == '') {
                this.fieldCertificatedDate = true;
                this.qualificationValidate = false
            }
            if (this.qualificationValidate) {
                this.teacherQualification.push(newQualification);
                this.resetQualificationForm();
                this.appleButton = false
            }
        },
        onChangeValidate() {
            if (this.appleButton) {
                this.fieldQualificationName = false,
                this.fieldStartDate = false,
                this.fieldEndDate = false,
                this.fieldCertificatedDate = false

                if (this.qualificationList.qualificationName == '') {
                    this.fieldQualificationName = true;
                }
                if (this.qualificationList.startDate == '') {
                    this.fieldStartDate = true;
                }
                if (this.qualificationList.endDate == '') {
                    this.fieldEndDate = true;
                }
                if (this.qualificationList.certificatedDate == '') {
                    this.fieldCertificatedDate = true;
                }
            }
        },
        resetQualificationForm() {
            this.qualificationList = {
                qualificationName: '',
                qualificationDesc: '',
                startDate: '',
                endDate: '',
                certificatedDate: ''
            };
        },

        formatDate(dateString: string): string {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return ''; // Return empty string if invalid date

            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');

            return `${year}-${month}-${day}`;
        },

        // apple(){
        //     if(!this.isValidRegister){
        //         this.fieldValidate = true;

        //         if(this.qualificationList.qualificationName !== ''){
        //             this.fieldValidate = false;
        //         }
        //     }
        // }










        async teacherSubmit() {
            const reqBody = {
                ...this.userInfoUpdate
            };

            const res = await RequestService.request(API_PATH.USER_REGISTER, false, true) as USER_LIST_RES;
            if (res) {
                modalController.dismiss();
            }
        },

        handleFileUpload(event: Event) {
            const target = event.target as HTMLInputElement;
            const file = target.files ? target.files[0] : null;

            if (file) {
                this.uploadFile(file); // Call method to upload file to server
            }
        },

        async uploadFile(file: File) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                // Make a POST request to your backend endpoint for file upload
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (response.ok) {
                    const fileName = await response.text(); // Assuming backend responds with file name
                    this.userInfoUpdate.imageUrl = fileName; // Store file name in userInfoUpdate
                    console.log('File uploaded successfully:', fileName);
                } else {
                    console.error('Failed to upload file');
                    // Handle failure to upload file (show error message, etc.)
                }
            } catch (error) {
                console.error('Error uploading file:', error);
                // Handle error (show error message, etc.)
            }
        },

        isValidForm(): boolean {
            // Implement form validation logic as needed
            return this.userInfoUpdate.firstName !== '' && this.userInfoUpdate.lastName !== '';
        },
    },
});
</script>


<style>
@import url('./user-register.scss');
</style>
