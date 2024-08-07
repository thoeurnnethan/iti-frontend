<template src="./schedule-list.html"></template>

<script lang="ts">
import { defineComponent } from 'vue';
import { API_PATH } from '@/shared/common/api-path';
import { RequestService } from '@/shared/services/request-service';
import { YearList , SemesterList, globalStatusCodeList } from '@/shared/common/common';
import MyLoading from '../../MyLoading.vue';
import { SCHEDULE_LIST, SCHEDULE_LIST_RES } from '@/shared/types/schedule-list';

const requestService = new RequestService();

export default defineComponent({
  name: "class-list",
  inheritAttrs: false,
  components: {
    MyLoading
  },
  data() {
    return {
      yearList: YearList,
      semesterList: SemesterList,
      statusCodeList: globalStatusCodeList,
      scheduleList: [] as SCHEDULE_LIST[],
      scheduleInfo: {} as SCHEDULE_LIST,
      selectTime:'',
      searchKey: '',
      Loading: false,
      totalCount: 0,
      pageSize: 10,
      pageNumber: 0,
      customNoRoom: 'table_no',
    }
  },

  mounted() {
    this.onGetScheduleList();
  },

  methods: {
    async onGetScheduleList() {
      this.Loading = true;
      const reqBody = {
        scheduleDay: "",
        departmentID: 'DEP1016',
        teacherID: "",
        subjectID: "",
        roomID: "",
        classID: "CLS1001",
        classYear: "1",
        semester: "1"
      }
      const response = (await requestService.request(API_PATH.SCHEDULE_LIST, reqBody, false)) as SCHEDULE_LIST_RES;
      this.scheduleList = response.body?.scheduleList.map((data , index) => {
        return {
          ...data,
          no: index + 1 + (this.pageSize) * this.pageNumber
        }
      });
      this.Loading = false;
    },
    
    rowClass(data: { statusCode: string; }) {
      return data.statusCode === '09' ? 'we_bg_row' : '';
    },

    // Handle page size page number
    onPage(event: { page: number; rows: number; }) {
      this.pageNumber = event.page;
      this.pageSize = event.rows;
      this.onGetScheduleList();
    },

    convertTime(time:string){
      return this.$format.convertTo12HourFormat(time)
    }

  },
})
</script>

<style scoped>
  /* @import url('./schedule-list.scss'); */
</style>