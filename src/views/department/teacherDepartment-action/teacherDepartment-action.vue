<template src="./teacherDepartment-action.html"></template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { TEACHER_DEPARTMENT_LIST, TEACHER_DEPARTMENT_LIST_RES } from '@/shared/types/teacherDepartment-list';
import { TEACHER_RES, USER_LIST } from '@/shared/types/user-list';
import { DEPARTMENT_LIST } from '@/shared/types/department-list';
import { API_PATH } from '@/shared/common/api-path';
import { RequestService } from '@/shared/services/request-service';
import { GenderCodeList, globalStatusCodeList, UserRoleList } from '@/shared/common/common';
import { modalController } from '@ionic/vue';
import Toast from 'primevue/toast';
import ConfirmationDialog from 'primevue/confirmdialog';

const requestService = new RequestService();

export default defineComponent({
    name: 'teacherDepartment_action',
    components: {
        Toast,
        ConfirmationDialog
    },
    props: {
        teacherInfoData: {
            type: Object as PropType<DEPARTMENT_LIST>,
            required: true
        },
    },

    data() {
        return {
            teacherDepartmentInfo: {
                teacherID: '',
                departmentID: '',
            } as TEACHER_DEPARTMENT_LIST,
            subjectInfoUpdate: {} as TEACHER_DEPARTMENT_LIST,
            subjectList: [] as TEACHER_DEPARTMENT_LIST[],
            teacherDepList: [] as TEACHER_DEPARTMENT_LIST[],
            genderCodeList: GenderCodeList,
            statusCodeList: globalStatusCodeList,
            userRoleList: UserRoleList,
            searchKey: '',
            Loading: false,
            totalCount: 0,
            pageSize: 10,
            pageNumber: 0,
            teacherList: [] as USER_LIST[],
            selectedTeacher: [] as USER_LIST[],
            searchQuery: '',
            tempSearchQuery: '',
        };
    },

    computed: {
        filteredTeacherList() {
            if (!this.searchQuery) {
                return this.teacherList;
            }
            const query = this.searchQuery.toLowerCase();
            return this.teacherList.filter(teacher =>
                teacher.firstName.toLowerCase().includes(query) ||
                teacher.lastName.toLowerCase().includes(query) ||
                teacher.gender.toLowerCase().includes(query) ||
                teacher.dateOfBirth.toLowerCase().includes(query) ||
                teacher.phone.toLowerCase().includes(query) ||
                teacher.roleID.toLowerCase().includes(query)
            );
        },
        teachersInDepartment() {
            const departmentTeacherIDs = new Set(this.teacherDepList.map(teacher => teacher.teacherID));
            return this.filteredTeacherList.filter(teacher => !departmentTeacherIDs.has(teacher.specificID));
        },
        checkSelectedTeacher(): boolean{
            return this.selectedTeacher.length > 0;
        }
    },

    mounted() {
        this.onGetTeacherList();
        this.getTeacherDataInDept();
    },

    methods: {
        async onGetTeacherList() {
            const reqBody = {
                searchKey: this.searchKey,
                roleID: '',
                pageSize: 1000,
                pageNumber: 1
            };
            const response = await requestService.request(API_PATH.USER_LIST, reqBody, false) as TEACHER_RES;
            const filteredResponse = Array.isArray(response.body.userList) ? response.body.userList.filter(teacher => teacher.roleID !== '04' && teacher.roleID !== '01') : [];
            if (filteredResponse.length > 0) {
                this.teacherList = filteredResponse.map(teacher => ({
                    ...teacher,
                    fullName: `${teacher.specificID}-${teacher.firstName} ${teacher.lastName}`,
                    gender: this.$codeConverter.codeToString(this.genderCodeList, teacher.gender,'genderCode'),
                    roleID: this.$codeConverter.codeToString(this.userRoleList, teacher.roleID),
                    originalRoleID: teacher.roleID
                }));
            }
        },

        async getTeacherDataInDept() {
            const reqBody = {
                departmentID: this.teacherInfoData.departmentID,
                teacherID: '',
            };
            const response = await requestService.request(API_PATH.TEACHER_DEPARTMENT_LIST, reqBody, false) as any;
            this.teacherDepList = response.body.departmentList.map((teacher) => ({
                ...teacher,
                fullName: `${teacher.teacherID}-${teacher.firstName} ${teacher.lastName}`,
                gender: this.$codeConverter.codeToString(this.genderCodeList,teacher.gender,'genderCode'),
                roleID: this.$codeConverter.codeToString(this.userRoleList, teacher.roleID || ''),
            }));
            
        },

        async saveData() {
            const teacherList = this.selectedTeacher.map(teacher => ({
                teacherID: teacher.specificID,
                roleCode: teacher.originalRoleID,
                statusCode: '01'
            }));
            const requestBody = {
                departmentID: this.teacherInfoData.departmentID,
                teacherList: teacherList
            };

            const res = await requestService.request(API_PATH.TEACHER_DEPARTMENT_REGISTER, requestBody, true) as any;
            if(res.header.result){
                this.selectedTeacher = [] as USER_LIST[]
            }
            this.teacherDepList = res.body.teacherList.map((teacher) => ({
                ...teacher,
                fullName: `${teacher.teacherID}-${teacher.firstName} ${teacher.lastName}`,
                gender: this.$codeConverter.codeToString(this.genderCodeList,teacher.gender,'genderCode'),
                roleID: this.$codeConverter.codeToString(this.userRoleList, teacher.roleID || ''),
            }));
        },

        onSearch() {
            this.searchQuery = this.tempSearchQuery;
        },

        onClose() {
            modalController.dismiss();
        },

        rowClass(rowData: { isInDepartment: boolean }) {
            return rowData.isInDepartment ? 'disable_row' : '';
        }
    },
});
</script>
