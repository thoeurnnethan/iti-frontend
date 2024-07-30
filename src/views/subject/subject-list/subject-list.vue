<template src="./subject-list.html"></template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { API_PATH } from '@/shared/common/api-path';
import { RequestService } from '@/shared/services/request-service';
import { SUBJECT_LIST , SUBJECT_LIST_REQ , SUBJECT_LIST_RES } from '@/shared/types/subject-list';
import subject_action from '../subject-action/subject-action.vue';
import { ExportExcel } from '@/shared/services/export-excel-class';
import { YearList , SemesterList, globalStatusCodeList } from '@/shared/common/common';
import MyLoading from '../../MyLoading.vue';

const requestService = new RequestService();
const exportExcel = new ExportExcel();

export default defineComponent({
  name: "class-list",
  inheritAttrs: false,
  components: {
    MyLoading
  },
  data() {
    const dataTable = ref<SUBJECT_LIST[]>([]);
    return {
      yearList: YearList,
      semesterList: SemesterList,
      statusCodeList: globalStatusCodeList,
      subjectList: [] as SUBJECT_LIST[],
      subjectInfo: {} as SUBJECT_LIST,
      searchKeyword:'',
      selectTime:'',
      searchKey: '',
      Loading: false,
      totalCount: 0,
      pageSize: 10,
      pageNumber: 0,
      startingIndex: 1,
      dataTable,
      customNoRoom: 'table_no',
      
    }
  },

  mounted() {
    this.getSubjectList();
  },

  methods: {
    
    async getSubjectList() {
      this.Loading = true;
      const reqBody: SUBJECT_LIST_REQ = {
        classID: this.searchKey,
        pageSize: this.pageSize,
        pageNumber: this.pageNumber + 1,
        searchKey: this.searchKeyword,
        userID: ''
      }
      const response = (await requestService.request(API_PATH.SUBJECT_LIST, reqBody, false)) as SUBJECT_LIST_RES;
      this.subjectList = response.body?.subjectList.map((data , index) => {
        return {
          ...data,
          no: this.startingIndex + index
        }
      });
      this.totalCount = response.body?.totalCount;
      this.dataTable = response.body?.roomList.map((data, index) => {
        return {
          ...data,
          no: this.startingIndex + index,
        }
      });
      this.Loading = false;
    },

    rowClass(data: { statusCode: string; }) {
      return data.statusCode === '09' ? 'we_bg_row' : '';
    },

    async setInactive(_item: SUBJECT_LIST) {
      this.$confirm.require({
        message: 'Do you want to set to Inactive?',
        header: 'Warning !!!',
        accept: async () => {
          console.table(_item);
          const reqBody = {
            roomID: _item.roomID,
            statusCode: '09'
          }
          await requestService.request(API_PATH.ROOM_UPDATE, reqBody, false) as SUBJECT_LIST;
          this.getSubjectList();
          this.$toast.add({ summary: 'Confirmed', detail: 'The record has been set.', life: 3000 });
        },
        reject: () => {
          this.$toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
      });
    },

    async setActive(_item: SUBJECT_LIST) {
      this.$confirm.require({
        message: 'Do you want to set to Active ?',
        header: 'Warning !!!',
        accept: async () => {
          console.table(_item);
          const reqBody = {
            roomID: _item.roomID,
            statusCode: '01'
          }
          await requestService.request(API_PATH.ROOM_UPDATE, reqBody, false) as SUBJECT_LIST;
          this.getRoomList();
          this.$toast.add({ summary: 'Confirmed', detail: 'The record has been set.', life: 3000 });
        },
        reject: () => {
          this.$toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
      });
    },

    async deleteRoom(_item: SUBJECT_LIST) {
      this.$confirm.require({
        message: 'Do you want to delete this record ?',
        header: 'Warning !!!',
        accept: async () => {
          console.table(_item);
          const reqBody = {
            roomID: _item.roomID,
            statusCode: '02'
          }
          await requestService.request(API_PATH.ROOM_UPDATE, reqBody, false) as SUBJECT_LIST;
          this.getRoomList();
          this.$toast.add({ summary: 'Confirmed', detail: 'Record has Set to Active', life: 3000 });
        },
        reject: () => {
          this.$toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
      });
    },

    // Handle page size page number
    onPage(event: { page: number; rows: number; }) {
      this.pageNumber = event.page;
      this.pageSize = event.rows;
      this.getSubjectList();
    },

    // Get Status text
    getStatusClass(statusCode: string): string {
      return statusCode === '01' ? 'active-text' : 'inactive-text';
    },

    // Insert Room
      async onClickInsert(){
      this.$popupService.onOpen({
        component: subject_action,
        dataProp:{
          subjectInfoData: this.subjectInfo,
          isInsert: true
        },
        callback: () => {
          this.getSubjectList();
        },
        onClose: () => {
          this.getSubjectList();
        }
      })
    },

    // Edit class method
    async onClickEdit(item: SUBJECT_LIST) {
      this.$popupService.onOpen({
        component: subject_action,
        dataProp: {
          roomInfoData: item,
          isInsert: false
        },
        callback: () => {
          this.getSubjectList();
        },
        onClose: () => {
          this.getSubjectList();
        }
      })
    },

    //download excel
    exportToExcel() {
      const excelData = this.dataTable.map((data, index) => {
        return {
          "No": index + 1,
          "ID": data.classID,
          "Class Name": data.className,
          "Year": data.year,
          "Generation": data.generation,
          "Time": data.time,
          "Semester": data.semester,
          "Status": this.$codeConverter.codeToString(this.statusCodeList, data.statusCode)
        };
      })
      const exportExcelData = [
        {
          data: excelData
        },
      ];
      exportExcel.exportSheet(exportExcelData, 'Class info')
    },

    //detailsClass
    detailsClass(_data: { id: any; }) {
      this.$router.push('/score-list');
    },

  },
})
</script>

<style scoped>
@import url('./subject-list.scss');
</style>