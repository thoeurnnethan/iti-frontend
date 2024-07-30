<template src="./subject-action.html"></template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { SUBJECT_LIST } from '@/shared/types/subject-list';
import { CLASS_LIST } from '@/shared/types/class-list';
import { API_PATH } from '@/shared/common/api-path';
import { RequestService } from '@/shared/services/request-service';
import { globalStatusCodeList } from '@/shared/common/common';
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
      fieldNameValidate: false,
      fieldDesValidate: false,
      editConfirmationVisible: false
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
    },
    isEditing(): boolean {
      return this.editingIndex !== -1;
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
      console.table(this.subjectInfo);
      
    },
    async classListLoad() {
      const reqBody = {
        classID: this.searchKey,
        pageSize: this.pageSize,
        pageNumber: this.pageNumber + 1,
        searchKeyword: this.searchKeyword,
        departmentID: '',
        year: ''
      };
      const response = await requestService.request(API_PATH.CLASS_LIST, reqBody, false);
      this.classList = response.body?.classList;
    },
    saveSubject() {
      // Validate fields
      this.fieldNameValidate = this.subjectInfo.subjectName === '';
      this.fieldDesValidate = this.subjectInfo.subjectDesc === '';

      if (this.fieldNameValidate || this.fieldDesValidate) {
        return;
      }

      const updatedSubject = { ...this.subjectInfo };

      if (this.editingIndex === -1) {
        updatedSubject.seqNo = this.subjectList.length + 1;
        this.subjectList.push(updatedSubject);
      } else {
        this.subjectList[this.editingIndex] = updatedSubject;
        this.editingIndex = -1;
      }

      this.resetForm();
    },
    resetForm() {
      this.subjectInfo = {
        classID: this.subjectInfo.classID,  // Retain the current classID
        subjectName: '',
        subjectDesc: '',
        statusCode: '01'
      };
      this.fieldNameValidate = false;
      this.fieldDesValidate = false;
    },


    async onClickEdit(data: SUBJECT_LIST) {
      if (this.isEditing || this.editConfirmationVisible) {
        this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Please finish editing the current record first.', life: 3000 });
        return;
      }
      this.editConfirmationVisible = true;
      this.$confirm.require({
        message: 'Do you want to edit this record?',
        header: 'Confirmation',
        accept: () => {
          this.subjectInfo = { ...data };
          this.editingIndex = this.subjectList.findIndex(item => item.seqNo === data.seqNo);
          this.editConfirmationVisible = false;
          this.$toast.add({ summary: 'Confirmed', detail: 'Record edit', life: 3000 });
        },
        reject: () => {
          this.editConfirmationVisible = false;
          this.$toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
      });
    },

    async onClickDelete(data: SUBJECT_LIST) {
      if (this.isEditing) {
        this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Please finish editing the current record first.', life: 3000 });
        return;
      }
      this.$confirm.require({
        message: 'Do you want to delete this record?',
        header: 'Confirmation',
        accept: () => {
          this.subjectList = this.subjectList.filter(item => item.seqNo !== data.seqNo);
          this.$toast.add({ summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
        },
        reject: () => {
          this.$toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
      });
    },

    async subjectInsert() {
      const dataList = this.subjectList.map((data) => ({
        subjectName: data.subjectName,
        subjectDesc: data.subjectDesc,
      }));

      const reqBody = {
        classID: this.subjectInfo.classID,
        subjectList: dataList,
      };

      console.log(reqBody);

      await requestService.request(API_PATH.SUBJECT_REGISTER, reqBody, true);
      this.resetForm();
      this.onClose();
    },

    async subjectEdit() {
      if (!this.isValidUpdate) return;
      const response = await requestService.request(API_PATH.SUBJECT_UPDATE, this.subjectInfo, true);
      if (response.status === 200) {
        this.$toast.add({ severity: 'success', summary: 'Success', detail: 'Subject updated successfully' });
        this.onClose();
      }
    },
    onClose() {
      this.resetForm();
      modalController.dismiss();
    }
  },
  watch: {
    subjectInfoData(newValue: SUBJECT_LIST) {
      this.subjectInfo = { ...newValue };
      this.subjectInfoUpdate = { ...newValue };
    }
  }
});
</script>
