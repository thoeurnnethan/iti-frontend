<template src="./schedule-list.html"></template>

<script lang="ts">
import { defineComponent } from 'vue';
import { API_PATH } from '@/shared/common/api-path';
import { RequestService } from '@/shared/services/request-service';
import { YearList , SemesterList, globalStatusCodeList } from '@/shared/common/common';
import schedule_action from '../schedule-action/schedule-action.vue';
import MyLoading from '../../MyLoading.vue';
import { SCHEDULE_LIST, SCHEDULE_LIST_RES, ScheduleColumn, ScheduleRow } from '@/shared/types/schedule-list';

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
      columns: [] as ScheduleColumn[],
      rows: [] as ScheduleRow[],
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
    console.log(this.onGetScheduleListDynamicColumn());
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

    async onGetScheduleListDynamicColumn() {
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
      this.columns = Object.keys(response.body.scheduleList[0]).map(day => ({
        field: day,
        header: day
      })) as ScheduleColumn[];
      this.rows = response.body.scheduleList.map((item) =>{
        const nonEmptyDay = this.columns.find(col => item[col.field]?.startTime && item[col.field]?.endTime);
        const startTime   = nonEmptyDay ? `${item[nonEmptyDay.field]?.startTime}` : '';
        const endTime     = nonEmptyDay ? `${item[nonEmptyDay.field].endTime}` : '';
        return {
          ...item,
          startTime: startTime,
          endTime: endTime,
        }as ScheduleRow;
      })
    },

    // Insert Room
    async onClickInsert(){
      this.$popupService.onOpen({
        component: schedule_action,
        dataProp:{
          subjectInfoData: this.scheduleInfo,
          isInsert: true
        },
        callback: () => {
          this.onGetScheduleList();
        },
        onClose: () => {
          this.onGetScheduleList();
        }
      })
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