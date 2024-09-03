<template src="./department-detail.html"></template>

<script lang="ts">
import { modalController } from '@ionic/vue';
import { PropType, defineComponent } from 'vue';
import { RequestService } from '@/shared/services/request-service';
import { API_PATH } from '@/shared/common/api-path';
import { DEPARTMENT_LIST } from '@/shared/types/department-list';
import { TEACHER_DEPARTMENT_LIST } from '@/shared/types/teacherDepartment-list';
import { GenderCodeList, globalStatusCodeList, UserRoleList } from '@/shared/common/common';

const requestService = new RequestService();

export default defineComponent({
    name: "department-detail",
    props: {
        department: {
            type: Object as PropType<DEPARTMENT_LIST>,
            required: true
        },
        departmentMember: {
            type: Object as PropType<TEACHER_DEPARTMENT_LIST>,
            required: true
        },
    },

    data() {
        return {
            departmentInfo: {} as DEPARTMENT_LIST,
            departmentMemberInfo: {} as TEACHER_DEPARTMENT_LIST,
            GenderCodeList: GenderCodeList,
            UserRoleList: UserRoleList,
            statusCodeList: globalStatusCodeList
        }
    },

    mounted() {
        this.departmentInfo = this.department;
        this.departmentMemberInfo = this.departmentMember.map((member: { firstName: any; lastName: any, gender: any, roleID: any }, index: number) => ({
            ...member,
            fullName: `${member.firstName} ${member.lastName}`,
            no: index + 1,
            gender: this.$codeConverter.codeToString(this.GenderCodeList, member.gender),
            roleID: this.$codeConverter.codeToString(this.UserRoleList, member.roleID),
        }));
    },

    methods: {
        handleClose() {
            this.departmentMemberInfo = {} as TEACHER_DEPARTMENT_LIST
            modalController.dismiss();
        },
        async onClickAction(item: TEACHER_DEPARTMENT_LIST, statusCode: string) {
            let messageHeader = '';
            let messageAcceptDetail = '';
            let messageRejectDetail = 'You have rejected';
            let btnAcceptClass = 'btn ';
            
            if (statusCode === '02') {
                messageHeader = "Do you want to delete this record?";
                messageAcceptDetail = 'The record has been deleted.';
                btnAcceptClass += 'btn-danger';
            } 

            this.$confirm.require({
                message: messageHeader,
                header: 'Please Confirm',
                acceptLabel: 'Yes',
                acceptClass: btnAcceptClass,
                rejectLabel: 'No',
                rejectClass: 'btn btn-secondary',                

                accept: async () => {
                    const reqBody = {
                        departmentID: item.departmentID,
                        teacherList: [{
                            teacherID: item.teacherID,
                            roleCode: item.userRoleInDpm,
                            statusCode: '02'
                        }],
                    };

                    await requestService.request(API_PATH.TEACHER_DEPARTMENT_UPDATE, reqBody, false) as TEACHER_DEPARTMENT_LIST;
                    this.departmentMemberInfo
                    this.$toast.add({ summary: 'Confirmed', detail: messageAcceptDetail, life: 1000 });
                    modalController.dismiss();
                },
                reject: () => {
                    this.$toast.add({ severity: 'error', summary: 'Rejected', detail: messageRejectDetail, life: 1000 });
                }
            });
        },
    },

})
</script>

<style scoped>
@import url('./department-detail.scss');
</style>
