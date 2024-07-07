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
  components:{
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
      departmentInfo: {} as DEPARTMENT_LIST,
      managerList: [] as ManagerList[],
      teacherID: '' as string,
      teacherFullName: '' as string,
      statusCodeList: globalStatusCodeList,
    };
  },

  computed: {
  },

  mounted() {
    this.onInitData();
  },

  methods: {
    onInitData(){
      if(!this.isRegister){
        this.departmentInfo = this.department;
      }
      this.teacherID = this.department.teacherID
      this.teacherFullName = this.department?.firstName?.concat(' - ', this.department?.lastName || '') || ''
      this.onGetDepartmentManager();
    },

    async onClickUpdate(){
      const reqBody = {
        ...this.departmentInfo,
        teacherID: this.teacherID
      }
      const res = await requestService.request(API_PATH.DEPARTMENT_UPDATE, reqBody, true) as DEPARTMENT_LIST;
      this.departmentInfo = res;
      if(res){
        modalController.dismiss();
      }
    },

    async onGetDepartmentManager(){
      const reqBody: ManagerList_Req = {
        userID: "",
        roleID: "02",//02: Department Manager
        pageSize: 50,
        pageNumber: 0
      }
      const res = await requestService.request(API_PATH.USER_LIST, reqBody, false) as ManagerList_Res;
      this.managerList = res?.body.userList.map((data) =>{
        return{
          ...data,
          fullName: data.firstName.concat(' - ',data.lastName)
        }
      })
    },
    
    handleClose(){
      modalController.dismiss();
    }
  },
});
</script>

<style scoped>
@import url('./department-edit.scss');
</style>