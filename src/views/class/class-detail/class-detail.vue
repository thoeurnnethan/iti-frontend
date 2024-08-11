<template src="./class-detail.html"></template>

<script lang="ts">
import { modalController } from '@ionic/vue';
import { PropType, defineComponent } from 'vue';
import { CLASS_LIST } from '@/shared/types/class-list';

export default defineComponent({
  name: "class-detail",
  props: {
    subjectDetails: {
      type: Object as PropType<CLASS_LIST>,
      required: true
    }
  },

  data() {
    return {
      classInfo: {} as CLASS_LIST,
    }
  },

  mounted() {
    this.classInfo = this.subjectDetails;
    
  },

  computed: {
    isSaveDisabled(): boolean {
      return Object.values(this.classInfo).some(value => !value);
    }
  },

  methods: {
    handleClose() {
      this.classInfo = {} as CLASS_LIST
      modalController.dismiss();
    },
  },

})
</script>

<style scoped>
@import url('./class-detail.scss');
</style>
