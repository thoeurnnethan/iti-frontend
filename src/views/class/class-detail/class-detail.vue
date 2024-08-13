<template src="./class-detail.html"></template>

<script lang="ts">
import { modalController } from '@ionic/vue';
import { PropType, defineComponent } from 'vue';
import { CLASS_LIST } from '@/shared/types/class-list';
import { STUDENT_CLASS_LIST } from '@/shared/types/studentClass-list';

export default defineComponent({
  name: "class-detail",
  props: {
    subjectDetails: {
      type: Object as PropType<CLASS_LIST>,
      required: true
    },
    studentDetails: {
      type: Object as PropType<STUDENT_CLASS_LIST>,
      required: true
    }
  },

  data() {
    return {
      classInfo: {} as CLASS_LIST,
      studentInfo: [] as Array<any>,
    }
  },

  mounted() {
    this.classInfo = this.subjectDetails;
    // Map studentDetails to include fullName
    this.studentInfo = this.studentDetails.map((student: { firstName: any; lastName: any; }) => ({
      ...student,
      fullName: `${student.firstName} ${student.lastName}`
    }));
  },

  methods: {
    handleClose() {
      this.classInfo = {} as CLASS_LIST;
      this.studentInfo = [] as Array<any>;
      modalController.dismiss(); // Dismiss the modal
    },
  },
});
</script>

<style scoped>
@import url('./class-detail.scss');
</style>
