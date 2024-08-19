<template src="./studentClass-action.html"></template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { STUDENT_CLASS_LIST } from '@/shared/types/studentClass-list';
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
            studentClassInfo: {
                classID: '',
                studentID: '',
            } as STUDENT_CLASS_LIST,
            classList: [] as CLASS_LIST[],
            genderCodeList: GenderCodeList,
            statusCodeList: globalStatusCodeList,
            searchKey: '',
            Loading: false,
            totalCount: 0,
            pageSize: 10,
            pageNumber: 0,
            studentList: [] as TEACHER_RES[],
            selectedStudent: [] as TEACHER_RES[],
            searchQuery: '',
            tempSearchQuery: '',
        };
    },
    computed: {
        // Filtered list based on search query
        filteredStudentList() {
            if (!this.searchQuery) {
                return this.studentList;
            }
            const query = this.searchQuery.toLowerCase();
            return this.studentList.filter(student =>
                student.fullName.toLowerCase().includes(query) ||
                student.gender.toLowerCase().includes(query) ||
                student.dateOfBirth.toLowerCase().includes(query) ||
                student.phone.toLowerCase().includes(query)
            );
        },
        // Students not in the class (to be displayed in the first table)
        studentsNotInClass() {
            const classStudentIDs = new Set(this.classList.map(student => student.studentID));
            return this.filteredStudentList.filter(student => !classStudentIDs.has(student.specificID));
        }
    },


    mounted() {
        this.onGetStudentList();
        this.getStudentInfoData();
    },
    methods: {
        async onGetStudentList() {
            const reqBody = {
                searchKey: this.searchKey,
                roleID: '04', // Assuming '04' is the role ID for students
                pageSize: 1000,
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

        async getStudentInfoData() {
            const reqBody = {
                classInfoID: this.studentInfoData.classInfoID,
                studentID: '',
            };

            try {
                const response = await requestService.request(API_PATH.STUDENT_CLASS_LIST, reqBody, false) as CLASS_LIST_RES;
                this.classList = response.body.studentList.map((student: { firstName: string; lastName: string; }) => ({
                    ...student,
                    fullName: `${student.firstName} ${student.lastName}`,
                }));
            } catch (error) {
                console.error('Error fetching student information:', error);
            }
        },

        async saveData() {
            const studentList = this.selectedStudent.map(student => ({
                studentID: student.specificID
            }));
            const requestBody = {
                classInfoID: this.studentInfoData.classInfoID,
                studentList: studentList
            };

            await requestService.request(API_PATH.STUDENT_CLASS_REGISTER, requestBody, true);
            this.onClose();
        },

        onSearch() {
            this.searchQuery = this.tempSearchQuery;
        },

        onClose() {
            modalController.dismiss();
        }
    },
});
</script>
