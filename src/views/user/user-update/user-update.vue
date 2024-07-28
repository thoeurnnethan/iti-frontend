<template src="./user-update.html"></template>

<script lang="ts">
import { API_PATH } from '@/shared/common/api-path';
import { USER_LIST, QUALIFICATION_LIST, PARENT_LIST, ACADEMIC_LIST, USER_LIST_REQ } from '@/shared/types/user-list';
import { RequestService } from '@/shared/services/request-service';
import { defineComponent } from 'vue';
const requestService = new RequestService();

export default defineComponent({
    name: 'UserUpdate',
    data() {
        return {
            select_Role: '04',
            userList: [] as USER_LIST[],
            teacherInfo: [] as QUALIFICATION_LIST[],
            fatherInfo: {} as PARENT_LIST,
            motherInfo: {} as PARENT_LIST,
            studentAcademicList: [] as ACADEMIC_LIST[],
            teacherRegisterInfo: {} as USER_LIST,
            studentEditInfo: {} as USER_LIST,
            qualificationList: {} as QUALIFICATION_LIST,
            academicInfo: {} as ACADEMIC_LIST,
            customNoClass: 'table_no',
            qualificationValid: true,
            appleButton: false,
            editingIndex: -1,
            academicButton: false,
            editingIndexAcademic: -1,
            userIDFromURl: this.$route.params.userID,
            validationFlags: {
                teacher: {
                    firstName: false,
                    lastName: false,
                    dateOfBirth: false,
                    placeOfBirth: false,
                    address: false,
                    phone: false,
                    email: false,
                },
                student: {
                    firstName: false,
                    lastName: false,
                    dateOfBirth: false,
                    placeOfBirth: false,
                    address: false,
                    phone: false,
                    email: false,
                    fatherFirstName: false,
                    fatherLastName: false,
                    fatherPhone: false,
                    motherFirstName: false,
                    motherLastName: false,
                    motherPhone: false,
                },
                qualification: {
                    qualificationName: false,
                    startDate: false,
                    endDate: false,
                    certificatedDate: false,
                },
                academic: {
                    academicName: false,
                    startDate: false,
                    endDate: false,
                    certificatedDate: false,
                }
            }
        };
    },

    computed: {
        isTeacherValid(): boolean {
            return (
                this.teacherRegisterInfo.firstName &&
                this.teacherRegisterInfo.lastName &&
                this.teacherRegisterInfo.dateOfBirth &&
                this.teacherRegisterInfo.phone &&
                this.isValidEmail(this.teacherRegisterInfo.email) &&
                this.teacherRegisterInfo.placeOfBirth &&
                this.teacherRegisterInfo.address
            );
        },
        isValid(): boolean {
            return (
                this.qualificationList.qualificationName &&
                this.qualificationList.startDate &&
                this.qualificationList.endDate &&
                this.qualificationList.certificatedDate
            );
        },
        isStudentValid(): boolean {
            return (
                this.studentEditInfo.firstName &&
                this.studentEditInfo.lastName &&
                this.studentEditInfo.dateOfBirth &&
                this.studentEditInfo.phone &&
                this.isValidEmail(this.studentEditInfo.email) &&
                this.studentEditInfo.placeOfBirth &&
                this.studentEditInfo.address &&
                this.fatherInfo.firstName &&
                this.fatherInfo.lastName &&
                this.fatherInfo.phone &&
                this.motherInfo.firstName &&
                this.motherInfo.lastName &&
                this.motherInfo.phone
            );
        },
        isAcademicValid(): boolean {
            return (
                this.academicInfo.academicName &&
                this.academicInfo.startDate &&
                this.academicInfo.endDate &&
                this.academicInfo.certificatedDate
            );
        },
    },

    mounted() {
        this.onDataLoad();
    },

    methods: {
        async onDataLoad() {
            try {
                const body: USER_LIST_REQ = {
                    userID: this.userIDFromURl
                };
                const response = (await requestService.request(API_PATH.USER_DETAIL, body, false)) as USER_LIST;
                this.studentEditInfo = response;
            } catch (error) {
                console.error('Error loading data:', error);
            }
        },

        async studentRegister() {
            this.academicButton = true;
            if (!this.isStudentValid) {
                this.validateStudentFields();
                return;
            }

            if (this.studentAcademicList.length === 0) {
                return;
            }

            const academicList = this.studentAcademicList.map(data => ({
                ...data,
                startDate: this.formatDateDatabase(data.startDate),
                endDate: this.formatDateDatabase(data.endDate),
                certificatedDate: this.formatDateDatabase(data.certificatedDate),
            }));

            const userInfoList = {
                ...this.studentEditInfo,
                dateOfBirth: this.formatDateDatabase(this.studentEditInfo.dateOfBirth),
                studentInfo: {
                    parentList: [this.fatherInfo, this.motherInfo],
                    academicList
                }
            };
            this.userList.push(userInfoList);

            try {
                await requestService.request(API_PATH.USER_REGISTER, { userList: this.userList }, true);
                this.$router.push('/user-list');
            } catch (error) {
                console.error('Error registering student:', error);
            }
        },

        saveAcademic() {
            this.academicButton = true;
            if (!this.isAcademicValid) {
                this.validateAcademicFields();
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
                header: 'Edit Confirmation',
                accept: () => {
                    this.$toast.add({ summary: 'Confirmed', detail: 'Record edit', life: 3000 });
                    this.academicInfo = { ...data };
                    this.editingIndexAcademic = this.studentAcademicList.findIndex(item => item.no === data.no);
                },
                reject: () => {
                    this.$toast.add({ severity: 'error', summary: 'Rejected', detail: 'Edit rejected', life: 3000 });
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
                header: 'Delete Confirmation',
                accept: () => {
                    this.studentAcademicList = this.studentAcademicList.filter(qual => qual.no !== item.no);
                    this.updateAcademicNumbers();
                    this.$toast.add({ summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
                },
                reject: () => {
                    this.$toast.add({ severity: 'error', summary: 'Rejected', detail: 'Delete rejected', life: 3000 });
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
            if (this.academicButton) {
                this.validateAcademicFields();
            }
        },

        async teacherRegister() {
            this.appleButton = true;
            if (!this.isTeacherValid) {
                this.validateTeacherFields();
                return;
            }

            if (this.teacherInfo.length === 0) {
                return;
            }

            const qualList = this.teacherInfo.map(data => ({
                ...data,
                startDate: this.formatDateDatabase(data.startDate),
                endDate: this.formatDateDatabase(data.endDate),
                certificatedDate: this.formatDateDatabase(data.certificatedDate),
            }));

            const userInfoList = {
                ...this.teacherRegisterInfo,
                dateOfBirth: this.formatDateDatabase(this.teacherRegisterInfo.dateOfBirth),
                teacherInfo: {
                    qualificationList: qualList
                }
            };
            this.userList.push(userInfoList);

            try {
                await requestService.request(API_PATH.USER_REGISTER, { userList: this.userList }, true);
                this.$router.push('/user-list');
            } catch (error) {
                console.error('Error registering teacher:', error);
            }
        },

        saveQualification() {
            this.appleButton = true;
            if (!this.isValid) {
                this.validateQualificationFields();
                return;
            }

            const updatedQualification: QUALIFICATION_LIST = {
                ...this.qualificationList,
                startDate: this.formatDate(this.qualificationList.startDate),
                endDate: this.formatDate(this.qualificationList.endDate),
                certificatedDate: this.formatDate(this.qualificationList.certificatedDate)
            };

            if (this.editingIndex === -1) {
                updatedQualification.no = this.teacherInfo.length + 1;
                this.teacherInfo.push(updatedQualification);
            } else {
                this.teacherInfo[this.editingIndex] = updatedQualification;
                this.editingIndex = -1;
            }
            this.updateQualificationNumbers();
            this.resetQualificationForm();
            this.appleButton = false;
        },

        onClickEdit(data: QUALIFICATION_LIST) {
            if (this.editingIndex !== -1) {
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Please finish editing the current record first.', life: 3000 });
                return;
            }
            this.$confirm.require({
                message: 'Do you want to edit this record?',
                header: 'Edit Confirmation',
                accept: () => {
                    this.$toast.add({ summary: 'Confirmed', detail: 'Record edit', life: 3000 });
                    this.qualificationList = { ...data };
                    this.editingIndex = this.teacherInfo.findIndex(item => item.no === data.no);
                },
                reject: () => {
                    this.$toast.add({ severity: 'error', summary: 'Rejected', detail: 'Edit rejected', life: 3000 });
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
                header: 'Delete Confirmation',
                accept: () => {
                    this.teacherInfo = this.teacherInfo.filter(qual => qual.no !== item.no);
                    this.updateQualificationNumbers();
                    this.$toast.add({ summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
                },
                reject: () => {
                    this.$toast.add({ severity: 'error', summary: 'Rejected', detail: 'Delete rejected', life: 3000 });
                }
            });
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

        updateQualificationNumbers() {
            this.teacherInfo.forEach((qual, index) => {
                qual.no = index + 1;
            });
        },

        onChangeValidate() {
            if (this.appleButton) {
                this.validateQualificationFields();
            }
        },

        onChangeValidateTeacher() {
            if (this.appleButton) {
                this.validateTeacherFields();
            }
        },

        onChangeValidateStudent() {
            if (this.academicButton) {
                this.validateStudentFields();
            }
        },

        formatDate(date: string): string {
            return date ? new Date(date).toLocaleDateString() : '';
        },

        formatDateDatabase(date: string): string {
            return date ? new Date(date).toISOString().slice(0, 10) : '';
        },

        isValidEmail(email: string): boolean {
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            return emailPattern.test(email);
        },

        validateTeacherFields() {
            const flags = this.validationFlags.teacher;
            flags.firstName = !this.teacherRegisterInfo.firstName;
            flags.lastName = !this.teacherRegisterInfo.lastName;
            flags.dateOfBirth = !this.teacherRegisterInfo.dateOfBirth;
            flags.placeOfBirth = !this.teacherRegisterInfo.placeOfBirth;
            flags.address = !this.teacherRegisterInfo.address;
            flags.phone = !this.teacherRegisterInfo.phone;
            flags.email = !this.isValidEmail(this.teacherRegisterInfo.email);
        },

        validateStudentFields() {
            const flags = this.validationFlags.student;
            flags.firstName = !this.studentEditInfo.firstName;
            flags.lastName = !this.studentEditInfo.lastName;
            flags.dateOfBirth = !this.studentEditInfo.dateOfBirth;
            flags.placeOfBirth = !this.studentEditInfo.placeOfBirth;
            flags.address = !this.studentEditInfo.address;
            flags.phone = !this.studentEditInfo.phone;
            flags.email = !this.isValidEmail(this.studentEditInfo.email);
            flags.fatherFirstName = !this.fatherInfo.firstName;
            flags.fatherLastName = !this.fatherInfo.lastName;
            flags.fatherPhone = !this.fatherInfo.phone;
            flags.motherFirstName = !this.motherInfo.firstName;
            flags.motherLastName = !this.motherInfo.lastName;
            flags.motherPhone = !this.motherInfo.phone;
        },

        validateQualificationFields() {
            const flags = this.validationFlags.qualification;
            flags.qualificationName = !this.qualificationList.qualificationName;
            flags.startDate = !this.qualificationList.startDate;
            flags.endDate = !this.qualificationList.endDate;
            flags.certificatedDate = !this.qualificationList.certificatedDate;
        },

        validateAcademicFields() {
            const flags = this.validationFlags.academic;
            flags.academicName = !this.academicInfo.academicName;
            flags.startDate = !this.academicInfo.startDate;
            flags.endDate = !this.academicInfo.endDate;
            flags.certificatedDate = !this.academicInfo.certificatedDate;
        },
    },
});
</script>

<style scoped>
</style>
