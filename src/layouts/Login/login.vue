<template src="./login.html"></template>

<script lang="ts">
import { UserInfo } from '@/shared/types/user-type';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { defineComponent } from 'vue';
import { LoginService } from './LoginService';
import { RequestService } from '@/shared/services/request-service';
import { API_PATH } from '@/shared/common/api-path';

const requestService = new RequestService();

export default defineComponent({
    name: "Dashboard",
    components: {
        FontAwesomeIcon,
    },

    data() {
        return {
            userLogin: {
                roleID: '',
                username: '',
                password: ''
            } as UserInfo,
            userMockList: [] as UserInfo[],
            isAuthenticated1: false
        }
    },

    computed:{
        isValidForm() : boolean {
            return this.userLogin.username !== ''
                && this.userLogin.password !== ''
        }
    },

    mounted() {
        this.getUserMockList();
    },

    methods: {
        getUserMockList(){
            this.userMockList = LoginService.getUserMockList();
        },

        onClickLogin(){
            let isAuthenticated = false;
            let role= '' as string;
            this.userMockList.forEach(user => {
                if (user.username === this.userLogin.username && user.password === this.userLogin.password) {
                    isAuthenticated = true;
                    role = 'admin';
                    this.$util.setDataStorage('userInfo',this.userLogin,true)
                }
            });
            if(isAuthenticated){
                if(role === 'admin'){
                    this.$router.push('/admin-dashboard');
                }else if(role === 'teacher'){
                    this.$router.push('/teacher-dashboard');
                }else{
                    this.$router.push('/student-dashboard');
                }
            }
        },

        async onClickLoginServer(){
            if(this.isValidForm){
                const reqBody = {
                    ...this.userLogin
                }
                const res = (await requestService.request(API_PATH.CLASS_DETAIL, reqBody, false))
                console.log(res);
                this.isAuthenticated1 = true;
                
            }

            let isAuthenticated = false;
            let role= '' as string;
            this.userMockList.forEach(user => {
                if (user.username === this.userLogin.username && user.password === this.userLogin.password) {
                    isAuthenticated = true;
                    this.$util.setDataStorage('userInfo',this.userLogin,true)
                }
            });

            if(isAuthenticated){
                if(role === 'admin'){
                    this.$router.push('/admin-dashboard');
                }else if(role === 'teacher'){
                    this.$router.push('/teacher-dashboard');
                }else{
                    this.$router.push('/student-dashboard');
                }
            }
        }
    },
})
</script>

<style lang="scss" scoped>
    // @import "./login.scss";
</style>