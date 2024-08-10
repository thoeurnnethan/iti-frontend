<template src="./schedule-action.html"></template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import { SCHEDULE_LIST } from '@/shared/types/schedule-list';
import { API_PATH } from '@/shared/common/api-path';
import { RequestService } from '@/shared/services/request-service';
import { globalStatusCodeList, YearList, SemesterList, generation, time } from '@/shared/common/common';
import { modalController } from '@ionic/vue';
import { day } from '@/shared/common/common';


const requestService = new RequestService();

export default defineComponent({
  name: 'schedule-action',
  props: {
    roomInfoData: {
      type: Object as PropType<SCHEDULE_LIST>,
      required: true
    },
    isInsert: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      schedule: {
        schDay:'',
        seqNo: 0,
        teacherID: '',
        subjectID:'',
        roomID: '',
        scheduleYear: '',
        floor: '',
        startTime: '',
        endTime: ''
      } as SCHEDULE_LIST,
      roomInfoUpdate: {} as SCHEDULE_LIST,
      selectedStatus: null,
      statusCodeList: globalStatusCodeList,
      year: YearList,
      day: day,
      semester: SemesterList,
      generation: generation,
      time: time
    };
  },
  computed: {
    isValidInsert(): boolean {
      return (
        this.roomInfo.roomName !== '' &&
        this.roomInfo.building !== '' &&
        this.roomInfo.floor !== 0 &&
        this.roomInfo.roomDesc !== '' &&
        this.roomInfo.statusCode !== ''
      );
    },
    isValidUpdate(): boolean {
      return (
        this.roomInfo.roomName !== this.roomInfoUpdate.roomName ||
        this.roomInfo.building !== this.roomInfoUpdate.building ||
        this.roomInfo.floor !== this.roomInfoUpdate.floor ||
        this.roomInfo.roomDesc !== this.roomInfoUpdate.roomDesc ||
        this.roomInfo.statusCode !== this.roomInfoUpdate.statusCode
      );
    }
  },
  mounted() {
    this.onDataLoad();
  },
  methods: {
    onDataLoad() {
      if (!this.isInsert) {
        this.roomInfo = { ...this.roomInfoData };
        this.roomInfoUpdate = { ...this.roomInfo };
      }
    },
    async roomInsert() {
      const reqBody = {
        ...this.roomInfo,
      };

      const res = await requestService.request(API_PATH.ROOM_REGISTER, reqBody, true) as SCHEDULE_LIST;

      this.roomInfo = res;
      if (res) {
        modalController.dismiss();
      }
    },
    async roomEdit() {
      const reqBody = {
        ...this.roomInfo,
      };

      const res = await requestService.request(API_PATH.ROOM_UPDATE, reqBody, true) as SCHEDULE_LIST;
      this.roomInfo = res;
      if (res) {
        modalController.dismiss();
      }
    },
    onClose() {
      modalController.dismiss();
    }
  }
});
</script>

<style scoped>
/* @import url('./schedule-action.scss'); */
</style>
