<template src="./user-register.html"></template>

<script lang="ts">
import { defineComponent } from 'vue';
import { API_PATH } from '@/shared/common/api-path';
import { USER_LIST, USER_LIST_REQ, USER_LIST_RES } from '@/shared/types/user-list';
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
        };
    },
    methods: {
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
