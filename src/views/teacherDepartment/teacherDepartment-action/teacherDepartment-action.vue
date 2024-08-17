<template src="./teacherDepartment-action.html"></template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { TEACHER_DEPARTMENT_LIST, TEACHER_DEPARTMENT_LIST_RES } from '@/shared/types/teacherDepartment-list';
import { TEACHER_RES } from '@/shared/types/user-list';
import { DEPARTMENT_LIST, DEPARTMENT_LIST_RES } from '@/shared/types/department-list';
import { API_PATH } from '@/shared/common/api-path';
import { RequestService } from '@/shared/services/request-service';
import { GenderCodeList, globalStatusCodeList, UserRoleList } from '@/shared/common/common';
import { modalController } from '@ionic/vue';

const requestService = new RequestService();

export default defineComponent({
    name: 'teacherDepartment_action',
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
            teacherList: [] as TEACHER_DEPARTMENT_LIST[],
            departmentList: [] as DEPARTMENT_LIST[],
            genderCodeList: GenderCodeList,
            statusCodeList: globalStatusCodeList,
            userRoleList: UserRoleList,
            searchKey: '',
            Loading: false,
            selectedTeacher: [],
            searchQuery: '',
            tempSearchQuery: '',
            teacherUpdateList: this.teacherInfoData.departmentID,
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
        this.loadDepartmentTeachers();
    },
    methods: {

        async loadDepartmentTeachers() {
            const reqBody = {
                teacherID: '',
                departmentID: this.teacherInfoData.departmentID
            };

            const response = (await requestService.request(API_PATH.TEACHER_DEPARTMENT_LIST, reqBody, false)) ;

            if (response.body && response.body.departmentList) {
                this.teacherUpdateList = response.body.departmentList.map((teacher: { teacherID: any; firstName: any; lastName: any; }) => ({
                    ...teacher,
                    specificID: teacher.teacherID,
                    storedIndex: undefined,
                    fullName: `${teacher.firstName} ${teacher.lastName}`,
                }));
            } 
        },

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
            const teacherUpdateListData = this.teacherUpdateList.map((teacher: { specificID: any; originalRoleID: any; }) => ({
                teacherID: teacher.specificID,
                roleCode: teacher.originalRoleID,
                statusCode: '01'
            }));

            const requestBody = {
                departmentID: this.teacherInfoData.departmentID,
                teacherList: teacherUpdateListData
            };

            await requestService.request(API_PATH.TEACHER_DEPARTMENT_UPDATE, requestBody, false);
            this.$toast.add({ severity: 'success', summary: 'Success', detail: 'Data saved successfully!', life: 3000 });
            this.onClose();
        },

        onClickAddData(item: TEACHER_DEPARTMENT_LIST) {
            const existsInUpdateList = this.teacherUpdateList.some((teacher: { specificID: any; }) => teacher.specificID === item.specificID);
    
            if (!existsInUpdateList) {
                const filteredIndex = this.filteredTeacherList.findIndex(teacher => teacher.specificID === item.specificID);

                if (filteredIndex !== -1) {
                    item.storedIndex = filteredIndex;
                    this.teacherUpdateList.push(item);
                    this.filteredTeacherList.splice(filteredIndex, 1);
                }

                const originalIndex = this.teacherList.findIndex(teacher => teacher.specificID === item.specificID);
                if (originalIndex !== -1) {
                    this.teacherList.splice(originalIndex, 1);
                }
            }
        },

        onClickDelete(item: TEACHER_DEPARTMENT_LIST) {
            const updateIndex = this.teacherUpdateList.findIndex((teacher: { specificID: any; }) => teacher.specificID === item.specificID);
            if (updateIndex !== -1) {
                this.teacherUpdateList.splice(updateIndex, 1);
            }

            const filteredIndex = this.filteredTeacherList.findIndex(teacher => teacher.specificID === item.specificID);
            if (filteredIndex !== -1) {
                this.filteredTeacherList.splice(filteredIndex, 1);
            }

            const teacherIndex = this.teacherList.findIndex(teacher => teacher.specificID === item.specificID);
            if (teacherIndex === -1) {
                if (item.storedIndex !== undefined) {
                    this.teacherList.splice(item.storedIndex, 0, item);
                } else {
                    this.teacherList.push(item);
                }
            }

            if (item.storedIndex !== undefined) {
                const filteredItemIndex = this.filteredTeacherList.findIndex(teacher => teacher.specificID === item.specificID);
                if (filteredItemIndex !== -1) {
                    this.filteredTeacherList.splice(filteredItemIndex, 1);
                }

                this.filteredTeacherList.splice(item.storedIndex, 0, item);
                delete item.storedIndex;
            }
        },

        onClose() {
            modalController.dismiss();
        }
    },
});
</script>
