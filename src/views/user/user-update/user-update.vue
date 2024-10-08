<template src="./user-update.html"></template>

<script lang="ts">
import { API_PATH } from '@/shared/common/api-path';
import { USER_LIST, QUALIFICATION_LIST, PARENT_LIST, ACADEMIC_LIST, USER_LIST_REQ, USER_DETAIL_RES } from '@/shared/types/user-list';
import { RequestService } from '@/shared/services/request-service';
import { defineComponent } from 'vue';
const requestService = new RequestService();

export default defineComponent({
    name: 'UserUpdate',
    data() {
        return {
            select_Role: '',
            userList: [] as USER_LIST[],
            userDetail: {} as USER_LIST,
            teacherInfo: [] as QUALIFICATION_LIST[],
            fatherInfo: {
                firstName: '',
                lastName: '',
                job: '',
                phone: '',
                gender: 'F',
                address: ''
            } as PARENT_LIST,
            motherInfo: {
                firstName: '',
                lastName: '',
                job: '',
                phone: '',
                gender: 'M',
                address: ''
            } as PARENT_LIST,
            studentAcademicList: {
                academicName: '',
                academicDesc: '',
                startDate: '',
                endDate: '',
                certificatedDate: '',
            } as ACADEMIC_LIST,
            teacherRegisterInfo: {
                roleID: '03',
                firstName: '',
                lastName: '',
                gender: '',
                dateOfBirth: '',
                placeOfBirth: '',
                address: '',
                phone: '',
                email: '',
            } as USER_LIST,
            studentEditInfo: {
                roleID: '04',
                userID:'',
                firstName: '',
                lastName: '',
                gender: '',
                dateOfBirth: '',
                placeOfBirth: '',
                address: '',
                phone: '',
                email: '',
            } as USER_LIST,
            qualificationList: {
                qualificationName: '',
                qualificationDesc: '',
                startDate: '',
                endDate: '',
                certificatedDate: ''
            } as QUALIFICATION_LIST,
            academicInfo: {
                academicName: '',
                academicDesc: '',
                startDate: '',
                endDate: '',
                certificatedDate: ''
            } as ACADEMIC_LIST,
            fieldQualificationName: false,
            fieldStartDate: false,
            fieldEndDate: false,
            fieldCertificatedDate: false,
            qualificationValid: true,
            appleButton: false,
            editingIndex: -1,

            fieldAcademicName: false,
            fieldAcademicStartDate: false,
            fieldAcademicEndDate: false,
            fieldAcademicCertificatedDate: false,
            editingIndexAcademic: -1,
            academicButton: false,

            teacherRegisterFirstName: false,
            teacherRegisterLastName: false,
            teacherRegisterDateOfBirth: false,
            teacherRegisterPlaceOfBirth: false,
            teacherRegisterAddress: false,
            teacherRegisterPhone: false,
            teacherRegisterEmail: false,

            studentUpdateFirstName: false,
            studentUpdateLastName: false,
            studentUpdateDateOfBirth: false,
            studentUpdatePlaceOfBirth: false,
            studentUpdateAddress: false,
            studentUpdatePhone: false,
            studentUpdateEmail: false,

            fatherFirstName: false,
            fatherLastName: false,
            fatherPhone: false,

            motherFirstName: false,
            motherLastName: false,
            motherPhone: false,
            userIDFromURl: this.$route.params.userID,
        };
    },

    computed: {
        isTeacherValid(): boolean {
            return (
                this.teacherRegisterInfo.firstName !== '' &&
                this.teacherRegisterInfo.lastName !== '' &&
                this.teacherRegisterInfo.dateOfBirth !== '' &&
                this.teacherRegisterInfo.phone !== '' &&
                this.isValidEmail(this.teacherRegisterInfo.email) &&
                this.teacherRegisterInfo.placeOfBirth !== '' &&
                this.teacherRegisterInfo.address !== ''
            );
        },
        isValid(): boolean {
            return (
                this.qualificationList.qualificationName !== '' &&
                this.qualificationList.startDate !== '' &&
                this.qualificationList.endDate !== '' &&
                this.qualificationList.certificatedDate !== ''
            );
        },
        isStudentValid(): boolean {
            return (
                this.studentEditInfo.firstName !== '' &&
                this.studentEditInfo.lastName !== '' &&
                this.studentEditInfo.dateOfBirth !== '' &&
                this.studentEditInfo.phone !== '' &&
                this.isValidEmail(this.studentEditInfo.email) &&
                this.studentEditInfo.placeOfBirth !== '' &&
                this.studentEditInfo.address !== '' &&

                this.fatherInfo.firstName !== '' &&
                this.fatherInfo.lastName !== '' &&
                this.fatherInfo.phone !== '' &&

                this.motherInfo.firstName !== '' &&
                this.motherInfo.lastName !== '' &&
                this.motherInfo.phone !== ''
            );
        },
        isAcademicValid(): boolean {
            return (
                this.academicInfo.academicName !== '' &&
                this.academicInfo.startDate !== '' &&
                this.academicInfo.endDate !== '' &&
                this.academicInfo.certificatedDate !== ''
            );
        },

    },

    mounted() {
        this.getUserDetailSummary();
    },

    methods: {
        async getUserDetailSummary() {
            const body = {
                userID: this.userIDFromURl
            };
            const response = (await requestService.request(API_PATH.USER_DETAIL, body, false)) as USER_DETAIL_RES;
            this.select_Role = response.body.roleID;
            this.userDetail = response.body

            // this.studentEditInfo.dateOfBirth = this.formatDateFront(response.body.dateOfBirth);
            // this.studentEditInfo = response.body;
            // this.fatherInfo = response.body.parentList[0];
            // this.motherInfo = response.body.parentList[1];
            // this.studentAcademicList = response.body.academicList.map(academic => ({
            //     ...academic,
            //     startDate: this.formatDateFront(academic.startDate),
            //     endDate: this.formatDateFront(academic.endDate),
            //     certificatedDate: this.formatDateFront(academic.certificatedDate)
            // }));
        },

        // studentUpdate
            async studentUpdate() {

            this.academicButton = true;

            const academicListCount = this.studentAcademicList.map((data) => {
                return {
                    academicName: data.academicName,
                    academicDesc: data.academicDesc,
                    startDate: this.formatDateDatabase(data.startDate),
                    endDate: this.formatDateDatabase(data.endDate),
                    certificatedDate: this.formatDateDatabase(data.certificatedDate),
                };
            });

            if (!this.isStudentValid) {
                this.studentUpdateFirstName = this.studentEditInfo.firstName === '';
                this.studentUpdateLastName = this.studentEditInfo.lastName === '';
                this.studentUpdateDateOfBirth = this.studentEditInfo.dateOfBirth === '';
                this.studentUpdatePlaceOfBirth = this.studentEditInfo.placeOfBirth === '';
                this.studentUpdateAddress = this.studentEditInfo.address === '';
                this.studentUpdatePhone = this.studentEditInfo.phone === '';
                this.studentUpdateEmail = !this.isValidEmail(this.studentEditInfo.email);

                this.fatherFirstName = this.fatherInfo.firstName === '';
                this.fatherLastName = this.fatherInfo.lastName === '';
                this.fatherPhone = this.fatherInfo.phone === '';

                this.motherFirstName = this.motherInfo.firstName === '';
                this.motherLastName = this.motherInfo.lastName === '';
                this.motherPhone = this.motherInfo.phone === '';
                return;
            }

            if (academicListCount.length < 0) {                
                return;
            }

            const academicList = this.studentAcademicList.map((data) => {
                return {
                    academicName: data.academicName,
                    academicDesc: data.academicDesc,
                    startDate: this.formatDateDatabase(data.startDate),
                    endDate: this.formatDateDatabase(data.endDate),
                    certificatedDate: this.formatDateDatabase(data.certificatedDate),
                };
            });
            const userInfoList = {
                ...this.studentEditInfo,
                dateOfBirth: this.formatDateDatabase(this.studentEditInfo.dateOfBirth),
                studentInfo: {
                    parentList: [
                        this.fatherInfo,
                        this.motherInfo
                    ],
                    academicList: academicList
                }
            };
            await requestService.request(API_PATH.USER_UPDATE, userInfoList, true);
            this.$router.push('/user-list');

        },
        // studentUpdate

        // Academic
        saveAcademic() {
            // Reset validation flags
            this.fieldAcademicName = false;
            this.fieldAcademicStartDate = false;
            this.fieldAcademicEndDate = false;
            this.fieldAcademicCertificatedDate = false;
            this.academicButton = true;
            // Validate form
            if (!this.isAcademicValid) {
                this.fieldAcademicName = this.academicInfo.academicName === '';
                this.fieldAcademicStartDate = this.academicInfo.startDate === '';
                this.fieldAcademicEndDate = this.academicInfo.endDate === '';
                this.fieldAcademicCertificatedDate = this.academicInfo.certificatedDate === '';
                return;
            }
            const updatedAcademic: ACADEMIC_LIST = {
                ...this.academicInfo,
                startDate: this.formatDate(this.academicInfo.startDate),
                endDate: this.formatDate(this.academicInfo.endDate),
                certificatedDate: this.formatDate(this.academicInfo.certificatedDate)
            };
            if (this.editingIndexAcademic === -1) {
                updatedAcademic.no = this.studentAcademicList.length + 1;
                this.studentAcademicList.push(updatedAcademic);
            } else {
                this.studentAcademicList[this.editingIndexAcademic] = updatedAcademic;
                this.editingIndexAcademic = -1;
            }
            this.updateAcademicNumbers();
            this.resetAcademicForm();
            this.academicButton = false;
        },

        onClickEditAcademic(data: ACADEMIC_LIST) {
            if (this.editingIndexAcademic !== -1) {
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Please finish editing the current record first.', life: 3000 });
                return;
            }
            this.$confirm.require({
                message: 'Do you want to edit this record?',
                header: 'Danger Zone',
                accept: () => {
                    this.$toast.add({ summary: 'Confirmed', detail: 'Record edit', life: 3000 });
                    this.academicInfo = { ...data };
                    this.editingIndexAcademic = this.studentAcademicList.findIndex(item => item.no === data.no);
                },
                reject: () => {
                    this.$toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
                }
            });
        },

        onClickDeleteAcademic(item: ACADEMIC_LIST) {
            if (this.editingIndexAcademic !== -1) {
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Please finish editing the current record first.', life: 3000 });
                return;
            }
            this.$confirm.require({
                message: 'Do you want to delete this record?',
                header: 'Danger Zone',
                accept: () => {
                    this.studentAcademicList = this.studentAcademicList.filter(qual => qual.no !== item.no);
                    this.updateAcademicNumbers();
                    this.$toast.add({ summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
                },
                reject: () => {
                    this.$toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
                }
            });
        },

        resetAcademicForm() {
            this.academicInfo = {
                academicName: '',
                academicDesc: '',
                startDate: '',
                endDate: '',
                certificatedDate: ''
            };
        },

        updateAcademicNumbers() {
            this.studentAcademicList.forEach((qual, index) => {
                qual.no = index + 1;
            });
        },

        onChangeValidateAcademic() {
            // Validate fields on input change
            if (this.academicButton) {
                this.fieldAcademicName = this.academicInfo.academicName === '';
                this.fieldAcademicStartDate = this.academicInfo.startDate === '';
                this.fieldAcademicEndDate = this.academicInfo.endDate === '';
                this.fieldAcademicCertificatedDate = this.academicInfo.certificatedDate === '';
                this.studentUpdateFirstName = this.studentEditInfo.firstName === '';
                this.studentUpdateLastName = this.studentEditInfo.lastName === '';
                this.studentUpdateDateOfBirth = this.studentEditInfo.dateOfBirth === '';
                this.studentUpdatePlaceOfBirth = this.studentEditInfo.placeOfBirth === '';
                this.studentUpdateAddress = this.studentEditInfo.address === '';
                this.studentUpdatePhone = this.studentEditInfo.phone === '';
                this.studentUpdateEmail = this.studentEditInfo.email === '';

                this.fatherFirstName = this.fatherInfo.firstName === '';
                this.fatherLastName = this.fatherInfo.lastName === '';
                this.fatherPhone = this.fatherInfo.phone === '';

                this.motherFirstName = this.motherInfo.firstName === '';
                this.motherLastName = this.motherInfo.lastName === '';
                this.motherPhone = this.motherInfo.phone === '';
            }
        },
        // Academic

        //--------------------------------------------------------------------------------

        // teacherRegister
        async teacherRegister() {

            this.appleButton = true;

            const qualListCount = this.teacherInfo.map((data) => {
                return {
                    qualificationName: data.qualificationName,
                    qualificationDesc: data.qualificationDesc,
                    startDate: this.formatDateDatabase(data.startDate),
                    endDate: this.formatDateDatabase(data.endDate),
                    certificatedDate: data.certificatedDate,
                }
            })

            if (!this.isTeacherValid) {
                this.teacherRegisterFirstName = this.teacherRegisterInfo.firstName === '';
                this.teacherRegisterLastName = this.teacherRegisterInfo.lastName === '';
                this.teacherRegisterDateOfBirth = this.teacherRegisterInfo.dateOfBirth === '';
                this.teacherRegisterPlaceOfBirth = this.teacherRegisterInfo.placeOfBirth === '';
                this.teacherRegisterAddress = this.teacherRegisterInfo.address === '';
                this.teacherRegisterPhone = this.teacherRegisterInfo.phone === '';
                this.teacherRegisterEmail = !this.isValidEmail(this.teacherRegisterInfo.email);
                return;
            }


            if (qualListCount.length <= 0) {
                return;
            }

            const qualList = this.teacherInfo.map((data) => {
                return {
                    qualificationName: data.qualificationName,
                    qualificationDesc: data.qualificationDesc,
                    startDate: this.formatDateDatabase(data.startDate),
                    endDate: this.formatDateDatabase(data.endDate),
                    certificatedDate: this.formatDateDatabase(data.certificatedDate),
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
            this.$router.push('/user-list');
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
                this.teacherRegisterFirstName = this.teacherRegisterInfo.firstName === '';
                this.teacherRegisterLastName = this.teacherRegisterInfo.lastName === '';
                this.teacherRegisterDateOfBirth = this.teacherRegisterInfo.dateOfBirth === '';
                this.teacherRegisterPlaceOfBirth = this.teacherRegisterInfo.placeOfBirth === '';
                this.teacherRegisterAddress = this.teacherRegisterInfo.address === '';
                this.teacherRegisterPhone = this.teacherRegisterInfo.phone === '';
                this.teacherRegisterEmail = this.teacherRegisterInfo.email === '';
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

        // qualification

        formatDate(dateString: string): string {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return ''; // Return empty string if invalid date
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        },

        formatDateFront(dateString: string): string {
            if (dateString.length !== 8 || !/^\d+$/.test(dateString)) return ''; // Return empty string if invalid format
            const year = dateString.slice(0, 4);
            const month = dateString.slice(4, 6);
            const day = dateString.slice(6, 8);
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
        isValidEmail(email: string): boolean {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailPattern.test(email);
        },


    }
});
</script>

<style>
@import url('./user-update.scss');
</style>
