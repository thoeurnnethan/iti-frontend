<template src="./department-edit.html"></template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import { DEPARTMENT_LIST } from '@/shared/types/department-list';
import { modalController } from '@ionic/vue';
import { StandardCodeData } from '@/shared/types/standard-code';
import { globalStatusCodeList } from '@/shared/common/common';
import Dropdown from 'primevue/dropdown';

export default defineComponent({
  name: "department-edit",
  components:{
    Dropdown
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
      statusCodeList: [] as StandardCodeData[],
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
    this.statusCodeList= globalStatusCodeList;
  },

  methods: {
    handleClose(){
      modalController.dismiss();
    }
  },
});
</script>

<style scoped>
@import url('./department-edit.scss');
</style>