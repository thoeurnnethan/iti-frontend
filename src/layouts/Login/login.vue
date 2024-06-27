<template src="./login.html"></template>

<script lang="ts">
import { UserInfo } from '@/shared/types/user-type';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { defineComponent } from 'vue';
import { LoginService } from './LoginService';

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
            userMockList: [] as UserInfo[]
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
                    role = user?.roleID
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
    @import "./login.scss";
</style>