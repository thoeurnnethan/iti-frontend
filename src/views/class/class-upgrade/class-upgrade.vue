<template src="./class-upgrade.html"></template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import { CLASS_LIST } from '@/shared/types/class-list';
import { API_PATH } from '@/shared/common/api-path';
import { RequestService } from '@/shared/services/request-service';
import { YearList, SemesterList } from '@/shared/common/common';
import { modalController } from '@ionic/vue';

const requestService = new RequestService();

export default defineComponent({
  name: 'class-upgrade',
  props: {
    classInfoData: {
      type: Object as PropType<CLASS_LIST>,
      required: true
    }
  },
  data() {
    return {
      classInfo: {} as CLASS_LIST,
      classInfoUpdate: {
        semester: '',
        year: '',
      } as CLASS_LIST,
      yearList: YearList,
      semesterList: SemesterList,
      newYearList: YearList,
      newSemesterList: SemesterList
    };
  },

  watch:{
    'classInfoUpdate.year'(){
      if(this.classInfoUpdate.semester > this.classInfo.semester){
        this.newSemesterList = SemesterList.filter(data => data.codeValue !== '')
      }
    }
  },

  computed: {
  },

  mounted() {
    this.onDataLoad();
  },
  methods: {
    onDataLoad() {
      this.classInfo = { ...this.classInfoData };
      this.classInfoUpdate = { ...this.classInfo };
    },

    async onClickUpdate() {
      const reqBody = {
        classID: this.classInfo.classID,
        oldYear: this.classInfo.year,
        oldSemester: this.classInfo.semester,
        newYear: this.classInfoUpdate.year,
        newSemester: this.classInfoUpdate.semester
      };

      const res = await requestService.request(API_PATH.CLASS_UPGRADE, reqBody, true) as CLASS_LIST;
      this.classInfo = res;
      if (res) {
        this.onClose()
      }
    },

    onClose() {
      modalController.dismiss();
    },
    
  }
});
</script>

<style scoped>
@import url('./class-upgrade.scss');
</style>