<template src="./login.html"></template>

<script lang="ts">
import { UserInfo, userLoginRes, userLoginResData } from '@/shared/types/user-type';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { defineComponent } from 'vue';
import { RequestService } from '@/shared/services/request-service';
import { API_PATH } from '@/shared/common/api-path';

const requestService = new RequestService();

export default defineComponent({
    name: "login",
    components: {
        FontAwesomeIcon,
    },

    data() {
        return {
            userLogin: {
                userID: '',
                password: ''
            } as UserInfo,
            userMockList: [] as UserInfo[],
            userResInfo: {} as userLoginResData,
            userRole: ''
        }
    },

    computed:{
        isValidForm() : boolean {
            return this.userLogin.userID !== ''
                && this.userLogin.password !== ''
        }
    },

    methods: {
        async onClickLoginServer(){
            if(this.isValidForm){
                const reqBody = {
                    ...this.userLogin
                }
                const res = (await requestService.request(API_PATH.USER_LOGIN, reqBody, false, true)) as userLoginRes
                if(res.header.result){
                    this.userResInfo = res.body
                    this.userResInfo ={
                        ...this.userResInfo,
                        loginSessionID: res.header.login_session_id
                    }
                    this.$util.setDataStorage('userInfo', this.userResInfo,true)
                    this.$util.setDataStorage('isAuthenticated',true , true)
                    if(this.userResInfo.loginByUserYn === 'Y'){
                        this.$router.push('/admin-dashboard')
                    }else{
                        this.$router.push('/change-password')
                    }
                }
            }
        }
    },
})
</script>

<style lang="scss" scoped>
    // @import "./login.scss";
</style>