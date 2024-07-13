<template src="./class-edit.html"></template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { API_PATH } from '@/shared/common/api-path';
import { RequestService } from '@/shared/services/request-service';
import { CLASS_LIST, CLASS_LIST_RES } from '@/shared/types/class-list';

export default defineComponent({
  name: 'ClassEdit',
  data() {
    return {
      id: '', // ID parameter from route
      classInfoUpdate: {
        departmentID: '',
        className: '',
        classDesc: '',
        cyear: '',
        generation: '',
        ctime: '',
        semester: 0,
        statusCode: '',
      } as CLASS_LIST,
    }
  },

  computed: {
    isValidForm(): boolean {
      return this.classInfoUpdate.className !== '';
    }
  },

  mounted() {
    // Fetch class details when component is mounted
    this.fetchClassDetails();
  },

  methods: {
    async fetchClassDetails() {
      const response = await this.getClassDetails(this.id);
      if (response) {
        this.classInfoUpdate = { ...this.classInfoUpdate, ...response };
      }
    },

    async classEdit() {
      if (!this.isValidForm) {
        alert('Please fill out all required fields');
        return;
      }
      const reqBody: CLASS_LIST = this.classInfoUpdate;
      console.table(reqBody); // Log request body for debugging

      // Perform API request to update class
      const response = await new RequestService().request(API_PATH.CLASS_UPDATE, reqBody, true) as CLASS_LIST_RES;
      console.log(response); // Log response for debugging

      // Redirect to class list after successful update
      this.$router.push('/class-list');
    },

    // Example method to fetch class details based on ID
    async getClassDetails(id: string): Promise<CLASS_LIST | null> {
      try {
        const response = await new RequestService().request(`${API_PATH.CLASS}/${id}`, {}, true) as CLASS_LIST_RES;
        return response.data; // Assuming response structure has `data` property containing class details
      } catch (error) {
        console.error('Error fetching class details:', error);
        return null;
      }
    }
  }
});
</script>

<style scoped>
@import url('./class-edit.scss');
</style>
