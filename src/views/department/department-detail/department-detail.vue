<template src="./department-detail.html"></template>

<script lang="ts">
import { modalController } from '@ionic/vue';
import { PropType, defineComponent } from 'vue';
import { DEPARTMENT_LIST } from '@/shared/types/department-list';
import { StandardCodeData } from '@/shared/types/standard-code';
import { API_PATH } from '@/shared/common/api-path';
import { RequestService } from '@/shared/services/request-service';

const requestService = new RequestService();

export default defineComponent({
  name: "department-detail",
  props: {
    department: {
      type: Object as PropType<DEPARTMENT_LIST>,
      required: true
    }
  },

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
    this.departmentInfo = this.department;
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
        requestService.request(API_PATH.DEPARTMENT_UPDATE, reqBody)
        this.handleClose();
    }
  },

})
</script>

<style scoped>
@import url('./department-detail.scss');
</style>
