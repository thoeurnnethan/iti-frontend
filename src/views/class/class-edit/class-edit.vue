<template src="./class-edit.html"></template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
// import { API_PATH } from '@/shared/common/api-path';
// import { RequestService } from '@/shared/services/request-service';
import { CLASS_LIST } from '@/shared/types/class-list';
import { modalController } from '@ionic/vue';

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
    };
  },

  mounted() {
    this.classInfoUpdate = {...this.classInfo}
  },
  
  methods:{
    onClose(){
      modalController.dismiss();
    }
  }

});
</script>

<style scoped>
@import url('./class-edit.scss');
</style>
