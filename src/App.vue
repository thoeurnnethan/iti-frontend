<template>
    <ion-app>
        <router-view />
    </ion-app>
</template>

<script lang="ts">
import { IonApp } from '@ionic/vue';
import { defineComponent } from 'vue';
import { userLoginResData } from './shared/types/user-type';
import {jwtDecode} from 'jwt-decode';

export default defineComponent({
    name: 'App',
    components: {
        IonApp
    },

    data() {
        return {
            language: localStorage.getItem('lang') || 'en',
            lastRoute: this.$util.getDataStorage('lastRoute',true),
            userInfo: this.$util.getDataStorage('userInfo',true) as userLoginResData,
            isAuthenticated: this.$util.getDataStorage('isAuthenticated', true)
        };
    },

    beforeCreate(){
        const userInfo = this.$util.getDataStorage('userInfo',true) as userLoginResData
        if(userInfo == undefined) {
            this.handleExpiredToken
        }else{
            if (userInfo.token) {
                try {
                    const decoded = jwtDecode(userInfo.token)
                    const currentTime = Date.now() / 1000;
                    if (decoded && typeof decoded.exp === 'number' && decoded.exp < currentTime) {
                        console.log('Token is expired')
                        this.$util.setDataStorage('isAuthenticated', false, true)
                        this.$util.setDataStorage('lastRoute', '/', true)
                        this.$router.push('/')
                        return
                    } else {
                        console.log('Token is valid');
                        this.handleExpiredToken
                    }
                } catch (error) {
                    console.error('Invalid token:', error);
                    this.handleExpiredToken
                }
            } else {
                console.log('No token found');
                this.handleExpiredToken
            }
        }
    },

    beforeMount(){
        if(this.isAuthenticated === false || this.isAuthenticated === undefined){
            this.$router.push('/')
        }else if(this.isAuthenticated === true && this.userInfo){
            this.$router.push(this.lastRoute)
        }else{
            this.$router.push('admin-dashboard')
        }
    },

    watch: {
        language(newLanguage) {
            this.$i18n.locale = newLanguage;
        },
        isAthenticated(newValue){
            if(newValue === false){
                this.$router.push('/')
            }
        }
    },

    methods: {  
        handleExpiredToken() {
            console.log('handleExpiredToken')
        }
    }
})
</script>

