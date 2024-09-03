<template src="./change-password.html"></template>

<script lang="ts">
import { UserInfo, userLoginRes } from '@/shared/types/user-type';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { defineComponent } from 'vue';
import { RequestService } from '@/shared/services/request-service';
import { API_PATH } from '@/shared/common/api-path';

const requestService = new RequestService();

export default defineComponent({
    name: "change-password",
    components: {
        FontAwesomeIcon,
    },

    data() {
        return {
            passwordInfo: {
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            },
            userMockList: [] as UserInfo[],
            isAuthenticated1: false,
            isPasswordMatch: true,
            passwordRegex: /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$!&])[A-Za-z\d@#$!&]{8,}$/,
            validationMessage: '',
            userRole: ''
        }
    },

    watch:{
        'passwordInfo.confirmPassword'(){
            if(this.passwordInfo.newPassword !== this.passwordInfo.confirmPassword){
                this.isPasswordMatch = false
            }else{
                this.isPasswordMatch = true;
            }
        },
    },

    computed:{
        isValidForm() : boolean {
            return this.passwordInfo.oldPassword !== ''
                && this.passwordInfo.newPassword !== ''
                && this.passwordInfo.confirmPassword !== ''
        },

    },

    methods: {
        async onClickChangePassword(){
            const userInfo = this.$util.getDataStorage('userInfo',true);
            if(this.isValidForm){
                const reqBody = {
                    userID: userInfo.userID,
                    oldPasswd: this.passwordInfo.oldPassword,
                    newPasswd: this.passwordInfo.newPassword
                }
                const res = (await requestService.request(API_PATH.USER_CHANGE_PASSWORD, reqBody, false, true)) as userLoginRes
                if(res.header.result){
                    this.isAuthenticated1 = true;
                    this.$router.push('admin-dashboard')
                }
                return
            }
        },
        validatePassword() {
            if (this.passwordRegex.test(this.passwordInfo.newPassword)) {
                this.validationMessage = '';
            } else {
                this.validationMessage = 'Password is not Valid!';
            }
        },
    },
})
</script>

<style lang="scss" scoped>
    // @import "./login.scss";
</style>