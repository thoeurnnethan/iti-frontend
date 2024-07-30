<template src="./user-register.html"></template>

<script lang="ts">
import { API_PATH } from '@/shared/common/api-path';
import { USER_LIST, QUALIFICATION_LIST, PARENT_LIST, ACADEMIC_LIST, USER_DETAIL_RES, USER_LIST_FORM_CHECK, QUALIFICATION_LIST_FORM_CHECK } from '@/shared/types/user-list';
import { RequestService } from '@/shared/services/request-service';
import { defineComponent } from 'vue';
import { TeacherRoleList } from '@/shared/common/common';
const requestService = new RequestService();

export default defineComponent({
    name: 'UserRegister',

    data() {
        return {
            userList: [] as USER_LIST[],
            qualificationList: [] as QUALIFICATION_LIST[],
            studentAcademicList: [] as ACADEMIC_LIST[],
            teacherRoleList: TeacherRoleList,
            userInfo: {
                firstName: '',
                lastName: '',
                gender: '',
                dateOfBirth: '',
                placeOfBirth: '',
                address: '',
                phone: '',
                email: '',
            } as USER_LIST,
            fatherInfo: {
                firstName: '',
                lastName: '',
                job: '',
                phone: '',
                gender: 'M',
                address: ''
            } as PARENT_LIST,
            motherInfo: {
                firstName: '',
                lastName: '',
                job: '',
                phone: '',
                gender: 'F',
                address: ''
            } as PARENT_LIST,
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
            studentRegisterInfo: {
                roleID: '04',
                firstName: '',
                lastName: '',
                gender: '',
                dateOfBirth: '',
                placeOfBirth: '',
                address: '',
                phone: '',
                email: '',
            } as USER_LIST,
            qualificationInfo: {
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
            userInfoCheckFields: {
                firstName: false,
                lastName: false,
                gender: false,
                dateOfBirth: false,
                placeOfBirth: false,
                address: false,
                phone: false,
                email: false,
            } as USER_LIST_FORM_CHECK,
            qualCheckFields: {
                qualificationName: false,
                startDate: false,
                endDate: false,
                certificatedDate: false
            } as QUALIFICATION_LIST_FORM_CHECK,
            editingIndex: -1,
            
            customRowClass: 'col-lg-4 col-sm-6 col-xl-3 mb-2',
            customFormClass: 'form-label font_15',
            userSelectedRole: '03',
            teacherSelectedRole: '03',
            customNoClass: 'table_no',
            addedButton: false,

            fieldAcademicName: false,
            fieldAcademicStartDate: false,
            fieldAcademicEndDate: false,
            fieldAcademicCertificatedDate: false,
            editingIndexAcademic: -1,
            academicButton: false,

            fatherFirstName: false,
            fatherLastName: false,
            fatherPhone: false,

            motherFirstName: false,
            motherLastName: false,
            motherPhone: false,

            userIDFromURl: this.$route.params.userID,
            routerName: this.$route.name,
        };
    },
    
    mounted() {
        if (!this.isRegisterRoute) {
            this.getUserDetailSummary();
        }
    },

    beforeRouteEnter(to, from, next) {
        next(vm => vm.resetForm());
    },

    beforeRouteUpdate(to, from, next) {
        this.resetForm();
        next();
    },

    computed: {
        isTeacherValid(): boolean{
            return this.userInfo.firstName !== '' &&
                this.userInfo.lastName !== '' &&
                this.userInfo.gender !== '' &&
                this.userInfo.dateOfBirth !== '' &&
                this.userInfo.placeOfBirth !== '' &&
                this.userInfo.address !== '' &&
                this.userInfo.phone !== '' &&
                this.userInfo.email !== '';
        },

        isValidQualification(): boolean {
            return this.qualificationInfo.qualificationName !== '' &&
                this.qualificationInfo.startDate !== '' &&
                this.qualificationInfo.endDate !== '' &&
                this.qualificationInfo.certificatedDate !== ''
        },

        isStudentValid(): boolean {
            return this.userInfo.firstName !== '' &&
                this.userInfo.lastName !== '' &&
                this.userInfo.dateOfBirth !== '' &&
                this.userInfo.phone !== '' &&
                this.isValidEmail(this.userInfo.email) &&
                this.userInfo.placeOfBirth !== '' &&
                this.userInfo.address !== '' &&

                this.fatherInfo.firstName !== '' &&
                this.fatherInfo.lastName !== '' &&
                this.fatherInfo.phone !== '' &&

                this.motherInfo.firstName !== '' &&
                this.motherInfo.lastName !== '' &&
                this.motherInfo.phone !== ''
        },

        isAcademicValid(): boolean {
            return this.academicInfo.academicName !== '' &&
                this.academicInfo.startDate !== '' &&
                this.academicInfo.endDate !== '' &&
                this.academicInfo.certificatedDate !== ''
        },

        isRegisterRoute(): boolean {
            return this.routerName === 'user-register'
        },

        isRegisterStudent(): boolean {
            return this.userSelectedRole === '04'
        },
        onChangeUserRoleRegister(): void{
            this.resetForm();
        },
    },

    methods: {
        /* =============================================================== */
        /* ======================= Teacher Register ====================== */
        /* =============================================================== */
        async teacherRegister() {
            this.addedButton = true;
            if (!this.isTeacherValid) {
                this.userInfoCheckFields.firstName = this.userInfo.firstName === '';
                this.userInfoCheckFields.lastName = this.userInfo.lastName === '';
                this.userInfoCheckFields.dateOfBirth = this.userInfo.dateOfBirth === '';
                this.userInfoCheckFields.placeOfBirth = this.userInfo.placeOfBirth === '';
                this.userInfoCheckFields.address = this.userInfo.address === '';
                this.userInfoCheckFields.phone = this.userInfo.phone === '';
                this.userInfoCheckFields.email = !this.isValidEmail(this.userInfo.email);
                return;
            }
            if(this.qualificationList.length <= 0){
                return;
            }
            const qualList = this.qualificationList.map((data) => {
                return {
                    qualificationName: data.qualificationName,
                    qualificationDesc: data.qualificationDesc,
                    startDate: this.formatDateDatabase(data.startDate),
                    endDate: this.formatDateDatabase(data.endDate),
                    certificatedDate: this.formatDateDatabase(data.certificatedDate),
                }
            })
            const userInfoList = {
                ...this.userInfo,
                roleID: this.isRegisterStudent? this.userSelectedRole : this.teacherSelectedRole,
                dateOfBirth: this.formatDateDatabase(this.userInfo.dateOfBirth),
                teacherInfo:{
                    qualificationList: qualList
                }
            }
            this.userList.push(userInfoList)
            const reqBody = {
                userList: this.userList
            }
            const res = await requestService.request(API_PATH.USER_REGISTER, reqBody, true)
            if(res.header.result){
                this.resetForm()
            }
            // this.$router.push('/user-list');
        },

        addQualificationToList() {
            this.qualCheckFields.qualificationName = false;
            this.qualCheckFields.startDate = false;
            this.qualCheckFields.endDate = false;
            this.qualCheckFields.certificatedDate = false;
            this.addedButton = true;

            // Validate form
            if (!this.isValidQualification) {
                this.qualCheckFields.qualificationName = this.qualificationInfo.qualificationName === '';
                this.qualCheckFields.startDate = this.qualificationInfo.startDate === '';
                this.qualCheckFields.endDate = this.qualificationInfo.endDate === '';
                this.qualCheckFields.certificatedDate = this.qualificationInfo.certificatedDate === '';
                return;
            }

            const updatedQualification: QUALIFICATION_LIST = {
                ...this.qualificationInfo,
                startDate: this.formatDate(this.qualificationInfo.startDate),
                endDate: this.formatDate(this.qualificationInfo.endDate),
                certificatedDate: this.formatDate(this.qualificationInfo.certificatedDate)
            };
            if (this.editingIndex === -1) {
                updatedQualification.seqNo = this.qualificationList.length + 1;
                this.qualificationList.push(updatedQualification);
            } else {
                this.qualificationList[this.editingIndex] = updatedQualification;
                this.editingIndex = -1;
            }

            this.updateQualificationSeqNo();
            this.resetQualificationForm();
            this.addedButton = false;
        },

        onClickEditQualification(data: QUALIFICATION_LIST) {
            if(!this.isRegisterRoute){
                if (this.editingIndex !== -1) {
                    this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Please finish editing the current record first.', life: 3000 });
                    return;
                }
                this.$confirm.require({
                    message: 'Do you want to edit this record?',
                    header: 'Danger Zone',
                    accept: () => {
                        this.qualificationInfo = { ...data };
                        this.editingIndex = this.qualificationList.findIndex(item => item.seqNo === data.seqNo);
                        this.deleteQualificaton(data)
                        this.$toast.add({ summary: 'Confirmed', detail: 'Record edit', life: 3000 });
                    },
                    reject: () => {
                        this.$toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
                    }
                })
            }else{
                this.qualificationInfo = { ...data };
                this.editingIndex = this.qualificationList.findIndex(item => item.seqNo === data.seqNo);
                this.deleteQualificaton(data)
            }
        },

        onClickDeleteQualification(item: QUALIFICATION_LIST) {
            if(!this.isRegisterRoute){
                if (this.editingIndex !== -1) {
                    this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Please finish editing the current record first.', life: 3000 });
                    return;
                }
                this.$confirm.require({
                    message: 'Do you want to delete this record?',
                    header: 'Danger Zone',
                    accept: () => {
                        this.deleteQualificaton(item)
                        this.$toast.add({ summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
                    },
                    reject: () => {
                        this.$toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
                    }
                })
            }else{
                this.deleteQualificaton(item)
            }
        },

        deleteQualificaton(item: QUALIFICATION_LIST){
            this.qualificationList = this.qualificationList.filter(qual => qual.seqNo !== item.seqNo);
            this.updateQualificationSeqNo();
        },

        updateQualificationSeqNo() {
            this.qualificationList.forEach((qual, index) => {
                qual.seqNo = index + 1;
            });
        },
        
        /* =============================================================== */
        /* ======================= Student Register ====================== */
        /* =============================================================== */
        async studentRegister() {
            this.academicButton = true;
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
                ...this.userInfo,
                roleID: this.userSelectedRole,
                dateOfBirth: this.formatDateDatabase(this.userInfo.dateOfBirth),
                studentInfo: {
                    parentList: [
                        this.fatherInfo,
                        this.motherInfo
                    ],
                    academicList: academicList
                }
            };
            console.log(userInfoList)
            this.userList.push(userInfoList);
            const reqBody = {
                userList: this.userList
            };
            await requestService.request(API_PATH.USER_REGISTER, reqBody, true);
            // this.$router.push('/user-list');
        },

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
            }
            if (this.editingIndexAcademic === -1) {
                updatedAcademic.seqNo = this.studentAcademicList.length + 1;
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
            if(!this.isRegisterRoute){
                this.$confirm.require({
                    message: 'Do you want to edit this record?',
                    header: 'Danger Zone',
                    accept: () => {
                        this.academicInfo = { ...data };
                        this.editingIndexAcademic = this.studentAcademicList.findIndex(item => item.seqNo === data.seqNo);
                        this.$toast.add({ summary: 'Confirmed', detail: 'Record edit', life: 3000 });
                    },
                    reject: () => {
                        this.$toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
                    }
                });
            }else{
                this.academicInfo = { ...data };
                this.editingIndexAcademic = this.studentAcademicList.findIndex(item => item.seqNo === data.seqNo);
            }
        },

        onClickDeleteAcademic(item: ACADEMIC_LIST) {
            if (this.editingIndexAcademic !== -1) {
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Please finish editing the current record first.', life: 3000 });
                return;
            }
            if(!this.isRegisterRoute){
                this.$confirm.require({
                    message: 'Do you want to delete this record?',
                    header: 'Danger Zone',
                    accept: () => {
                        this.studentAcademicList = this.studentAcademicList.filter(qual => qual.seqNo !== item.seqNo);
                        this.updateAcademicNumbers();
                        this.$toast.add({ summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
                    },
                    reject: () => {
                        this.$toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
                    }
                });
            }else{
                this.studentAcademicList = this.studentAcademicList.filter(qual => qual.seqNo !== item.seqNo);
                this.updateAcademicNumbers();
            }
        },

        updateAcademicNumbers() {
            this.studentAcademicList.forEach((qual, index) => {
                qual.seqNo = index + 1;
            });
        },

        onChangeValidateAcademic() {
            // Validate fields on input change
            if (this.academicButton) {
                this.fieldAcademicName = this.academicInfo.academicName === '';
                this.fieldAcademicStartDate = this.academicInfo.startDate === '';
                this.fieldAcademicEndDate = this.academicInfo.endDate === '';
                this.fieldAcademicCertificatedDate = this.academicInfo.certificatedDate === '';
                this.studentRegisterFirstName = this.studentRegisterInfo.firstName === '';
                this.studentRegisterLastName = this.studentRegisterInfo.lastName === '';
                this.studentRegisterDateOfBirth = this.studentRegisterInfo.dateOfBirth === '';
                this.studentRegisterPlaceOfBirth = this.studentRegisterInfo.placeOfBirth === '';
                this.studentRegisterAddress = this.studentRegisterInfo.address === '';
                this.studentRegisterPhone = this.studentRegisterInfo.phone === '';
                this.studentRegisterEmail = this.studentRegisterInfo.email === '';

                this.fatherFirstName = this.fatherInfo.firstName === '';
                this.fatherLastName = this.fatherInfo.lastName === '';
                this.fatherPhone = this.fatherInfo.phone === '';

                this.motherFirstName = this.motherInfo.firstName === '';
                this.motherLastName = this.motherInfo.lastName === '';
                this.motherPhone = this.motherInfo.phone === '';
            }
        },
        
        /* =============================================================== */
        /* ============================ Common =========================== */
        /* =============================================================== */
        async getUserDetailSummary() {
            const body = {
                userID: this.userIDFromURl
            };
            const response = (await requestService.request(API_PATH.USER_DETAIL, body, false)) as USER_DETAIL_RES;
            this.userSelectedRole = response.body.roleID;
            this.userInfo = response.body
            if(this.userSelectedRole === '04'){
                this.fatherInfo = response.body?.studentInfo?.parentList[0]
                this.motherInfo = response.body?.studentInfo?.parentList[1]
                this.studentAcademicList = response.body?.studentInfo?.academicList
            }else{
                this.qualificationList = response.body?.teacherInfo?.qualificationList
            }
        },

        checkQualRequireFields() {
            if (this.addedButton) {
                this.qualCheckFields.qualificationName = this.qualificationInfo.qualificationName === '';
                this.qualCheckFields.startDate = this.qualificationInfo.startDate === '';
                this.qualCheckFields.endDate = this.qualificationInfo.endDate === '';
                this.qualCheckFields.certificatedDate = this.qualificationInfo.certificatedDate === '';
            }
        },

        checkUserRequireFields(){
            if(this.addedButton){
                this.userInfoCheckFields.firstName = this.userInfo.firstName === '';
                this.userInfoCheckFields.lastName = this.userInfo.lastName === '';
                this.userInfoCheckFields.dateOfBirth = this.userInfo.dateOfBirth === '';
                this.userInfoCheckFields.placeOfBirth = this.userInfo.placeOfBirth === '';
                this.userInfoCheckFields.address = this.userInfo.address === '';
                this.userInfoCheckFields.phone = this.userInfo.phone === '';
                this.userInfoCheckFields.email = this.userInfo.email === '';
            }
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

        isValidEmail(email: string): boolean {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailPattern.test(email);
        },
        
        resetForm() {
            this.userInfo = {
                firstName: '',
                lastName: '',
                gender: '',
                dateOfBirth: '',
                placeOfBirth: '',
                address: '',
                phone: '',
                email: '',
            } as USER_LIST
            this.routerName = this.$route.name
            this.userInfoCheckFields= {
                firstName: false,
                lastName: false,
                gender: false,
                dateOfBirth: false,
                placeOfBirth: false,
                address: false,
                phone: false,
                email: false,
            } as USER_LIST_FORM_CHECK,
            this.qualificationList = []
        },

        resetQualificationForm() {
            this.qualificationInfo = {
                qualificationName: '',
                qualificationDesc: '',
                startDate: '',
                endDate: '',
                certificatedDate: ''
            }
        },
        
        resetAcademicForm() {
            this.academicInfo = {
                academicName: '',
                academicDesc: '',
                startDate: '',
                endDate: '',
                certificatedDate: ''
            }
        },
    }
});
</script>

<style>
@import url('./user-register.scss');
</style>
