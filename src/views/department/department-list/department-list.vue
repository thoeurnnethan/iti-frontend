<template src="./department-list.html"></template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { API_PATH } from '@/shared/common/api-path';
import { RequestService } from '@/shared/services/request-service';
import { DEPARTMENT_LIST, DEPARTMENT_LIST_REQ, DEPARTMENT_LIST_RES } from '@/shared/types/department-list';
import { StandardCodeData } from '@/shared/types/standard-code';
import department_detail from '../department-detail/department-detail.vue';
import department_edit from '../department-edit/department-edit.vue';
import { ExportExcel } from '@/shared/services/export-excel-class';
import MyLoading from '../../MyLoading.vue';

const requestService = new RequestService();
const exportExcel = new ExportExcel();

export default defineComponent({
  name: "department-list",
  components: {
    department_edit,
    MyLoading
  },
  data() {
    const dataTable = ref<DEPARTMENT_LIST[]>([]);
    return {
      departmentList: [] as DEPARTMENT_LIST[],
      departmentInfo: {} as DEPARTMENT_LIST,
      Loading: false,
      searchKey: '',
      totalCount: 0,
      pageSize: 10,
      pageNumber: 0,
      startingIndex: 1,
      dataTable,
      customNoClass: 'table_no',
      departmentInfoUpdate: {
        departmentID: '',
        departmentName: '',
        departmentDesc: '',
        statusCode: ''
      } as DEPARTMENT_LIST,
      statusCodeList: [
        { codeValue: '01', codeValueDesc: 'Active' },
        { codeValue: '09', codeValueDesc: 'Inactive' },
      ] as StandardCodeData[]
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
      this.Loading = true;
      const reqBody: DEPARTMENT_LIST_REQ = {
        userID: "",
        searchKey: this.searchKey,
        pageSize: this.pageSize,
        pageNumber: this.pageNumber + 1
      }
      const response = (await requestService.request(API_PATH.DEPARTMENT_LIST,reqBody,false)) as DEPARTMENT_LIST_RES;
      this.totalCount = response.body?.totalCount;
      this.departmentList = response.body?.departmentList.map((data,index) =>{
        return{
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
      this.pageSize = event.rows;
      this.pageNumber = event.page;
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

    async setInactive(_item: DEPARTMENT_LIST) {
      this.$confirm.require({
        message: 'Do you want to hide this record?',
        header: 'Confirmation !',
        accept: async () => {
          const reqBody = {
            departmentID: _item.departmentID,
            statusCode: '09'
          }
          await requestService.request(API_PATH.DEPARTMENT_UPDATE, reqBody, false) as DEPARTMENT_LIST;
          this.getDepartmentList();
          this.$toast.add({ summary: 'Confirmed', detail: 'The record has been set.', life: 3000 });
        },
        reject: () => {
          this.$toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
      });
    },

    async deleteAction(_item: DEPARTMENT_LIST) {
      this.$confirm.require({
        message: 'Do you want to delete this record?',
        header: 'Confirmation !',
        accept: async () => {
          const reqBody = {
            departmentID: _item.departmentID,
            statusCode: '02'
          }
          await requestService.request(API_PATH.DEPARTMENT_UPDATE, reqBody, false) as DEPARTMENT_LIST;
          this.getDepartmentList();
          this.$toast.add({ summary: 'Confirmed', detail: 'The record has been delete.', life: 3000 });
        },
        reject: () => {
          this.$toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
      });
    },

    async setActive(_item: DEPARTMENT_LIST) {
      this.$confirm.require({
        message: 'Do you want to set to Active ?',
        header: 'Confirmation !',
        accept: async () => {
          const reqBody = {
            departmentID: _item.departmentID,
            statusCode: '01'
          }
          await requestService.request(API_PATH.DEPARTMENT_UPDATE, reqBody, false) as DEPARTMENT_LIST;
          this.getDepartmentList();
          this.$toast.add({ summary: 'Confirmed', detail: 'The record has been set.', life: 3000 });
        },
        reject: () => {
          this.$toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
      });
    },

    // On click save
    async onClickAddNew(){
      this.$popupService.onOpen({
        component: department_edit,
        dataProp:{
          department: this.departmentInfo,
          isRegister: true
        },
        callback: () => {
          this.getDepartmentList();
        },
        onClose: () =>{
          this.getDepartmentList();
        } 
      })
    },

    async onClickEdit(item: DEPARTMENT_LIST){
      this.$popupService.onOpen({
        component: department_edit,
        dataProp:{
          department: item,
          isRegister: false
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
    async exportToExcel(){
      const reqBody = {
        userID: "",
        searchKey: this.searchKey
      }
      const response = (await requestService.request(API_PATH.DEPARTMENT_LIST_DOWNLOAD,reqBody,false)) as DEPARTMENT_LIST_RES;
      this.dataTable = response.body?.departmentList.map((data,index)=>{
        return {
            ...data,
            no: this.startingIndex + index, 
        }
      });
      const excelData = this.dataTable.map((data, index) => {
        return {
          "No": index + 1,
          "Department ID": data.departmentID,
          "Department Name": data.departmentName,
          "Department Description": data.departmentDesc,
          "Department Manager": data.firstName + '-' + data.lastName,
          "Status": this.$codeConverter.codeToString(this.statusCodeList,data.statusCode),
          "First Register Date": this.$format.formatDateTime(data.firstRegisterDate? data.firstRegisterDate : '', 'yyyy-mm-dd'),
          "Last Change Date": this.$format.formatDateTime(data.lastChangeDate ? data.lastChangeDate : '', 'yyyy-mm-dd') 
        };
      })
      const exportExcelData = [
        {
          data: excelData
        },
      ];
      exportExcel.exportSheet(exportExcelData, 'Department')
    },
  },
})
</script>

<style scoped>
@import url('./department-list.scss');
</style>