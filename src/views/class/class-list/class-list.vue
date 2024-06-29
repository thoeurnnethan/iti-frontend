<template src="./class-list.html"></template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { API_PATH } from '@/shared/common/api-path';
import { RequestService } from '@/shared/services/request-service';
import { CLASS_LIST, CLASS_LIST_REQ, CLASS_LIST_RES } from '@/shared/types/class-list';
import { ExportExcel } from '@/shared/services/export-excel-class';
import { StandardCodeData } from '@/shared/types/standard-code';

const requestService = new RequestService();
const exportExcel = new ExportExcel();

export default defineComponent({
  name: "department-list",
  inheritAttrs: false,
  components: {
    // 
  },
  data() {
    const dataTable = ref<CLASS_LIST[]>([]);
    return {
      classList: [] as CLASS_LIST[],
      departmentInfo: {} as CLASS_LIST,
      searchKey: '',
      totalCount: 0,
      pageSize: 10,
      pageNumber: 0,
      startingIndex: 1,
      dataTable,
      classInfoUpdate: {
        classID: '',
        departmentID: '',
        className: '',
        classDesc: '',
        statusCode: ''
      } as CLASS_LIST,
    }
  },

  mounted() {
    // Call get department on mount
    this.getClassList();
  },

  computed:{
    // Check is input form is valid to Save
    isValidForm(): boolean{
      return this.classInfoUpdate.classID !== '' &&
        this.classInfoUpdate.departmentID !== '' &&
        this.classInfoUpdate.className !== '' &&
        this.classInfoUpdate.classDesc !== '' &&
        this.classInfoUpdate.statusCode !== '';
    }
  },

  methods: {
    // Get Department List
    async getClassList() {
      const reqBody: CLASS_LIST_REQ = {
        classID: "",
        departmentID: this.searchKey,
        pageSize: this.pageSize,
        pageNumber: this.pageNumber,
      }
      const response = (await requestService.request(API_PATH.CLASS_LIST,reqBody,false)) as CLASS_LIST_RES;
      this.totalCount = response.body?.totalCount;
      this.classList = response.body?.classList;
      this.dataTable = response.body?.classList.map((data,index)=>{
            return {
                ...data,
                no: this.startingIndex + index, 
            }
      });
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

    //download excel
    exportToExcel(){
      const excelData = this.dataTable.map((data, index) => {
        return {
          "No": index + 1,
          "Class ID": data.classID,
          "Department ID": data.departmentID,
          "Class Name": data.className,
          "Class Desc": data.classDesc,
          "Class Status": this.$codeConverter.codeToString(this.statusCodeList,data.statusCode)
        };
      })
      const exportExcelData = [
        {
          data: excelData
        },
      ];
      exportExcel.exportSheet(exportExcelData, 'Class info')
    }
  },
})
</script>

<style scoped>
@import url('./class-list.scss');
</style>