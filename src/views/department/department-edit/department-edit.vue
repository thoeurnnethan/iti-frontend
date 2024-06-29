<template src="./department-edit.html"></template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { RequestService } from '@/shared/services/request-service';
import { API_PATH } from '@/shared/common/api-path';
import { DEPARTMENT_LIST } from '@/shared/types/department-list';
import { StandardCodeData } from '@/shared/types/standard-code';
import { modalController } from '@ionic/vue';

const requestService = new RequestService();

export default defineComponent({
  name: "department-edit",
  data() {
    return {
      departmentInfoUpdate: {
        departmentID: '',
        departmentName: '',
        departmentDesc: '',
        statusCode: ''
      } as DEPARTMENT_LIST,
      statusCodeList: [
        { codeValue: '01', codeValueDesc: 'Active' },
        { codeValue: '02', codeValueDesc: 'Inactive' },
      ] as StandardCodeData[],
    };
  },
  computed: {
    isValidForm(): boolean {
      return (
        this.departmentInfoUpdate.departmentID !== '' &&
        this.departmentInfoUpdate.departmentName !== '' &&
        this.departmentInfoUpdate.departmentDesc !== '' &&
        this.departmentInfoUpdate.statusCode !== ''
      );
    },
  },
  async mounted() {
    await this.fetchDepartmentDetails();
  },
  methods: {
    async fetchDepartmentDetails() {
      try {
        const route = useRoute();
        const departmentID = route.params.id;
        const response = await requestService.request(API_PATH.DEPARTMENT_DETAIL + `/${departmentID}`, null, false);
        const departmentDetails: DEPARTMENT_LIST = response.body; // Adjust according to your API response structure
        this.departmentInfoUpdate.departmentID = departmentDetails.departmentID;
        this.departmentInfoUpdate.departmentName = departmentDetails.departmentName;
        this.departmentInfoUpdate.departmentDesc = departmentDetails.departmentDesc;
        this.departmentInfoUpdate.statusCode = departmentDetails.statusCode;
      } catch (error) {
        console.error('Error fetching department details:', error);
        // Handle error or show appropriate message
      }
    },
    async onClickSave() {
      try {
        // Perform save/update operation with departmentInfoUpdate
        const response = await requestService.request(API_PATH.DEPARTMENT_UPDATE, this.departmentInfoUpdate, true);
        console.log('Save response:', response);
        // Optionally, navigate back to the department list or perform other actions
      } catch (error) {
        console.error('Error saving department details:', error);
        // Handle error or show appropriate message
      }
    },

    handleClose(){
      modalController.dismiss();
    }
  },
});
</script>

<style scoped>
@import url('./department-edit.scss');
</style>