<template>
    <h2>Black/Dark Table</h2>
  <p>The .table-dark class adds a black background to the table:</p>            
  <table class="table table-dark">
    <thead>
      <tr>
        <th>Firstname</th>
        <th>Lastname</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr>
      <tr>
        <td>Mary</td>
        <td>Moe</td>
        <td>mary@example.com</td>
      </tr>
      <tr>
        <td>July</td>
        <td>Dooley</td>
        <td>july@example.com</td>
      </tr>
    </tbody>
  </table>
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