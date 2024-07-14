<template src="./class-list.html"></template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { API_PATH } from '@/shared/common/api-path';
import { RequestService } from '@/shared/services/request-service';
import { CLASS_LIST, CLASS_LIST_REQ } from '@/shared/types/class-list';
import { ExportExcel } from '@/shared/services/export-excel-class';
import { StandardCodeData } from '@/shared/types/standard-code';
import class_edit from '../class-edit/class-edit.vue';
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
      classList: [] as CLASS_LIST[],
      departmentInfo: {} as CLASS_LIST,
      searchKey: '',
      Loading: false,
      totalCount: 0,
      pageSize: 10,
      pageNumber: 0,
      startingIndex: 1,
      dataTable,
      classInfoUpdate: {
        classID:'',
        departmentID: '',
        className: '',
        classDesc: '',
        cyear: '',
        generation: '',
        ctime: '',
        semester: 0,
        statusCode: '',
      } as CLASS_LIST,
      statusCodeList: [
        { codeValue: '01', codeValueDesc: 'Active' },
        { codeValue: '02', codeValueDesc: 'Inactive' },
      ] as StandardCodeData[],
      selectedYear: null,
      year: [
        { name: 'Year 1', year: '1' },
        { name: 'Year 2', year: '2' },
        { name: 'Year 3', year: '3' },
        { name: 'Year 4', year: '4' },
        { name: 'Year 5', year: '5' },
        { name: 'Year 6', year: '6' }
      ],
      selectedTime: null,
      time: [
        { name: 'Monday 14:00-17:00' },
        { name: 'Tuesday 14:00-17:00' },
        { name: 'Wednesday 09:00-12:00' },
        { name: 'Thursday 09:00-12:00' },
        { name: 'Friday 09:00-12:00' },
        { name: 'Weekend' }
      ],
      selectedSemester: null,
      semester: [
        { name: '1' },
        { name: '2' },
      ]
    }
  },

  mounted() {
    // Call get department on mount
    this.getClassList();
  },

  methods: {
    // Get Department List
    async getClassList() {
      this.Loading = true;
      const reqBody: CLASS_LIST_REQ = {
        classID: "",
        departmentID: this.searchKey,
        pageSize: this.pageSize,
        pageNumber: this.pageNumber,
        body: {
          departmentList: undefined,
          classList: [],
          totalCount: 0
        }
      }
      const response = (await requestService.request(API_PATH.CLASS_LIST, reqBody, false)) as CLASS_LIST_REQ;
      this.totalCount = response.body?.totalCount;
      this.classList = response.body?.classList;
      this.dataTable = response.body?.classList.map((data, index) => {
        return {
          ...data,
          no: this.startingIndex + index,
        }
      });
      this.Loading = false;
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

    // Edit class method
    async onClickEdit(item: CLASS_LIST){
      console.log(item);
      
      this.$popupService.onOpen({
        component: class_edit,
        dataProp:{
          class: item,
        },
        callback: () => {
          this.getClassList();
        },
        onClose: () =>{
          this.getClassList();
        } 
      })
    },

    //download excel
    exportToExcel() {
      const excelData = this.dataTable.map((data, index) => {
        return {
          "No": index + 1,
          "Class ID": data.classID,
          "Department ID": data.departmentID,
          "Class Name": data.className,
          "Class Desc": data.classDesc,
          "Class Status": this.$codeConverter.codeToString(this.statusCodeList, data.statusCode)
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