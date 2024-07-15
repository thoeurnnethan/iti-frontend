<template src="./class-edit.html"></template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
// import { API_PATH } from '@/shared/common/api-path';
// import { RequestService } from '@/shared/services/request-service';
import { CLASS_LIST } from '@/shared/types/class-list';
import { API_PATH } from '@/shared/common/api-path';
import { RequestService } from '@/shared/services/request-service';
import { globalStatusCodeList , year , semester , generation , time } from '@/shared/common/common';
import { modalController } from '@ionic/vue';

const requestService = new RequestService();

export default defineComponent({
  name: "class-edit",
  components:{
  },

  props: {
    classInfo: {
      type: Object as PropType<CLASS_LIST>,
      required: true
    }
  },

  data() {
    return {
      classInfoUpdate: {} as CLASS_LIST,
      departmentInfoUpdate: {} as CLASS_LIST,
      selectedStatus: null,
      statusCodeList: globalStatusCodeList,
      year: year,
      semester:semester,
      generation:generation,
      time:time
    };
  },

  mounted() {
    this.classInfoUpdate = {...this.classInfo}
  },
  
  methods:{

    async classEdit(){
      const reqBody = {
        cyear: this.classInfoUpdate.year,
        ctime: this.classInfoUpdate.time,
        ...this.classInfoUpdate,
      }

      const res = await requestService.request(API_PATH.CLASS_UPDATE, reqBody, true) as CLASS_LIST;
      this.classInfoUpdate = res;
      if(res){
        modalController.dismiss();
      }
    },

    semesterChangeType() {
      this.classInfoUpdate.semester = Number(this.classInfoUpdate.semester);
    },

    onClose(){
      modalController.dismiss();
    }
  }

});
</script>

<style scoped>
@import url('./class-edit.scss');
</style>
