<template>
    <ion-app>
        <router-view />
    </ion-app>
</template>

<script lang="ts">
import { IonApp } from '@ionic/vue';
import { defineComponent } from 'vue';
import i18n from './i18n';

export default defineComponent({
    name: 'App',
    components: {
        IonApp
    },

    data() {
        return {
            language: localStorage.getItem('lang') || 'en',
        };
    },

    watch: {
        language(newLanguage) {
            i18n.locale = newLanguage;
        },
    },
})
</script>

