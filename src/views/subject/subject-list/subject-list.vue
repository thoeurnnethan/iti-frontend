<template src="./subject-list.html"></template>

<script lang="ts">
import { defineComponent } from 'vue';
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
    return {
      yearList: YearList,
      semesterList: SemesterList,
      statusCodeList: globalStatusCodeList,
      subjectList: [] as SUBJECT_LIST[],
      subjectInfo: {} as SUBJECT_LIST,
      selectTime:'',
      searchKey: '',
      Loading: false,
      totalCount: 0,
      pageSize: 10,
      pageNumber: 0,
      startingIndex: 1,
      expandedRowGroups: null,
      selectClassId:''
    }
  },

  mounted() {
    this.getSubjectList();
  },

  methods: {
    
    async getSubjectList() {
      this.Loading = true;
      const reqBody: SUBJECT_LIST_REQ = {
        classID: this.selectClassId,
        pageSize: this.pageSize,
        pageNumber: this.pageNumber + 1,
        searchKey: this.searchKey,
      }
      const response = (await requestService.request(API_PATH.SUBJECT_LIST, reqBody, false)) as SUBJECT_LIST_RES;
      this.totalCount = response.body?.totalCount;
      this.subjectList = response.body?.subjectList.map((data , index) => {
        return {
          ...data,
          no: this.startingIndex + index
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
        header: 'Confirmation !',
        accept: async () => {
          const reqBody = {
            ..._item,
            subjectList:[{
              subjectID:  _item.subjectID,
              statusCode: '09'
            }]
          }
          await requestService.request(API_PATH.SUBJECT_UPDATE, reqBody, false);
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
        header: 'Confirmation !',
        accept: async () => {
          const reqBody = {
            ..._item,
            subjectList:[{
              subjectID:  _item.subjectID,
              statusCode: '01'
            }]
          }
          await requestService.request(API_PATH.SUBJECT_UPDATE, reqBody, false);
          this.getSubjectList();
          this.$toast.add({ summary: 'Confirmed', detail: 'The record has been set.', life: 3000 });
        },
        reject: () => {
          this.$toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
      });
    },

    async deleteAction(_item: SUBJECT_LIST) {
      this.$confirm.require({
        message: 'Do you want to delete this record ?',
        header: 'Confirmation !',
        accept: async () => {
          const reqBody = {
            ..._item,
            subjectList:[{
              subjectID:  _item.subjectID,
              statusCode: '02'
            }]
          }
          await requestService.request(API_PATH.SUBJECT_UPDATE, reqBody, false);
          this.getSubjectList();
          this.$toast.add({ summary: 'Confirmed', detail: 'Record has been delete', life: 3000 });
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
          subjectInfoData: item,
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

    // Download Excel
    exportToExcel() {
      const excelData = this.subjectList.map((data, index) => {
        return {
          "No": index + 1,
          "ID": data.classID,
          "Class Name": data.subjectName,
          "Generation": data.subjectDesc,
        };
      })
      const exportExcelData = [
        {
          data: excelData
        },
      ];
      exportExcel.exportSheet(exportExcelData, 'Class info')
    },

    // Calculate Total Subjects per Group
    calculateTotalSubjects(classID: string) {
      let total = 0;
      if (this.subjectList) {
        total = this.subjectList.filter(subject => subject.classID === classID).length;
      }
      return total;
    },
  },
})
</script>


<style scoped>
@import url('./subject-list.scss');
</style>