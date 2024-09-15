<template>
    <ion-app>
        <router-view />
    </ion-app>
</template>

<script lang="ts">
import { IonApp } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'App',
    components: {
        IonApp
    },

    data() {
        return {
            language: localStorage.getItem('lang') || 'en',
            lastRoute: this.$util.getDataStorage('lastRoute',true),
            userInfo: this.$util.getDataStorage('userInfo',true),
            isAuthenticated: this.$util.getDataStorage('isAuthenticated', true)
        };
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
})
</script>

