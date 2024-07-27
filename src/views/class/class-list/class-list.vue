<template src="./class-list.html"></template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { API_PATH } from '@/shared/common/api-path';
import { RequestService } from '@/shared/services/request-service';
import { CLASS_LIST, CLASS_LIST_REQ, CLASS_LIST_RES } from '@/shared/types/class-list';
import { ExportExcel } from '@/shared/services/export-excel-class';
import class_edit from '../class-edit/class-edit.vue';
import { YearList , SemesterList, globalStatusCodeList } from '@/shared/common/common';
import MyLoading from '../../MyLoading.vue';

const requestService = new RequestService();
const exportExcel = new ExportExcel();

export default defineComponent({
  name: "department-list",
  inheritAttrs: false,
  components: {
    MyLoading
  },
  data() {
    const dataTable = ref<CLASS_LIST[]>([]);
    return {
      yearList: YearList,
      semesterList: SemesterList,
      statusCodeList: globalStatusCodeList,
      classList: [] as CLASS_LIST[],
      classInfo: {} as CLASS_LIST,
      selectYear: '',
      selectedStatus: '',
      selectSemester: '',
      searchKeyword:'',
      selectTime:'',
      searchKey: '',
      Loading: false,
      totalCount: 0,
      pageSize: 10,
      pageNumber: 0,
      startingIndex: 1,
      dataTable,
      customNoClass: 'table_no',
      classInfoUpdate: {
        classID: '',
        departmentID: '',
        className: '',
        classDesc: '',
        year: '',
        generation: '',
        time: '',
        semester: 0,
        statusCode: '',
      } as CLASS_LIST
    }
  },

  mounted() {
    this.getClassList();
  },

  methods: {
    async getClassList() {
      this.Loading = true;
      const reqBody: CLASS_LIST_REQ = {
        departmentID: this.searchKey,
        pageSize: this.pageSize,
        pageNumber: this.pageNumber + 1,
        searchKeyword: this.searchKeyword,
        year: this.selectYear === 'All' ? '' : this.selectYear,
        semester: this.selectSemester === '' ? null : this.selectSemester
      }
      const response = (await requestService.request(API_PATH.CLASS_LIST, reqBody, false)) as CLASS_LIST_RES;
      this.classList = response.body?.classList.map((data , index) => {
        return {
          ...data,
          no: this.startingIndex + index
        }
      });
      this.totalCount = response.body?.totalCount;
      this.dataTable = response.body?.classList.map((data, index) => {
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

    async deleteClass(_item: CLASS_LIST) {
      this.$confirm.require({
        message: 'Do you want to hide this record?',
        header: 'Danger Zone',
        accept: async () => {
          console.table(_item);
          const reqBody = {
            classID: _item.classID,
            departmentID: _item.departmentID,
            statusCode: '09'
          }
          await requestService.request(API_PATH.CLASS_UPDATE, reqBody, false) as CLASS_LIST;
          this.getClassList();
          this.$toast.add({ summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
        },
        reject: () => {
          this.$toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
      });
    },

    async setActive(_item: CLASS_LIST) {
      console.table(_item);
      const reqBody = {
        classID: _item.classID,
        departmentID: _item.departmentID,
        statusCode: '01'
      }
      await requestService.request(API_PATH.CLASS_UPDATE, reqBody, false) as CLASS_LIST;
      this.getClassList();
    },

    // Handle page size page number
    onPage(event: { page: number; rows: number; }) {
      this.pageNumber = event.page;
      this.pageSize = event.rows;
      this.getClassList();
    },

    // Get Status text
    getStatusClass(statusCode: string): string {
      return statusCode === '01' ? 'active-text' : 'inactive-text';
    },

    // Insert class method
    async onClickInsert(){
      this.$popupService.onOpen({
        component: class_edit,
        dataProp:{
          classInfoData: this.classInfo,
          isInsert: true
        },
        callback: () => {
          this.getClassList();
        },
        onClose: () => {
          this.getClassList();
        }
      })
    },

    // Edit class method
    async onClickEdit(item: CLASS_LIST) {
      this.$popupService.onOpen({
        component: class_edit,
        dataProp: {
          classInfoData: item,
          isInsert: false
        },
        callback: () => {
          this.getClassList();
        },
        onClose: () => {
          this.getClassList();
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
@import url('./class-list.scss');
</style>