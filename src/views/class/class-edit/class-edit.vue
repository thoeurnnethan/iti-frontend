<template src="./class-edit.html"></template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import { CLASS_LIST } from '@/shared/types/class-list';
import { API_PATH } from '@/shared/common/api-path';
import { RequestService } from '@/shared/services/request-service';
import { globalStatusCodeList, YearList, SemesterList, generation, time } from '@/shared/common/common';
import { DEPARTMENT_LIST, DEPARTMENT_LIST_REQ, DEPARTMENT_LIST_RES } from '@/shared/types/department-list';
import { modalController } from '@ionic/vue';

const requestService = new RequestService();

export default defineComponent({
  name: 'class-edit',
  props: {
    classInfoData: {
      type: Object as PropType<CLASS_LIST>,
      required: true
    },
    isInsert: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      classInfo: {
        departmentID: '',
        className: '',
        classDesc: '',
        year: '',
        generation: '',
        time: '',
        semester: '',
        statusCode: '01',
      } as CLASS_LIST,
      classInfoUpdate: {} as CLASS_LIST,
      departmentList: [] as DEPARTMENT_LIST[],
      selectedStatus: null,
      statusCodeList: globalStatusCodeList,
      year: YearList,
      semester: SemesterList,
      generation: generation,
      time: time
    };
  },
  computed: {
    isValidInsert(): boolean {
      return (
        this.classInfo.className !== '' &&
        this.classInfo.departmentID !== '' &&
        this.classInfo.year !== '' &&
        this.classInfo.semester !== '' &&
        this.classInfo.generation !== '' &&
        this.classInfo.time !== '' &&
        this.classInfo.classDesc !== '' &&
        this.classInfo.statusCode !== ''
      );
    },
    isValidUpdate(): boolean {
      return (
        this.classInfo.className !== this.classInfoUpdate.className ||
        this.classInfo.departmentID !== this.classInfoUpdate.departmentID ||
        this.classInfo.year !== this.classInfoUpdate.year ||
        this.classInfo.semester !== this.classInfoUpdate.semester ||
        this.classInfo.generation !== this.classInfoUpdate.generation ||
        this.classInfo.time !== this.classInfoUpdate.time ||
        this.classInfo.classDesc !== this.classInfoUpdate.classDesc ||
        this.classInfo.statusCode !== this.classInfoUpdate.statusCode
      );
    }
  },
  mounted() {
    this.onDataLoad();
    this.getDepartmentList();
  },
  methods: {
    onDataLoad() {
      if (!this.isInsert) {
        this.classInfo = { ...this.classInfoData };
        this.classInfoUpdate = { ...this.classInfo };
      }
    },
    async classInsert() {
      const reqBody = {
        cyear: this.classInfo.year,
        ...this.classInfo,
      };

      const res = await requestService.request(API_PATH.CLASS_REGISTER, reqBody, true) as CLASS_LIST;
      this.classInfo = res;
      if (res) {
        modalController.dismiss();
      }
    },
    async classEdit() {
      const reqBody = {
        cyear: this.classInfo.year,
        ctime: this.classInfo.time,
        ...this.classInfo,
      };

      const res = await requestService.request(API_PATH.CLASS_UPDATE, reqBody, true) as CLASS_LIST;
      this.classInfo = res;
      if (res) {
        modalController.dismiss();
      }
    },
    onClose() {
      modalController.dismiss();
    },
    
    async getDepartmentList() {
            const reqBody: DEPARTMENT_LIST_REQ = {
                userID: "",
                searchKey: '',
                pageSize: 1000,
                pageNumber: 1
            }
            const response = (await requestService.request(API_PATH.DEPARTMENT_LIST,reqBody,false)) as DEPARTMENT_LIST_RES;
            this.departmentList = response.body?.departmentList;
        },
  }
});
</script>

<style scoped>
@import url('./class-edit.scss');
</style>