<template src="./subject-action.html"></template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { SUBJECT_LIST, CLASS_LIST } from '@/shared/types/subject-list';
import { API_PATH } from '@/shared/common/api-path';
import { RequestService } from '@/shared/services/request-service';
import { globalStatusCodeList, YearList, SemesterList, generation, time } from '@/shared/common/common';
import { modalController } from '@ionic/vue';

const requestService = new RequestService();

export default defineComponent({
  name: 'subject-action',
  props: {
    subjectInfoData: {
      type: Object as PropType<SUBJECT_LIST>,
      required: true
    },
    isInsert: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      subjectInfo: {
        classID: '',
        subjectName: '',
        subjectDesc: '',
        statusCode: '',
      } as SUBJECT_LIST,
      subjectInfoUpdate: {} as SUBJECT_LIST,
      subjectList: [] as SUBJECT_LIST[],
      selectedStatus: null,
      statusCodeList: globalStatusCodeList,
      searchKeyword: '',
      selectTime: '',
      searchKey: '',
      Loading: false,
      totalCount: 0,
      pageSize: 10,
      pageNumber: 0,
      startingIndex: 1,
      classList: [] as CLASS_LIST[],
      editingIndex: -1,
    };
  },
  computed: {
    isValidInsert(): boolean {
      return (
        this.subjectInfo.subjectName !== '' &&
        this.subjectInfo.subjectDesc !== '' &&
        this.subjectInfo.statusCode !== ''
      );
    },
    isValidUpdate(): boolean {
      return (
        this.subjectInfo.subjectName !== this.subjectInfoUpdate.subjectName ||
        this.subjectInfo.subjectDesc !== this.subjectInfoUpdate.subjectDesc ||
        this.subjectInfo.statusCode !== this.subjectInfoUpdate.statusCode
      );
    }
  },
  mounted() {
    this.onDataLoad();
    this.classListLoad();
  },
  methods: {

    onDataLoad() {
      if (!this.isInsert) {
        this.subjectInfo = { ...this.subjectInfoData };
        this.subjectInfoUpdate = { ...this.subjectInfo };
      }
    },

    async classListLoad() {
      const reqBody = {
        classID: this.searchKey,
        pageSize: this.pageSize,
        pageNumber: this.pageNumber + 1,
        searchKeyword: this.searchKeyword,
        departmentID: '',
        year: ''
      }
      const response = await requestService.request(API_PATH.CLASS_LIST, reqBody, false);
      this.classList = response.body?.classList;
    },
    
    saveSubject() {
      const updatedSubject = {
        ...this.subjectInfo,
      };

      if (this.editingIndex === -1) {
        updatedSubject.no = this.subjectList.length + 1;
        this.subjectList.push(updatedSubject);
      } else {
        this.subjectList[this.editingIndex] = updatedSubject;
        this.editingIndex = -1;
      }

      this.resetForm();
    },
    resetForm() {
      this.subjectInfo = {
        subjectName: '',
        subjectDesc: '',
      };
    },
    
    onClickEditAcademic(data) {
      this.editingIndex = this.subjectList.findIndex(item => item.no === data.no);
      this.subjectInfo = { ...data };
    },
    onClickDeleteAcademic(data) {
      this.subjectList = this.subjectList.filter(item => item.no !== data.no);
    },
    
    async subjectInsert() {
      const reqBody = {
        ...this.subjectInfo,
      };

      const res = await requestService.request(API_PATH.SUBJECT_REGISTER, reqBody, true);
      if (res) {
        modalController.dismiss();
      }
    },
    async subjectEdit() {
      const reqBody = {
        ...this.subjectInfo,
      };

      const res = await requestService.request(API_PATH.SUBJECT_UPDATE, reqBody, true);
      if (res) {
        modalController.dismiss();
      }
    },
    semesterChangeType() {
      this.subjectInfo.semester = Number(this.subjectInfo.semester);
    },
    onClose() {
      modalController.dismiss();
    }
  }
});
</script>

<style scoped>
@import url('./subject-action.scss');
</style>
