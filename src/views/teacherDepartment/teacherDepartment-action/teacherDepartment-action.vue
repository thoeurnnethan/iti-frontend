<template src="./teacherDepartment-action.html"></template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { TEACHER_DEPARTMENT_LIST, TEACHER_DEPARTMENT_LIST_RES } from '@/shared/types/teacherDepartment-list';
import { TEACHER_RES } from '@/shared/types/user-list';
import { DEPARTMENT_LIST, DEPARTMENT_LIST_RES } from '@/shared/types/department-list';
import { API_PATH } from '@/shared/common/api-path';
import { RequestService } from '@/shared/services/request-service';
import { GenderCodeList , globalStatusCodeList , UserRoleList } from '@/shared/common/common';
import { modalController } from '@ionic/vue';

const requestService = new RequestService();

export default defineComponent({
    name: 'teacherDepartment_action',
    props: {
        subjectInfoData: {
            type: Object as PropType<TEACHER_DEPARTMENT_LIST>,
            required: true
        },
        isInsert: {
            type: Boolean,
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
            departmentList: [] as DEPARTMENT_LIST[],
            genderCodeList: GenderCodeList,
            statusCodeList: globalStatusCodeList,
            userRoleList: UserRoleList,
            searchKey: '',
            Loading: false,
            totalCount: 0,
            pageSize: 10,
            pageNumber: 0,
            teacherList: [] as TEACHER_RES[],
            selectedTeacher: [],
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
                teacher.fullName.toLowerCase().includes(query) ||
                teacher.gender.toLowerCase().includes(query) ||
                teacher.dateOfBirth.toLowerCase().includes(query) ||
                teacher.phone.toLowerCase().includes(query) || 
                teacher.roleID.toLowerCase().includes(query)
            );
        }
    },
    mounted() {
        this.onDataLoad();
        this.onGetDepartmentList();
        this.onGetStudentList();
    },
    methods: {
        onDataLoad() {
            if (!this.isInsert) {
                this.teacherDepartmentInfo = { ...this.subjectInfoData };
                this.subjectInfoUpdate = { ...this.teacherDepartmentInfo };
            }
        },

        async onGetDepartmentList() {
            const reqBody = {
                searchKey: this.searchKey,
                pageSize: 1000,
                pageNumber: 1
            };
            const response = await requestService.request(API_PATH.DEPARTMENT_LIST, reqBody, false) as DEPARTMENT_LIST_RES;
            this.departmentList = response.body?.departmentList;
        },

        async onGetStudentList() {
            const reqBody = {
                searchKey: this.searchKey,
                roleID: '',
                pageSize: 1000,
                pageNumber: 1
            };
            const response = await requestService.request(API_PATH.USER_LIST, reqBody, false) as TEACHER_RES;
            const filteredResponse = Array.isArray(response.body.userList) ? response.body.userList.filter(teacher => teacher.roleID !== '04') : [];
            if (filteredResponse.length > 0) {
                this.teacherList = filteredResponse.map(teacher => ({
                    ...teacher,
                    fullName: `${teacher.firstName} ${teacher.lastName}`,
                    gender: this.$codeConverter.codeToString(this.genderCodeList, teacher.gender),
                    roleID: this.$codeConverter.codeToString(this.userRoleList, teacher.roleID),
                    originalRoleID: teacher.roleID
                }));
            }
        },

        async saveData() {
            const teacherList = this.selectedTeacher.map(teacher => ({
                teacherID: teacher.specificID,
                roleCode: teacher.originalRoleID
            }));
            const requestBody = {
                departmentID: this.teacherDepartmentInfo.departmentID,
                teacherList: teacherList
            };

            await requestService.request(API_PATH.TEACHER_DEPARTMENT_REGISTER, requestBody, true);
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
