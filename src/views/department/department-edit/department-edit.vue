<template src="./department-edit.html"></template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import { DEPARTMENT_LIST } from '@/shared/types/department-list';
import { ManagerList, ManagerList_Req, ManagerList_Res } from '@/shared/types/user-list';
import { modalController } from '@ionic/vue';
import { globalStatusCodeList } from '@/shared/common/common';
import { RequestService } from '@/shared/services/request-service';
import { API_PATH } from '@/shared/common/api-path';

const requestService = new RequestService();

export default defineComponent({
    name: "department-edit",
    components: {
    },

    props: {
        department: {
            type: Object as PropType<DEPARTMENT_LIST>,
            required: true
        },
        isRegister: {
            type: Boolean,
            required: true
        }
    },

    data() {
        return {
            departmentInfo: {
                departmentID: '',
                departmentName: '',
                departmentDesc: '',
                statusCode: '01',
            } as DEPARTMENT_LIST,
            teacherFullName: '' as string,
            departmentInfoUpdate: {} as DEPARTMENT_LIST,
            managerList: [] as ManagerList[],
            statusCodeList: globalStatusCodeList,
        };
    },

    watch: {
        '$i18n.locale'(){
            this.statusCodeList = this.$codeUtil.translateStatusCodelist()
        }
    },

    computed: {
        isValidRegister(): boolean {
            return this.departmentInfo.departmentName !== '' &&
                this.departmentInfo.departmentDesc !== '' &&
                this.departmentInfo.statusCode !== '';
        },
        isValidUpdate(): boolean {
            return this.departmentInfo.departmentName !== this.departmentInfoUpdate.departmentName ||
                this.departmentInfo.departmentDesc !== this.departmentInfoUpdate.departmentDesc ||
                this.departmentInfo.statusCode !== this.departmentInfoUpdate.statusCode ||
                this.departmentInfo.teacherID !== this.departmentInfoUpdate.teacherID;
        }
    },

    mounted() {
        this.onInitData();
        this.statusCodeList = this.$codeUtil.translateStatusCodelist()
    },

    methods: {
        onInitData() {
            if (!this.isRegister) {
                this.departmentInfo = { ...this.department }
                this.departmentInfoUpdate = { ...this.departmentInfo }
            }
            this.teacherFullName = this.departmentInfo?.firstName?.concat(' - ', this.departmentInfo?.lastName || '') || ''
            this.onGetDepartmentManager();
        },

        async onClickUpdate() {
            const reqBody = {
                ...this.departmentInfo,
            }
            const res = await requestService.request(API_PATH.DEPARTMENT_UPDATE, reqBody, false) as DEPARTMENT_LIST;
            this.departmentInfo = res;
            if (res) {
                modalController.dismiss();
                this.$toast.add({ summary: 'Confirmed', detail: 'The record has been updated.', life: 1000 });
            }
        },

        async onClickSave() {
            const reqBody = {
                ...this.departmentInfo,
            }
            const res = await requestService.request(API_PATH.DEPARTMENT_REGISTER, reqBody, false) as DEPARTMENT_LIST;
            this.departmentInfo = res;
            if (res) {
                modalController.dismiss();
                this.$toast.add({ summary: 'Confirmed', detail: 'The record has been inserted.', life: 1000 });
            }
        },

        async onGetDepartmentManager() {
            const reqBody: ManagerList_Req = {
                userID: "",
                roleID: "02",//02: Department Manager
                pageSize: 1000,
                pageNumber: 0
            }
            const res = await requestService.request(API_PATH.USER_LIST, reqBody, false) as ManagerList_Res;
            this.managerList = res?.body.userList.map((data) => {
                return {
                    ...data,
                    fullName: data.firstName.concat(' - ', data.lastName)
                }
            })
        },

        handleClose() {
            modalController.dismiss();
        }
    },
});
</script>

<style scoped>
@import url('./department-edit.scss');
</style>