<template src="./studentClass-action.html"></template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { TEACHER_RES } from '@/shared/types/user-list';
import { CLASS_LIST, CLASS_LIST_RES } from '@/shared/types/class-list';
import { API_PATH } from '@/shared/common/api-path';
import { RequestService } from '@/shared/services/request-service';
import { GenderCodeList, globalStatusCodeList } from '@/shared/common/common';
import { modalController } from '@ionic/vue';

const requestService = new RequestService();

export default defineComponent({
    name: 'studentClass_action',
    props: {
        studentInfoData: {
            type: Object as PropType<CLASS_LIST>,
            required: true
        },
    },
    data() {
        return {
            studentClassList: [] as CLASS_LIST[],
            genderCodeList: GenderCodeList,
            statusCodeList: globalStatusCodeList,
            searchKey: '',
            Loading: false,
            totalCount: 0,
            pageSize: 10,
            pageNumber: 0,
            studentList: [] as any[],
            selectedStudent: [] as any[],
            searchQuery: '',
        };
    },
    computed: {
        filteredStudentList() {
            if (!this.searchQuery) {
                return this.studentList;
            }
            const query = this.searchQuery.toLowerCase();
            return this.studentList.filter(student =>
                student.firstName.toLowerCase().includes(query) ||
                student.lastName.toLowerCase().includes(query) ||
                student.gender.toLowerCase().includes(query) ||
                student.dateOfBirth.toLowerCase().includes(query) ||
                student.phone.toLowerCase().includes(query)
            );
        },
        studentsNotInClass() {
            const classStudentIDs = new Set(this.studentClassList.map(student => student.studentID));
            return this.filteredStudentList.filter(student => !classStudentIDs.has(student.specificID));
        },
        checkSelectedStudent(): boolean{
            return this.selectedStudent.length > 0;
        }
    },

    mounted() {
        this.onGetStudentList();
        this.getStudentListInClass();
    },

    methods: {
        async onGetStudentList() {
            const reqBody = {
                searchKey: this.searchKey,
                roleID: '04',
                pageSize: 10000,
                pageNumber: 1
            };
            const response = await requestService.request(API_PATH.USER_LIST, reqBody, false) as TEACHER_RES;
            if (response.body?.userList) {
                this.studentList = response.body.userList.map(student => ({
                    ...student,
                    fullName: `${student.firstName} ${student.lastName}`,
                    gender: this.$codeConverter.codeToString(this.genderCodeList, student.gender, 'genderCode'),
                }));
            }
        },

        async getStudentListInClass() {
            const reqBody = {
                classInfoID: this.studentInfoData.classInfoID,
                studentID: '',
            };

            const response = await requestService.request(API_PATH.STUDENT_CLASS_LIST, reqBody, false) as CLASS_LIST_RES;
            this.studentClassList = response.body.studentList.map((student) => ({
                ...student,
                fullName: `${student.firstName} ${student.lastName}`,
                gender: this.$codeConverter.codeToString(this.genderCodeList, student.gender, 'genderCode'),
            }));
        },

        async onAddStudentToClass() {
            const studentList = this.selectedStudent.map(student => ({
                studentID: student.specificID
            }));
            const requestBody = {
                classInfoID: this.studentInfoData.classInfoID,
                studentList: studentList
            };
            const response = await requestService.request(API_PATH.STUDENT_CLASS_REGISTER, requestBody, false) as any;
            this.studentClassList = response.body.studentList.map((student) => ({
                ...student,
                fullName: `${student.firstName} ${student.lastName}`,
                gender: this.$codeConverter.codeToString(this.genderCodeList, student.gender, 'genderCode'),
            }));

            if(response){
                this.$toast.add({ summary: 'Confirmed', detail: 'The information has been added successfully.', life: 1500 });
            }
        },

        onClose() {
            modalController.dismiss();
        }
    },
});
</script>
