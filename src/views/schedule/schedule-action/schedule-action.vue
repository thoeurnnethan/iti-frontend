<template src="./schedule-action.html"></template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import { ROOM_LIST } from '@/shared/types/room-list';
import { API_PATH } from '@/shared/common/api-path';
import { RequestService } from '@/shared/services/request-service';
import { globalStatusCodeList, YearList, SemesterList, generation, time } from '@/shared/common/common';
import { modalController } from '@ionic/vue';

const requestService = new RequestService();

export default defineComponent({
  name: 'schedule-action',
  props: {
    roomInfoData: {
      type: Object as PropType<ROOM_LIST>,
      required: true
    },
    isInsert: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      roomInfo: {
        roomID: '',
        roomName: '',
        roomDesc: '',
        building: '',
        floor: 0,
        statusCode: '',
      } as ROOM_LIST,
      roomInfoUpdate: {} as ROOM_LIST,
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

      const res = await requestService.request(API_PATH.ROOM_REGISTER, reqBody, true) as ROOM_LIST;

      this.roomInfo = res;
      if (res) {
        modalController.dismiss();
      }
    },
    async roomEdit() {
      const reqBody = {
        ...this.roomInfo,
      };

      const res = await requestService.request(API_PATH.ROOM_UPDATE, reqBody, true) as ROOM_LIST;
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
