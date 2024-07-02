<template src="./department-edit.html"></template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import { DEPARTMENT_LIST } from '@/shared/types/department-list';
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
    } 
  },

  data() {
    return {
      departmentInfo: {} as DEPARTMENT_LIST,
      statusCodeList: globalStatusCodeList,
      departmentInfoUpdate: {
        departmentID: '',
        departmentName: '',
        departmentDesc: '',
        statusCode: ''
      } as DEPARTMENT_LIST
    };
  },

  computed: {
    isValidForm(): boolean {
      return (
        this.departmentInfoUpdate.departmentID !== '' &&
        this.departmentInfoUpdate.departmentName !== '' &&
        this.departmentInfoUpdate.departmentDesc !== '' &&
        this.departmentInfoUpdate.statusCode !== ''
      );
    },
  },

  mounted() {
    this.departmentInfo= this.department
  },

  methods: {
    async onClickUpdate(){
      const reqBody = this.departmentInfo;
      const res = await requestService.request(API_PATH.DEPARTMENT_UPDATE, reqBody, true) as DEPARTMENT_LIST;
      this.departmentInfo = res;
      if(res){
        modalController.dismiss();
      }
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