<template src="./user-register.html"></template>

<script lang="ts">
import { API_PATH } from '@/shared/common/api-path';
import { USER_LIST, QUALIFICATION_LIST, PARENT_LIST, ACADEMIC_LIST, USER_DETAIL_RES, USER_LIST_FORM_CHECK, QUALIFICATION_LIST_FORM_CHECK, ACADEMIC_LIST_FORM_CHECK, PARENT_LIST_FORM_CHECK } from '@/shared/types/user-list';
import { RequestService } from '@/shared/services/request-service';
import { defineComponent } from 'vue';
import { TeacherRoleList,UserRole } from '@/shared/common/common';
import { CLASS_LIST, CLASS_LIST_REQ, CLASS_LIST_RES } from '@/shared/types/class-list';
import { DEPARTMENT_LIST, DEPARTMENT_LIST_REQ, DEPARTMENT_LIST_RES } from '@/shared/types/department-list';
const requestService = new RequestService();

export default defineComponent({
    name: 'UserRegister',

    data() {
        return {
            userList: [] as USER_LIST[],
            qualificationList: [] as QUALIFICATION_LIST[],
            studentAcademicList: [] as ACADEMIC_LIST[],
            teacherRoleList: TeacherRoleList,
            userRole: UserRole,
            userInfo: {
                firstName: '',
                lastName: '',
                gender: '',
                dateOfBirth: '',
                placeOfBirth: '',
                address: '',
                phone: '',
                email: '',
                classInfoID: '',
                departmentID: '',
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
            academicCheckFields: {
                academicName: false,
                startDate: false,
                endDate: false,
                certificatedDate: false
            } as ACADEMIC_LIST_FORM_CHECK,
            fatherCheckFields:{
                firstName: false,
                lastName: false,
                job: false,
                address: false,
                phone: false
            } as PARENT_LIST_FORM_CHECK,
            motherCheckFields:{
                firstName: false,
                lastName: false,
                job: false,
                address: false,
                phone: false
            } as PARENT_LIST_FORM_CHECK,
            classList: [] as CLASS_LIST[],
            departmentList: [] as DEPARTMENT_LIST[],

            customRowClass: 'col-lg-4 col-sm-6 col-xl-3 mb-2',
            customFormClass: 'form-label font_15',
            userSelectedRole: '03',
            teacherSelectedRole: '03',
            customNoClass: 'table_no',
            addedButton: false,
            academicButton: false,
            
            editingIndex: -1,
            editingIndexAcademic: -1,

            userIDFromURl: this.$route.params.userID,
            routerName: this.$route.name,
        };
    },

    watch:{
        'userSelectedRole'(){
            if(this.userSelectedRole !== '03'){
                this.getClassList()
            }else{
                this.getDepartmentList()
            }
        }
    },
    
    mounted() {
        if (!this.isRegisterRoute) {
            this.getUserDetailSummary();
        }
        this.getDepartmentList()
    },

    beforeRouteEnter(to, from, next) {
        next(vm => vm.resetForm());
    },

    beforeRouteUpdate(to, from, next) {
        this.resetForm();
        next();
    },

    computed: {
        isValidCommonUserInfo(): boolean{
            return this.userInfo.firstName !== '' &&
                this.userInfo.lastName !== '' &&
                this.userInfo.gender !== '' &&
                this.userInfo.dateOfBirth !== '' &&
                this.userInfo.placeOfBirth !== '' &&
                this.userInfo.address !== '' &&
                this.userInfo.phone !== '' &&
                this.userInfo.email !== '';
        },

        checkUserSpecificErrorFields() {
            this.userInfoCheckFields.firstName = this.userInfo.firstName === '';
            this.userInfoCheckFields.lastName = this.userInfo.lastName === '';
            this.userInfoCheckFields.dateOfBirth = this.userInfo.dateOfBirth === '';
            this.userInfoCheckFields.placeOfBirth = this.userInfo.placeOfBirth === '';
            this.userInfoCheckFields.address = this.userInfo.address === '';
            this.userInfoCheckFields.phone = this.userInfo.phone === '';
            this.userInfoCheckFields.email = !this.isValidEmail(this.userInfo.email);
        },

        isValidQualification(): boolean {
            return this.qualificationInfo.qualificationName !== '' &&
                this.qualificationInfo.startDate !== '' &&
                this.qualificationInfo.endDate !== '' &&
                this.qualificationInfo.certificatedDate !== ''
        },

        checkQualSpecificErrorFields() {
            this.qualCheckFields.qualificationName = this.qualificationInfo.qualificationName === '';
            this.qualCheckFields.startDate = this.qualificationInfo.startDate === '';
            this.qualCheckFields.endDate = this.qualificationInfo.endDate === '';
            this.qualCheckFields.certificatedDate = this.qualificationInfo.certificatedDate === '';
        },

        isInvalidQualificationList(){
            return this.qualificationList.length <= 0;
        },

        isValidAcademic(): boolean {
            return this.academicInfo.academicName !== '' &&
                this.academicInfo.startDate !== '' &&
                this.academicInfo.endDate !== '' &&
                this.academicInfo.certificatedDate !== ''
        },

        checkAcademicSpecificErrorFields() {
            this.academicCheckFields.academicName = this.academicInfo.academicName === '';
            this.academicCheckFields.startDate = this.academicInfo.academicName === '';
            this.academicCheckFields.endDate = this.academicInfo.academicName === '';
            this.academicCheckFields.certificatedDate = this.academicInfo.academicName === '';
        },

        isInvalidAcademicList(){
            return this.studentAcademicList.length <= 0;
        },

        isValidFatherInfo(){
            return this.fatherInfo.firstName !== '' &&
                this.fatherInfo.firstName !== ''&&
                this.fatherInfo.job !== ''&&
                this.fatherInfo.address !== ''&&
                this.fatherInfo.phone !== ''
        },
        
        checkFatherSpecificErrorFields(){
            this.fatherCheckFields.firstName = this.fatherInfo.firstName === '';
            this.fatherCheckFields.lastName = this.fatherInfo.lastName === '';
            this.fatherCheckFields.job = this.fatherInfo.job === '';
            this.fatherCheckFields.address = this.fatherInfo.address === '';
            this.fatherCheckFields.phone = this.fatherInfo.phone === '';
        },

        isValidMotherInfo() {
            return this.motherInfo.firstName !== '' &&
                this.motherInfo.firstName !== '' &&
                this.motherInfo.job !== '' &&
                this.motherInfo.address !== '' &&
                this.motherInfo.phone !== ''
        },

        checkMotherSpecificErrorFields(){
            this.motherCheckFields.firstName = this.motherInfo.firstName === '';
            this.motherCheckFields.lastName = this.motherInfo.lastName === '';
            this.motherCheckFields.job = this.motherInfo.job === '';
            this.motherCheckFields.address = this.motherInfo.address === '';
            this.motherCheckFields.phone = this.motherInfo.phone === '';
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
            if (!this.isValidCommonUserInfo || (!this.isValidQualification && this.isInvalidQualificationList)) {
                this.checkUserSpecificErrorFields;
                if(this.isInvalidQualificationList){
                    this.checkQualSpecificErrorFields
                }
                return;
            }
            if(this.isInvalidQualificationList){
                this.checkQualSpecificErrorFields
                return;
            }
            const qualList = this.qualificationList.map((data) => {
                return {
                    qualificationName: data.qualificationName,
                    qualificationDesc: data.qualificationDesc,
                    startDate: this.formatDateDatabase(data.startDate),
                    endDate: this.formatDateDatabase(data.endDate),
                    certificatedDate: this.formatDateDatabase(data.certificatedDate),
                    statusCode: "01"
                }
            })
            const userInfoList = {
                ...this.userInfo,
                roleID: this.isRegisterStudent? this.userSelectedRole : this.teacherSelectedRole,
                dateOfBirth: this.formatDateDatabase(this.userInfo.dateOfBirth),
                teacherInfo:{
                    departmentID: this.userInfo.departmentID,
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

        async getDepartmentList() {
            const reqBody: DEPARTMENT_LIST_REQ = {
                userID: "",
                searchKey: '',
                pageSize: 1000,
                pageNumber: 1
            }
            const response = (await requestService.request(API_PATH.DEPARTMENT_LIST, reqBody, false)) as DEPARTMENT_LIST_RES;
            this.departmentList = response.body?.departmentList
        },

        addQualificationToList() {
            // Reset the validation state
            this.qualCheckFields = {
                qualificationName: false,
                startDate: false,
                endDate: false,
                certificatedDate: false
            };

            // Check if the qualification is valid before adding/updating
            if (!this.isValidQualification) {
                this.checkQualSpecificErrorFields
                return;
            }

            // Format the dates before updating the qualification
            const updatedQualification: QUALIFICATION_LIST = {
                ...this.qualificationInfo,
                startDate: this.formatDate(this.qualificationInfo.startDate),
                endDate: this.formatDate(this.qualificationInfo.endDate),
                certificatedDate: this.formatDate(this.qualificationInfo.certificatedDate)
            };

            // If adding a new qualification
            if (this.editingIndex === -1) {
                updatedQualification.seqNo = this.qualificationList.length + 1;
                this.qualificationList.push(updatedQualification);
            } else {
                // If editing an existing qualification, replace it in the list
                this.qualificationList[this.editingIndex] = updatedQualification;
                this.editingIndex = -1;
            }

            // Update the sequence numbers
            this.updateQualificationSeqNo();

            // Reset the form and state
            this.resetQualificationForm();
            this.addedButton = false;
        },

        onClickEditQualification(data: QUALIFICATION_LIST) {
            if (this.isRegisterRoute) {
                if (this.editingIndex !== -1) {
                    this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Please finish editing the current record first.', life: 3000 });
                    return;
                }

                // Confirm before editing
                this.$confirm.require({
                    message: 'Do you want to edit this record?',
                    header: 'Danger Zone',
                    accept: () => {
                        // Load the selected qualification into the form for editing
                        this.qualificationInfo = { ...data };
                        this.editingIndex = this.qualificationList.findIndex(item => item.seqNo === data.seqNo);
                        this.$toast.add({ summary: 'Confirmed', detail: 'Record edit', life: 3000 });
                    },
                    reject: () => {
                        this.$toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
                    }
                });
            } else {
                // For non-register routes, just load the data into the form for editing
                this.qualificationInfo = { ...data };
                this.editingIndex = this.qualificationList.findIndex(item => item.seqNo === data.seqNo);
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
                    accept: async () => {

                        const reqBody = {
                            ...this.userInfo,
                            teacherInfo:({
                                qualificationList:[{
                                    ...item,
                                    teacherID: this.userInfo.specificID,
                                    statusCode: "02",
                                    seqNo: item.seqNo,
                                    certificatedDate: this.formatDateDatabase(item.certificatedDate),
                                    startDate: this.formatDateDatabase(item.startDate),
                                    endDate: this.formatDateDatabase(item.endDate)
                                }]
                            })
                        };

                        await requestService.request(API_PATH.USER_UPDATE, reqBody, false);

                        this.deleteQualification(item)
                        this.$toast.add({ summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
                    },
                    reject: () => {
                        this.$toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
                    }
                })
            }else{
                this.deleteQualification(item)
            }
        },

        deleteQualification(item: QUALIFICATION_LIST){
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
            if (!this.isValidCommonUserInfo || !this.isValidFatherInfo || !this.isValidMotherInfo || (!this.isValidAcademic && this.isInvalidAcademicList)) {
                this.checkUserSpecificErrorFields
                this.checkFatherSpecificErrorFields
                this.checkMotherSpecificErrorFields
                if (this.isInvalidAcademicList) {
                    this.checkAcademicSpecificErrorFields
                }
                return
            }
            if(this.isInvalidAcademicList){
                this.checkAcademicSpecificErrorFields
                return
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
                ...this.userInfo,
                roleID: this.userSelectedRole,
                dateOfBirth: this.formatDateDatabase(this.userInfo.dateOfBirth),
                studentInfo: {
                    classInfoID: this.userInfo.classInfoID,
                    parentList: [
                        this.fatherInfo,
                        this.motherInfo
                    ],
                    academicList: academicList
                }
            };
            this.userList.push(userInfoList);
            const reqBody = {
                userList: this.userList
            };
            await requestService.request(API_PATH.USER_REGISTER, reqBody, true);
        },

        async getClassList() {
            const reqBody: CLASS_LIST_REQ = {
                classID: '',
                departmentID: '',
                searchKey: '',
                year: '',
                semester: '',
                pageSize: 1000,
                pageNumber:  1
            }
            const response = (await requestService.request(API_PATH.CLASS_LIST, reqBody, false)) as CLASS_LIST_RES;
            this.classList = response.body.classList
        },






        addAcademicToList() {
            this.academicCheckFields = {
                academicName: false,
                startDate: false,
                endDate: false,
                certificatedDate: false
            }
            this.academicButton = true;
            if (!this.isValidAcademic) {
                this.checkAcademicSpecificErrorFields
                return
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
            this.updateAcademicSeqNo();
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
                        this.deleteAcademic(data)
                        this.$toast.add({ summary: 'Confirmed', detail: 'Record edit', life: 3000 });
                    },
                    reject: () => {
                        this.$toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
                    }
                });
            }else{
                this.academicInfo = { ...data };
                this.editingIndexAcademic = this.studentAcademicList.findIndex(item => item.seqNo === data.seqNo);
                this.deleteAcademic(data)
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
                    accept: async () => {

                        if (this.userInfo.roleID == "04") {
                            var reqBody = {
                                ...this.userInfo,
                                studentInfo:({
                                    ...this.userInfo.studentInfo,
                                    academicList:[{
                                        ...item,
                                        studentID: this.userInfo.specificID,
                                        statusCode: "02",
                                        seqNo: item.seqNo,
                                        certificatedDate: this.formatDateDatabase(item.certificatedDate),
                                        startDate: this.formatDateDatabase(item.startDate),
                                        endDate: this.formatDateDatabase(item.endDate)
                                    }]
                                })
                            };
                        }

                        await requestService.request(API_PATH.USER_UPDATE, reqBody, false);
                        this.deleteAcademic(item)
                        this.$toast.add({ summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
                    },
                    reject: () => {
                        this.$toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
                    }
                });
            }else{
                this.deleteAcademic(item)
            }
        },






        updateAcademicSeqNo() {
            this.studentAcademicList.forEach((qual, index) => {
                qual.seqNo = index + 1;
            });
        },

        deleteAcademic(item: ACADEMIC_LIST) {
            this.studentAcademicList = this.studentAcademicList.filter(qual => qual.seqNo !== item.seqNo);
            this.updateAcademicSeqNo();
        },

        /* =============================================================== */
        /* ======================= Update User =========================== */
        /* =============================================================== */
        async onClickUpdateUser(){

            let qualificationList = [];
            let studentAcademicList = [];

            if (Array.isArray(this.qualificationList) && this.qualificationList.length > 0) {
                qualificationList = this.qualificationList.map(item => ({
                    teacherID: this.userInfo.specificID || '',
                    ...item,
                    startDate: this.formatDateDatabase(item.startDate),
                    endDate: this.formatDateDatabase(item.endDate),
                    certificatedDate: this.formatDateDatabase(item.certificatedDate),
                    statusCode: "01"
                }));
            } 

            if (Array.isArray(this.studentAcademicList) && this.studentAcademicList.length > 0) {
                studentAcademicList = this.studentAcademicList.map(item => ({
                    studentID: this.userInfo.specificID || '',
                    ...item,
                    startDate: this.formatDateDatabase(item.startDate),
                    endDate: this.formatDateDatabase(item.endDate),
                    certificatedDate: this.formatDateDatabase(item.certificatedDate),
                    statusCode: "01"
                }));
            }

            if (this.userInfo.roleID == "04") {
                var reqBody = {
                    ...this.userInfo,
                    studentInfo: {
                        ...this.userInfo.studentInfo,
                        academicList: studentAcademicList // Ensure academicList is an array
                    }
                };
            }
            else{
                var reqBody = {
                    ...this.userInfo,
                    teacherInfo: {
                        qualificationList 
                    }
                };
            }

            // const res = await requestService.request(API_PATH.USER_UPDATE, reqBody, true);
            // if(res.header.result){
            //     console.log(res)
            // }
            // this.backToList();
        },
        backToList(){
            this.$router.push('/user-list')
        },
        
        /* =============================================================== */
        /* ============================ Common =========================== */
        /* =============================================================== */
        async getUserDetailSummary() {
            const body = {
                userID: this.userIDFromURl
            };
            
            // Requesting user details from the API
            const response = (await requestService.request(API_PATH.USER_DETAIL, body, false)) as USER_DETAIL_RES;

            // Set user role and user information
            this.userSelectedRole = response.body.roleID;
            this.userInfo = response.body;

            // If the user is a student (role ID 04), set parent and academic information
            if (this.userSelectedRole === '04') {
                this.fatherInfo = response.body?.studentInfo?.parentList[0];
                this.motherInfo = response.body?.studentInfo?.parentList[1];
                this.studentAcademicList = response.body?.studentInfo?.academicList.map(academicList => ({
                    ...academicList,
                    certificatedDate: this.formatDate2(academicList.certificatedDate),
                    startDate: this.formatDate2(academicList.startDate),
                    endDate: this.formatDate2(academicList.endDate)
                }));

            // If the user is a teacher, set qualification list and format certificatedDate
            } else {
                this.qualificationList = response.body?.teacherInfo?.qualificationList.map(qualification => ({
                    ...qualification,
                    certificatedDate: this.formatDate2(qualification.certificatedDate),
                    startDate: this.formatDate2(qualification.startDate),
                    endDate: this.formatDate2(qualification.endDate)
                }));
            }
        },

        checkUserRequireFields(){
            if(this.addedButton){
                this.checkUserRequireFields
            }
        },

        checkQualRequireFields() {
            this.checkQualSpecificErrorFields
        },

        checkAcademicRequireFields() {
            this.checkAcademicSpecificErrorFields
        },

        checkFatherInfoRequireFields() {
            this.checkFatherSpecificErrorFields
        },

        checkMotherInfoRequireFields() {
            this.checkMotherSpecificErrorFields
        },

        formatDate(dateString: string): string {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return ''; // Return empty string if invalid date
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        },

        formatDate2(dateString: string): string | number {
            // Check if the date is already in YYYY-MM-DD format
            const isFormatted = /^\d{4}-\d{2}-\d{2}$/.test(dateString);
            
            if (isFormatted) {
                return 0; // Already formatted, return 0
            }

            // Ensure the unformatted date is exactly 8 characters long
            if (dateString.length !== 8) return ''; // Invalid format, return empty string
            
            // Extract year, month, and day
            const year = dateString.substring(0, 4);
            const month = dateString.substring(4, 6);
            const day = dateString.substring(6, 8);

            // Return formatted date in YYYY-MM-DD format
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
                classInfoID: '',
                departmentID: ''
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
/* @import url('./user-register.scss'); */
</style>
