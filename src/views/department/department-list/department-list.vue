<template src="./department-list.html"></template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { API_PATH } from '@/shared/common/api-path';
import { useRouter } from 'vue-router';
import { RequestService } from '@/shared/services/request-service';
import { DEPARTMENT_LIST, DEPARTMENT_LIST_REQ, DEPARTMENT_LIST_RES } from '@/shared/types/department-list';
import { StandardCodeData } from '@/shared/types/standard-code';
import department_detail from '../department-detail/department-detail.vue';
import department_edit from '../department-edit/department-edit.vue';
import { ExportExcel } from '@/shared/services/export-excel-class';

const requestService = new RequestService();
const exportExcel = new ExportExcel();

export default defineComponent({
  name: "department-list",
  components: {
    department_edit
  },
  data() {
    const dataTable = ref<DEPARTMENT_LIST[]>([]);
    return {
      departmentList: [] as DEPARTMENT_LIST[],
      departmentInfo: {} as DEPARTMENT_LIST,
      searchKey: '',
      totalCount: 0,
      pageSize: 10,
      pageNumber: 0,
      startingIndex: 1,
      dataTable,
      departmentInfoUpdate: {
        departmentID: '',
        departmentName: '',
        departmentDesc: '',
        statusCode: ''
      } as DEPARTMENT_LIST,
      statusCodeList: [
        { codeValue: '01', codeValueDesc: 'Active' },
        { codeValue: '02', codeValueDesc: 'Inactive' },
      ] as StandardCodeData[],
      router: useRouter(), // Add this line
    }
  },

  mounted() {
    // Call get department on mount
    this.getDepartmentList();
  },

  computed:{
    // Check is input form is valid to Save
    isValidForm(): boolean{
      return this.departmentInfoUpdate.departmentID !== '' &&
        this.departmentInfoUpdate.departmentName !== '' &&
        this.departmentInfoUpdate.departmentDesc !== '' &&
        this.departmentInfoUpdate.statusCode !== '';
    }
  },

  methods: {
    // Get Department List
    async getDepartmentList() {
      const reqBody: DEPARTMENT_LIST_REQ = {
        userID: "",
        searchKey: this.searchKey,
        pageSize: this.pageSize,
        pageNumber: this.pageNumber + 1
      }
      const response = (await requestService.request(API_PATH.DEPARTMENT_LIST,reqBody,false)) as DEPARTMENT_LIST_RES;
      this.totalCount = response.body?.totalCount;
      this.departmentList = response.body?.departmentList;
      this.dataTable = response.body?.departmentList.map((data,index)=>{
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
      this.getDepartmentList();
    },

    // Get Status text
    getStatusClass(statusCode: string): string {
      return statusCode === '01' ? 'active-text' : 'inactive-text';
    },

    // On click any row
    async onClickRow(item: DEPARTMENT_LIST) {
      this.$popupService.onOpen({
        component: department_detail,
        dataProp: {
          department: item
        }
      })
    },

    // On click save
    async onClickAddNew(){
      this.$popupService.onOpen({
        component: department_edit
      })
    },

    async onClickEdit(item: DEPARTMENT_LIST){
      this.$popupService.onOpen({
        component: department_edit,
        dataProp:{
          department: item
        },
        callback: () => {
          this.getDepartmentList();
        },
        onClose: () =>{
          this.getDepartmentList();
        } 
      })
    },

    //downlaod excel
    exportToExcel(){
      const excelData = this.dataTable.map((data, index) => {
        return {
          "No": index + 1,
          "Department ID": data.departmentID,
          "Department Name": data.departmentName,
          "Department Desc": data.departmentDesc,
          "Department Status": this.$codeConverter.codeToString(this.statusCodeList,data.statusCode)
        };
      })
      const exportExcelData = [
        {
          data: excelData
        },
      ];
      exportExcel.exportSheet(exportExcelData, 'Department info')
    },
  },
})
</script>

<style scoped>
@import url('./department-list.scss');
</style>