<template src="./studentClass-action.html"></template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { STUDENT_CLASS_LIST, SUBJECT_CLASS_LIST_REQ } from '@/shared/types/studentClass-list';
import { TEACHER_RES } from '@/shared/types/user-list';
import { CLASS_LIST, CLASS_LIST_RES } from '@/shared/types/class-list';
import { API_PATH } from '@/shared/common/api-path';
import { RequestService } from '@/shared/services/request-service';
import { globalStatusCodeList } from '@/shared/common/common';
import { modalController } from '@ionic/vue';

const requestService = new RequestService();

export default defineComponent({
  name: 'studentClass_action',
  props: {
    subjectInfoData: {
      type: Object as PropType<STUDENT_CLASS_LIST>,
      required: true
    },
    isInsert: {
      type: Boolean,
      required: true
    },
    isAdd: {
      type: Boolean,
      required: true
    },
  },
  data() {
    return {
      studentClassInfo: {
        classID: '',
        studentID: '',
      } as STUDENT_CLASS_LIST,
      subjectInfoUpdate: {} as STUDENT_CLASS_LIST,
      subjectList: [] as STUDENT_CLASS_LIST[],
      statusCodeList: globalStatusCodeList,
      searchKey: '',
      Loading: false,
      totalCount: 0,
      pageSize: 10,
      pageNumber: 0,
      classList: [] as CLASS_LIST[],
      studentList: [] as TEACHER_RES[],
      editingIndex: -1,
      fieldNameValidate: false,
      fieldDesValidate: false,
      editConfirmationVisible: false
    };
  },

  watch: {
    subjectInfoData: {
      handler(newValue: STUDENT_CLASS_LIST | STUDENT_CLASS_LIST[]) {
        if (Array.isArray(newValue)) {
          this.subjectList = newValue;
          if (newValue.length > 0) {
            this.subjectInfo = { ...newValue[0] };
            this.subjectInfoUpdate = { ...newValue[0] };
            this.toNull();
          } else {
            this.subjectInfo = {} as STUDENT_CLASS_LIST;
            this.subjectInfoUpdate = {} as STUDENT_CLASS_LIST;
          }
        } else {
          this.subjectInfo = { ...newValue };
          this.subjectInfoUpdate = { ...newValue };
        }
      },
      immediate: true,
      deep: true
    }
  },


  computed: {
    isValidInsert(): boolean {
      return (
        this.studentClassInfo.classID !== '' &&
        this.studentClassInfo.studentID !== '' &&
        this.studentClassInfo.statusCode !== ''
      );
    },
    isValidUpdate(): boolean {
      return (
        this.studentClassInfo.classID !== this.subjectInfoUpdate.classID ||
        this.studentClassInfo.studentID !== this.subjectInfoUpdate.studentID
      );
    },
    isEditing(): boolean {
      return this.editingIndex !== -1;
    },

  },
  
  mounted() {
    this.onDataLoad();
    this.onGetClassList();
    this.onGetStudentList();
  },

  methods: {
    onDataLoad() {
      if (!this.isInsert) {
        this.studentClassInfo = { ...this.subjectInfoData };
        this.subjectInfoUpdate = { ...this.studentClassInfo };
      }
    },

    async onGetClassList() {
      const reqBody = {
        classID: '',
        departmentID: '',
        searchKey: this.searchKey,
        year: '',
        semester: '',
        generation: '',
        pageSize: 1000,
        pageNumber: 1
      };
      const response = await requestService.request(API_PATH.CLASS_LIST, reqBody, false) as CLASS_LIST_RES;
      this.classList = response.body?.classList;
    },

    async onGetStudentList() {
      const reqBody = {
        searchKey: this.searchKey,
        roleID: '04',
        pageSize: 1000,
        pageNumber: 1
      };
      const response = await requestService.request(API_PATH.USER_LIST, reqBody, false) as TEACHER_RES;

      this.studentList = response.body?.userList;
    },

    async onAddDataTableList() {

      console.log(this.studentClassInfo.studentID);

      const reqBody = {
        searchKey: this.searchKey,
        roleID: '04',
        pageSize: 1000,
        pageNumber: 1
      };
      const response = await requestService.request(API_PATH.USER_LIST, reqBody, false) as TEACHER_RES;

      this.studentList = response.body?.userList;
      

      // const updatedSubject = { 
      //   no: 1,
      //   fullName: this.subjectInfo.seqNo+"",
      //   subjectName: this.subjectInfo.subjectName,
      //   subjectDesc: this.subjectInfo.subjectDesc,
      //   statusCode: '01',
      // };      

      // if (this.editingIndex === -1) {
      //   updatedSubject.no = this.subjectList.length + 1;
      //   updatedSubject.subjectID = this.subjectInfo.classInfoID+"_SUB"+(this.subjectList.length + 1),
      // console.table(updatedSubject);

      //   this.subjectList.push(updatedSubject);
      // } else {
      //   this.subjectList[this.editingIndex] = updatedSubject;
      //   this.editingIndex = -1;
      // }
      // this.updateSeqNo();
      // this.resetForm();
    },

    toNull(){
      this.studentClassInfo.subjectName = ''
      this.studentClassInfo.subjectDesc = ''
    },

    updateSeqNo() {
      this.subjectList.forEach((qual, index) => {
          qual.no = index + 1;
      });
    },

    async onClickEdit(data: STUDENT_CLASS_LIST) {
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
          this.editingIndex = this.subjectList.findIndex(item => item.subjectID === data.subjectID);
          this.editConfirmationVisible = false;
          this.$toast.add({ summary: 'Confirmed', detail: 'Record edit', life: 3000 });
        },
        reject: () => {
          this.editConfirmationVisible = false;
          this.$toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
      });
    },

    async onClickDelete(data: STUDENT_CLASS_LIST) {
      if (this.isEditing) {
        this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Please finish editing the current record first.', life: 3000 });
        return;
      }
      this.$confirm.require({
        message: 'Do you want to delete this record?',
        header: 'Confirmation',
        accept: async () => {
          if(this.isInsert==true && this.isAdd==false){
            this.subjectList = this.subjectList.filter(item => item.no !== data.no);
            
            this.$toast.add({ summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
            this.updateSeqNo();
          }
          if(this.isInsert==true && this.isAdd==true){
            const subjectInfo = this.subjectList.filter(item => item.subjectID == data.subjectID);
            
            const reqBody = {
              classID:  subjectInfo[0].classInfoID,
              subjectList:[{
                subjectID:  subjectInfo[0].subjectID,
                statusCode: '02'
              }]
            }
            const res = await requestService.request(API_PATH.SUBJECT_UPDATE, reqBody, false) as STUDENT_CLASS_LIST_RES;
            this.subjectList = res.body.subjectList;
            this.$toast.add({ summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
            console.log(res);
            
            this.updateSeqNo();
          }
        },
        reject: () => {
          this.$toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
      });
    },

    async registerSubjectInfo() {
      const reqBody = {
        classID: this.subjectInfo.classInfoID,
        subjectList: this.subjectList,
      };
      const response = await requestService.request(API_PATH.SUBJECT_REGISTER, reqBody, true);
      if(response.header.result){
        this.resetForm();
        this.onClose();
      }
    },

    async updateSubjectInfo() {
      const dataList = [{
        subjectID: this.subjectInfo.subjectID,
        subjectName: this.subjectInfo.subjectName,
        subjectDesc: this.subjectInfo.subjectDesc,
        statusCode: this.subjectInfo.statusCode,
      }];

      const reqBody = {
        classID: this.subjectInfo.classInfoID,
        subjectList: dataList,
      };

      await requestService.request(API_PATH.SUBJECT_UPDATE, reqBody, true);
      this.resetForm();
      this.onClose();
    },

    async addSubjectInfo() {

      const reqBody = {
        classID: this.subjectInfo.classInfoID,
        subjectList: this.subjectList,
      };

      await requestService.request(API_PATH.SUBJECT_UPDATE, reqBody, true);
      this.resetForm();
      this.onClose();
    },

    resetForm() {
      this.subjectInfo = {
        classInfoID: this.subjectInfo.classInfoID,
        subjectName: '',
        subjectDesc: ''
      };
      this.fieldNameValidate = false;
      this.fieldDesValidate = false;
    },
    
    onClose() {
      this.resetForm();
      modalController.dismiss();
    }

},

});
</script>
