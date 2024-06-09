<template src="./department-list.html"></template>

<script lang="ts">
import { defineComponent } from 'vue';
import { API_PATH } from '@/shared/common/api-path';
import { RequestService } from '@/shared/services/request-service';
import { DEPARTMENT_LIST, DEPARTMENT_LIST_REQ, DEPARTMENT_LIST_RES } from '@/shared/types/department-list';
import { StandardCodeData } from '@/shared/types/standard-code';
import department_update from '../department-update/department-update.vue';

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
      searchKey: '' as any,
      statusCodeList: [
        { codeValue: '01', codeValueDesc: 'Active' },
        { codeValue: '02', codeValueDesc: 'Inactive' },
      ] as StandardCodeData[],
      totalCount: 0,
      pageSize: 15,
      pageNumber: 1
    }
  },

  mounted() {
    this.getDepartmentList();
  },

  methods: {
    async getDepartmentList() {
      const reqBody: DEPARTMENT_LIST_REQ = {
        userID: "",
        departmentName: this.searchKey,
        pageSize: this.pageSize,
        pageNumber: this.pageNumber
      }
      const response = (await requestService.request(API_PATH.DEPARTMENT_LIST, reqBody)) as DEPARTMENT_LIST_RES;
      this.totalCount = response.body?.totalCount;
      this.departmentList = response.body?.departmentList;
    },

    getStatusClass(statusCode: string): string {
      return statusCode === '01' ? 'active-text' : 'inactive-text';
    },

    onClickRow(item: DEPARTMENT_LIST) {
      this.$popupService.onOpen({
        component: department_update,
        dataProp: {
          department: item
        }
      })
    },

    onClickRegister(){
      this.$router.push('/department-register')
    },

    onClickSearch(){
      this.getDepartmentList();
    }

  },
})
</script>

<style scoped>
@import url('./department-list.scss');
</style>