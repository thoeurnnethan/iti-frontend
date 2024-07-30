<template src="./room-list.html"></template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { API_PATH } from '@/shared/common/api-path';
import { RequestService } from '@/shared/services/request-service';
import { ROOM_LIST , ROOM_LIST_REQ , ROOM_LIST_RES } from '@/shared/types/room-list';
import room_action from '../room-action/room-action.vue';
import { ExportExcel } from '@/shared/services/export-excel-class';
import { YearList , SemesterList, globalStatusCodeList } from '@/shared/common/common';
import MyLoading from '../../MyLoading.vue';

const requestService = new RequestService();
const exportExcel = new ExportExcel();

export default defineComponent({
  name: "class-list",
  inheritAttrs: false,
  components: {
    MyLoading
  },
  data() {
    const dataTable = ref<ROOM_LIST[]>([]);
    return {
      yearList: YearList,
      semesterList: SemesterList,
      statusCodeList: globalStatusCodeList,
      roomList: [] as ROOM_LIST[],
      roomInfo: {} as ROOM_LIST,
      searchKeyword:'',
      selectTime:'',
      searchKey: '',
      Loading: false,
      totalCount: 0,
      pageSize: 10,
      pageNumber: 0,
      startingIndex: 1,
      dataTable,
      customNoRoom: 'table_no',
      
    }
  },

  mounted() {
    this.getRoomList();
  },

  methods: {
    async getRoomList() {
      this.Loading = true;
      const reqBody: ROOM_LIST_REQ = {
        roomID: this.searchKey,
        pageSize: this.pageSize,
        pageNumber: this.pageNumber + 1,
        searchKey: this.searchKeyword,
      }
      const response = (await requestService.request(API_PATH.ROOM_LIST, reqBody, false)) as ROOM_LIST_RES;
      this.roomList = response.body?.roomList.map((data , index) => {
        return {
          ...data,
          no: this.startingIndex + index
        }
      });
      this.totalCount = response.body?.totalCount;
      this.dataTable = response.body?.roomList.map((data, index) => {
        return {
          ...data,
          no: this.startingIndex + index,
        }
      });
      this.Loading = false;
    },

    rowClass(data: { statusCode: string; }) {
      return data.statusCode === '09' ? 'we_bg_row' : '';
    },

    async setRoom(_item: ROOM_LIST) {
      this.$confirm.require({
        message: 'Do you want to set to Inactive?',
        header: 'Confirmation !',
        accept: async () => {
          console.table(_item);
          const reqBody = {
            roomID: _item.roomID,
            statusCode: '09'
          }
          await requestService.request(API_PATH.ROOM_UPDATE, reqBody, false) as ROOM_LIST;
          this.getRoomList();
          this.$toast.add({ summary: 'Confirmed', detail: 'The record has been set.', life: 3000 });
        },
        reject: () => {
          this.$toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
      });
    },

    async setActive(_item: ROOM_LIST) {
      this.$confirm.require({
        message: 'Do you want to set to Active ?',
        header: 'Confirmation !',
        accept: async () => {
          console.table(_item);
          const reqBody = {
            roomID: _item.roomID,
            statusCode: '01'
          }
          await requestService.request(API_PATH.ROOM_UPDATE, reqBody, false) as ROOM_LIST;
          this.getRoomList();
          this.$toast.add({ summary: 'Confirmed', detail: 'The record has been set.', life: 3000 });
        },
        reject: () => {
          this.$toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
      });
    },

    async deleteRoom(_item: ROOM_LIST) {
      this.$confirm.require({
        message: 'Do you want to delete this record ?',
        header: 'Confirmation !',
        accept: async () => {
          console.table(_item);
          const reqBody = {
            roomID: _item.roomID,
            statusCode: '02'
          }
          await requestService.request(API_PATH.ROOM_UPDATE, reqBody, false) as ROOM_LIST;
          this.getRoomList();
          this.$toast.add({ summary: 'Confirmed', detail: 'Record has been delete.', life: 3000 });
        },
        reject: () => {
          this.$toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
      });
    },

    // Handle page size page number
    onPage(event: { page: number; rows: number; }) {
      this.pageNumber = event.page;
      this.pageSize = event.rows;
      this.getRoomList();
    },

    // Get Status text
    getStatusClass(statusCode: string): string {
      return statusCode === '01' ? 'active-text' : 'inactive-text';
    },

    // Insert Room
      async onClickInsert(){
      this.$popupService.onOpen({
        component: room_action,
        dataProp:{
          roomInfoData: this.roomInfo,
          isInsert: true
        },
        callback: () => {
          this.getRoomList();
        },
        onClose: () => {
          this.getRoomList();
        }
      })
    },

    // Edit class method
    async onClickEdit(item: ROOM_LIST) {
      this.$popupService.onOpen({
        component: room_action,
        dataProp: {
          roomInfoData: item,
          isInsert: false
        },
        callback: () => {
          this.getRoomList();
        },
        onClose: () => {
          this.getRoomList();
        }
      })
    },

    //download excel
    exportToExcel() {
      const excelData = this.dataTable.map((data, index) => {
        return {
          "No": index + 1,
          "ID": data.classID,
          "Class Name": data.className,
          "Year": data.year,
          "Generation": data.generation,
          "Time": data.time,
          "Semester": data.semester,
          "Status": this.$codeConverter.codeToString(this.statusCodeList, data.statusCode)
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
@import url('./room-list.scss');
</style>