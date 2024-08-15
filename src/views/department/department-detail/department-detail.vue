<template src="./department-detail.html"></template>

<script lang="ts">
import { modalController } from '@ionic/vue';
import { PropType, defineComponent } from 'vue';
import { DEPARTMENT_LIST } from '@/shared/types/department-list';
import { TEACHER_DEPARTMENT_LIST } from '@/shared/types/teacherDepartment-list';
import { GenderCodeList , UserRoleList } from '@/shared/common/common';

export default defineComponent({
  name: "department-detail",
  props: {
    department: {
      type: Object as PropType<DEPARTMENT_LIST>,
      required: true
    },
    departmentMember: {
      type: Object as PropType<TEACHER_DEPARTMENT_LIST>,
      required: true
    }
  },

  data() {
    return {
      departmentInfo: {} as DEPARTMENT_LIST,
      departmentMemberInfo: {} as TEACHER_DEPARTMENT_LIST,
      GenderCodeList: GenderCodeList,
      UserRoleList: UserRoleList,
    }
  },

  mounted() {
    this.departmentInfo = this.department;
    this.departmentMemberInfo = this.departmentMember.map((member: { firstName: any; lastName: any, gender: any , roleID: any }, index: number) => ({
      ...member,
      fullName: `${member.firstName} ${member.lastName}`,
      no: index + 1,
      gender: this.$codeConverter.codeToString(this.GenderCodeList, member.gender),
      roleID: this.$codeConverter.codeToString(this.UserRoleList, member.roleID),
    }));

    console.table(this.departmentMemberInfo);
    

  },

  methods: {
    handleClose() {
      this.departmentInfo = {} as DEPARTMENT_LIST
      modalController.dismiss();
    },
  },

})
</script>

<style scoped>
@import url('./department-detail.scss');
</style>
