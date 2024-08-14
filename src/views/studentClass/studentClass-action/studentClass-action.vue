<template src="./studentClass-action.html"></template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { STUDENT_CLASS_LIST } from '@/shared/types/studentClass-list';
import { TEACHER_RES } from '@/shared/types/user-list';
import { CLASS_LIST, CLASS_LIST_RES } from '@/shared/types/class-list';
import { API_PATH } from '@/shared/common/api-path';
import { RequestService } from '@/shared/services/request-service';
import { GenderCodeList , globalStatusCodeList } from '@/shared/common/common';
import { modalController } from '@ionic/vue';

const requestService = new RequestService();

export default defineComponent({
    name: 'studentClass_action',
    props: {
        subjectInfoData: {
            type: Object as PropType<STUDENT_CLASS_LIST>,
            required: true
        },
        isInsert: {
            type: Boolean,
            required: true
        },
    },
    data() {
        return {
            studentClassInfo: {
                classID: '',
                studentID: '',
            } as STUDENT_CLASS_LIST,
            subjectInfoUpdate: {} as STUDENT_CLASS_LIST,
            subjectList: [] as STUDENT_CLASS_LIST[],
            genderCodeList: GenderCodeList,
            statusCodeList: globalStatusCodeList,
            searchKey: '',
            Loading: false,
            totalCount: 0,
            pageSize: 10,
            pageNumber: 0,
            classList: [] as CLASS_LIST[],
            studentList: [] as TEACHER_RES[],
            selectedStudent: [],
            searchQuery: '',
            tempSearchQuery: '',
        };
    },
    computed: {
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
        }
    },
    mounted() {
        this.onDataLoad();
        this.onGetClassList();
        this.onGetStudentList();
    },
    methods: {
        onDataLoad() {
            if (!this.isInsert) {
                this.studentClassInfo = { ...this.subjectInfoData };
                this.subjectInfoUpdate = { ...this.studentClassInfo };
            }
        },

        async onGetClassList() {
            const reqBody = {
                classID: '',
                departmentID: '',
                searchKey: this.searchKey,
                year: '',
                semester: '',
                generation: '',
                pageSize: 1000,
                pageNumber: 1
            };
            const response = await requestService.request(API_PATH.CLASS_LIST, reqBody, false) as CLASS_LIST_RES;
            this.classList = response.body?.classList;
        },

        async onGetStudentList() {
            const reqBody = {
                searchKey: this.searchKey,
                roleID: '04',
                pageSize: 1000,
                pageNumber: 1
            };
            const response = await requestService.request(API_PATH.USER_LIST, reqBody, false) as TEACHER_RES;

            if (response.body?.userList) {
                this.studentList = response.body.userList.map(student => ({
                    ...student,
                    fullName: `${student.firstName} ${student.lastName}`,
                    gender: this.$codeConverter.codeToString(this.genderCodeList, student.gender),
                }));
            }
        },

        async saveStudent() {
            const studentList = this.selectedStudent.map(student => ({
                studentID: student.specificID
            }));
            const requestBody = {
                classInfoID: this.studentClassInfo.classID,
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
