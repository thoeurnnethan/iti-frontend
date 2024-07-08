<template src="./user-register.html"></template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    /** Option Misc */
    name: "app",
    inheritAttrs: false,
    components: {
        // 
    },

    data() {
        return {
            selectedCity: null,
            cities: [
                { name: 'New York', code: 'NY' },
                { name: 'Rome', code: 'RM' },
                { name: 'London', code: 'LDN' },
                { name: 'Istanbul', code: 'IST' },
                { name: 'Paris', code: 'PRS' }
            ]
        };
    },
    props: {
        // 
    },
    computed: {
        // 
    },
    methods: {
        // 
    },
    watch: {
        // 
    },
})
</script>

<style>
@import url('./user-register.scss');
</style>