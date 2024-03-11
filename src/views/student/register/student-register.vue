<template>
    <h2>Hello</h2>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    /** Option Misc */
    name: "app",
    inheritAttrs: false,
    components: {
        // 
    },
    directives: {
        // 
    },

    /** Option State */
    data() {
        return {
            data: "Hello World"
        }
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
    emits: {
        // 
    },
    expose: [""],

    /** Option LifeCycle */
    beforeCreate() {
        // this.data = "Hello Baby"
    },
    created() {
        // console.log(this.data)
    },
    beforeMount() {
        // this.data = "Hello Papa"
    },
    mounted() {
        console.log(this.data)
    },
    beforeUpdate() {
        // console.log("Before Update")
    },
    updated() {
        // 
    },
    beforeUnmount() {
        // console.log("Page Before Unmount")
    },
    unmounted() {
        // console.log("Unmounted")
    },
    errorCaptured() {
        // 
    },
    renderTracked() {
        // 
    },
    renderTriggered() {
        // 
    },
    activated() {
        // 
    },
    deactivated() {
        // 
    },
    serverPrefetch() {
        // console.log("Server Prefetch")
    },

    /** Option Composition */
    provide: {
        // 
    },
    inject: {
        //
    },
    mixins: [],
    // extends:[""]
})
</script>

<style>
</style>