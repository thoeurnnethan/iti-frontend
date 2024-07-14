<template src="./class-edit.html"></template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import { API_PATH } from '@/shared/common/api-path';
import { RequestService } from '@/shared/services/request-service';
import { CLASS_LIST, CLASS_LIST_RES } from '@/shared/types/class-list';
import { ManagerList, ManagerList_Req, ManagerList_Res } from '@/shared/types/user-list';

export default defineComponent({
  name: "class-edit",
  components:{
  },

  props: {
    class: {
      type: Object as PropType<CLASS_LIST>,
      required: true
    }
  },

  data() {
    return {
      classInfoUpdate: {} as CLASS_LIST,
      teacherFullName: '' as string,
      departmentInfoUpdate: {} as CLASS_LIST,
    };
  },

  mounted() {
    console.table(this.class);
    
    this.classInfoUpdate = {...this.class}
  },








});
</script>

<style scoped>
@import url('./class-edit.scss');
</style>
