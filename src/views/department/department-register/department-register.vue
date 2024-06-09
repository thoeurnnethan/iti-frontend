<template src="./department-register.html"></template>

<script lang="ts">
import { modalController } from '@ionic/vue';
import { PropType, defineComponent } from 'vue';
import { DEPARTMENT_LIST } from '@/shared/types/department-list';
import { StandardCodeData } from '@/shared/types/standard-code';
import { API_PATH } from '@/shared/common/api-path';
import { RequestService } from '@/shared/services/request-service';

const requestService = new RequestService();

export default defineComponent({
  name: "department-register",

  data() {
    return {
      departmentInfo: {} as DEPARTMENT_LIST,
      statusCodeList: [
        { codeValue: '01', codeValueDesc: 'Active' },
        { codeValue: '02', codeValueDesc: 'Inactive' },
      ] as StandardCodeData[],
    }
  },

  mounted() {
    console.log("Mounted")
  },

  unmounted() {
    console.log("UnMounted")
      this.departmentInfo = {} as DEPARTMENT_LIST
  },

  computed: {
    isSaveDisabled(): boolean {
      return Object.values(this.departmentInfo).some(value => !value);
    }
  },

  methods: {
    handleClose() {
      this.departmentInfo = {} as DEPARTMENT_LIST
      modalController.dismiss();
    },

    onClickUpdate(item: DEPARTMENT_LIST){
      const reqBody: DEPARTMENT_LIST= item
    }
  },

})
</script>

<style scoped>
@import url('./department-register.scss');
</style>
