<template src="./department-list.html"></template>

<script lang="ts">
import { defineComponent } from 'vue';
import { API_PATH } from '@/shared/common/api-path';
import { RequestService } from '@/shared/services/request-service';
import { DEPARTMENT_LIST, DEPARTMENT_LIST_REQ, DEPARTMENT_LIST_RES } from '@/shared/types/department-list';
import { StandardCodeData } from '@/shared/types/standard-code';
import department_detail from '../department-detail/department-detail.vue';

const requestService = new RequestService();

export default defineComponent({
  name: "department-list",
  inheritAttrs: false,
  components: {
    // 
  },
  data() {
    return {
      departmentList: [] as DEPARTMENT_LIST[],
      departmentInfo: {} as DEPARTMENT_LIST,
      departmentInfoUpdate: {
        departmentID: '',
        departmentName: '',
        departmentDesc: '',
        statusCode: ''
      } as DEPARTMENT_LIST,
      searchKey: '' as string,
      statusCodeList: [
        { codeValue: '01', codeValueDesc: 'Active' },
        { codeValue: '02', codeValueDesc: 'Inactive' },
      ] as StandardCodeData[],
      totalCount: 0,
      pageSize: 10,
      pageNumber: 0
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
        departmentName: this.searchKey,
        pageSize: this.pageSize,
        pageNumber: this.pageNumber + 1
      }
      const response = (await requestService.request(API_PATH.DEPARTMENT_LIST,reqBody,false)) as DEPARTMENT_LIST_RES;
      this.totalCount = response.body?.totalCount;
      this.departmentList = response.body?.departmentList;
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
    onClickRow(item: DEPARTMENT_LIST) {
      this.$popupService.onOpen({
        component: department_detail,
        dataProp: {
          department: item
        }
      })
    },

    // On click save
    async onClickSave(item: DEPARTMENT_LIST){
      const reqBody: DEPARTMENT_LIST = item;
      const response = (await requestService.request(API_PATH.DEPARTMENT_REGISTER,reqBody,true)) as DEPARTMENT_LIST_RES;
      console.log(response)
    },
  },
})
</script>

<style scoped>
@import url('./department-list.scss');
</style>