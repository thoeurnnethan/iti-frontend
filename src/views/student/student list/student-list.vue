<template src="./student-list.html"></template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    /** Option Misc */
    name: "app",
    inheritAttrs: false,
    components: {
        // 
    },

    /** Option State */
    data() {
        return {
            data: "Hello World"
        }
    },
   
})
</script>

<style>
@import url('./student-list.scss');
</style>