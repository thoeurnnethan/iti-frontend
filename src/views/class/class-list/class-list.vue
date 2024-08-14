<template src="./class-list.html"></template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { API_PATH } from '@/shared/common/api-path';
import { RequestService } from '@/shared/services/request-service';
import { CLASS_LIST, CLASS_LIST_REQ, CLASS_LIST_RES } from '@/shared/types/class-list';
import { ExportExcel } from '@/shared/services/export-excel-class';
import class_edit from '../class-edit/class-edit.vue';
import { YearList , SemesterList, globalStatusCodeList } from '@/shared/common/common';
import studentClass_action from '../../studentClass/studentClass-action/studentClass-action.vue';
import class_detail from '../class-detail/class-detail.vue';
import MyLoading from '../../MyLoading.vue';
import { DEPARTMENT_LIST, DEPARTMENT_LIST_REQ, DEPARTMENT_LIST_RES } from '@/shared/types/department-list';

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
      departmentList: [] as DEPARTMENT_LIST[],
      selectedDepartment: '',
      selectedYear: '',
      selectedStatus: '',
      selectSemester: '',
      searchKey:'',
      Loading: false,
      totalCount: 0,
      pageSize: 10,
      pageNumber: 0,
      dataTable,
      classInfoUpdate: {
        classID: '',
        departmentID: '',
        departmentName: '',
        className: '',
        classDesc: '',
        year: '',
        generation: '',
        semester: '',
        statusCode: '',
      } as CLASS_LIST
    }
  },

  mounted() {
    this.getClassList();
    this.getDepartmentList();
  },

  methods: {
    async getClassList() {
      this.Loading = true;
      const reqBody: CLASS_LIST_REQ = {
        classID: '',
        departmentID: this.selectedDepartment,
        searchKey: this.searchKey,
        year: this.selectedYear === 'All' ? '' : this.selectedYear,
        semester: this.selectSemester === 'All' ? '' : this.selectSemester,
        generation: '',
        pageSize: this.pageSize,
        pageNumber: this.pageNumber + 1
      }
      const response = (await requestService.request(API_PATH.CLASS_LIST, reqBody, false)) as CLASS_LIST_RES;
      this.classList = response.body?.classList.map((data , index) => {
        return {
          ...data,
          no: index + 1 + (this.pageSize) * this.pageNumber
        }
      });
      this.totalCount = response.body?.totalCount;
      this.Loading = false;
    },

    async getDepartmentList() {
      const reqBody: DEPARTMENT_LIST_REQ = {
        userID: "",
        searchKey: this.searchKey,
        pageSize: 1000,
        pageNumber: 1
      }
      const response = (await requestService.request(API_PATH.DEPARTMENT_LIST,reqBody,false)) as DEPARTMENT_LIST_RES;
      this.departmentList = response.body?.departmentList
    },

    rowClass(data: { statusCode: string; }) {
      return data.statusCode === '09' ? 'we_bg_row' : '';
    },

    async onClickRow() {
      const body_1 = {
        classID: this.classInfo?.classID,
        classYear: this.classInfo?.year,
        semester: this.classInfo?.semester,
      };
      const responseSubject = await requestService.request(API_PATH.SUBJECT_LIST, body_1, false);

      const body_2 = {
        classInfoID: this.classInfo?.classInfoID
      };
      const responseStudent = await requestService.request(API_PATH.STUDENT_CLASS_LIST, body_2, false);

      this.$popupService.onOpen({
          component: class_detail,
          dataProp: {
            subjectDetails: responseSubject.body.subjectList,
            studentDetails: responseStudent.body.studentList
          }
      })
    },

    onPage(event: { page: number; rows: number; }) {
      this.pageNumber = event.page;
      this.pageSize = event.rows;
      this.getClassList();
    },

    async onClickAction(item: CLASS_LIST, statusCode: string){
      let messageHeader       = ''
      let messageAcceptDetail = ''
      let messageRejectDetail = 'You have rejected'
      let btnAcceptClass      = 'btn '
      if(statusCode === '01'){
        messageHeader        = "Do you want to set to Active ?";
        messageAcceptDetail  = 'The record has been set.';
        btnAcceptClass      += 'btn-success'
      } else if(statusCode === '02'){
        messageHeader        = "Do you want to delete this record?";
        messageAcceptDetail  = 'The record has been deleted.';
        btnAcceptClass      += 'btn-danger'
      } else{
        messageHeader        = "Do you want to hide this record?";
        messageAcceptDetail  = 'The record has been set.';
        btnAcceptClass      += 'btn-warning'
      }
      this.$confirm.require({
        message: messageHeader,
        header: 'Please Confirm',
        acceptLabel: 'Yes',
        acceptClass: btnAcceptClass,
        rejectLabel: 'No',
        rejectClass: 'btn btn-secondary',
        accept: async () => {
          const reqBody = {
            ...item,
            cyear: item.year,
            statusCode: statusCode
          }
          const res = await requestService.request(API_PATH.CLASS_UPDATE, reqBody, true);
          if(res.header.result){
            this.getClassList();
            this.$toast.add({ summary: 'Confirmed', detail: messageAcceptDetail, life: 1000 });
          }
        },
        reject: () => {
          this.$toast.add({ severity: 'error', summary: 'Rejected', detail: messageRejectDetail, life: 1000 });
        }
      });
    },

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

    async onClickInsertStudent(){
      this.$popupService.onOpen({
        component: studentClass_action,
      })
    },

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

    async exportToExcel() {
      const reqBody: CLASS_LIST_REQ = {
        classID: '',
        departmentID: this.selectedDepartment,
        searchKey: this.searchKey,
        year: this.selectedYear === 'All' ? '' : this.selectedYear,
        semester: this.selectSemester === 'All' ? '' : this.selectSemester,
        generation: '',
      }
      const response = (await requestService.request(API_PATH.CLASS_LIST_DOWNLOAD, reqBody, false)) as CLASS_LIST_RES;
      this.dataTable = response.body?.classList.map((data, index) => {
        return {
          ...data,
          no: 1 + index,
        }
      });

      const excelData = this.dataTable.map((data, index) => {
        return {
          "No": index + 1,
          "Class ID": data.classID,
          "Class Name": data.className,
          "Class Description": data.classDesc,
          "Department Name": data.departmentName,
          "Year": data.year,
          "Semester": data.semester,
          "Generation": data.generation,
          "Department": data.departmentID + ': '+ data.departmentName,
          "Status": this.$codeConverter.codeToString(this.statusCodeList, data.statusCode),
          "First Register Date": this.$format.formatDateTime(data.firstRegisterDate ? data.firstRegisterDate : '', 'yyyy-mm-dd'),
          "Last Change Date": this.$format.formatDateTime(data.lastChangeDate ? data.lastChangeDate : '', 'yyyy-mm-dd')
        };
      })
      const exportExcelData = [
        {
          data: excelData
        },
      ];
      exportExcel.exportSheet(exportExcelData, 'Class info')
    },

  },
})
</script>

<style scoped>
@import url('./class-list.scss');
</style>