<template src="./schedule-list.html"></template>

<script lang="ts">
import { defineComponent } from 'vue';
import { API_PATH } from '@/shared/common/api-path';
import { RequestService } from '@/shared/services/request-service';
import { YearList , SemesterList, globalStatusCodeList, WeekdayList } from '@/shared/common/common';
import MyLoading from '../../MyLoading.vue';
import { SCHEDULE_LIST, SCHEDULE_LIST_REQ, SCHEDULE_LIST_RES, ScheduleColumn, ScheduleRow } from '@/shared/types/schedule-list';
import { DEPARTMENT_LIST, DEPARTMENT_LIST_REQ, DEPARTMENT_LIST_RES } from '@/shared/types/department-list';
import { CLASS_LIST, CLASS_LIST_REQ, CLASS_LIST_RES } from '@/shared/types/class-list';

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
      weekdayList: WeekdayList,
      departmentList: [] as DEPARTMENT_LIST[],
      classList: [] as CLASS_LIST[],
      scheduleList: [] as SCHEDULE_LIST[],
      scheduleInfo: {} as SCHEDULE_LIST,
      columns: [] as ScheduleColumn[],
      rows: [] as ScheduleRow[],
      scheduleYearList: this.generateYears(),
      scheduleHeader: {},
      filterInfo: {
        scheduleYear: new Date().getFullYear().toString(),
        classYear: '1',
        semester: '1',
        departmentID: '',
        classID: '',
        searchKey: ''
      } as SCHEDULE_LIST_REQ,
      pageSize: 10,
      pageNumber: 0,
    }
  },

  watch:{
    'filterInfo.departmentID'() {
      this.resetTable()
      this.filterInfo.classID = ''
      this.getClassList()
    }, 
    'filterInfo.classID'(){
      this.resetTable()
      if(this.isValidFilter){
        this.onGetScheduleListDynamicColumn()
      }
    }
  },

  computed:{
    isSelectedDepartment(): boolean{
      return this.filterInfo.departmentID !== '';
    },
    isValidFilter(): boolean{
      return this.filterInfo.classYear !== '' &&
      this.filterInfo.semester !== '' &&
      this.filterInfo.departmentID !== '' &&
      this.filterInfo.classID !== ''
    }
  },

  mounted() {
    // this.onGetScheduleListDynamicColumn();
    this.getDepartmentList()
    this.generateYears()
  },

  methods: {
    async onGetScheduleList() {
      const reqBody = {
        scheduleDay: "",
        departmentID: '',
        classID: "",
        classYear: "",
        semester: ""
      }
      const response = (await requestService.request(API_PATH.SCHEDULE_LIST, reqBody, false)) as SCHEDULE_LIST_RES;
      this.scheduleList = response.body?.scheduleList.map((data , index) => {
        return {
          ...data,
          no: index + 1 + (this.pageSize) * this.pageNumber
        }
      });
    },

    async onGetScheduleListDynamicColumn() {
      const reqBody = this.filterInfo
      const response = (await requestService.request(API_PATH.SCHEDULE_LIST, reqBody, false)) as SCHEDULE_LIST_RES;
      this.scheduleHeader = response.body
      this.columns = Object.keys(response.body.scheduleList[0]).map(day => ({
        field: day,
        header: day
      })) as ScheduleColumn[];
      this.rows = response.body.scheduleList
      // this.rows = response.body.scheduleList.map((item) =>{
      //   const nonEmptyDay = this.columns.find(col => item[col.field]?.startTime && item[col.field]?.endTime);
      //   const startTime   = nonEmptyDay ? `${item[nonEmptyDay.field]?.startTime}` : '';
      //   const endTime     = nonEmptyDay ? `${item[nonEmptyDay.field].endTime}` : '';
      //   return {
      //     ...item,
      //     startTime: startTime,
      //     endTime: endTime,
      //   }as ScheduleRow;
      // })
    },

    async getDepartmentList() {
      const reqBody: DEPARTMENT_LIST_REQ = {
        userID: "",
        searchKey: '',
        pageSize: 1000,
        pageNumber: 1
      }
      const response = (await requestService.request(API_PATH.DEPARTMENT_LIST, reqBody, false)) as DEPARTMENT_LIST_RES;
      this.departmentList = response.body?.departmentList;
    },

    async getClassList() {
      if(this.isSelectedDepartment){
        const reqBody: CLASS_LIST_REQ = {
          classID: '',
          departmentID: this.filterInfo.departmentID,
          searchKey: '',
          year: this.filterInfo.classYear,
          semester: this.filterInfo.semester,
          generation: '',
          pageSize: 1000,
          pageNumber: 1
        }
        const response = (await requestService.request(API_PATH.CLASS_LIST, reqBody, false)) as CLASS_LIST_RES;
        this.classList = response.body?.classList
      }
    },

    onClickClearFilter(){
      this.filterInfo= {
        scheduleYear: new Date().getFullYear().toString(),
        classYear: '1',
        semester: '1',
        departmentID: '',
        classID: '',
        searchKey: ''
      },
      this.resetTable
      this.classList = []
    },

    resetTable(){
      this.rows = []
      this.columns = []
    },

    convertTime(time:string){
      return this.$format.convertTo12HourFormat(time)
    },

    generateYears() {
      const currentYear = new Date().getFullYear();
      const startYear = 2020;
      const years = [];

      for (let year = currentYear; year >= startYear; year--) {
        years.push({ codeValue: year.toString(), codeValueDesc: year });
      }
      return years;
    }

  },
})
</script>

<style scoped>
  @import url('./schedule-list.scss');
</style>