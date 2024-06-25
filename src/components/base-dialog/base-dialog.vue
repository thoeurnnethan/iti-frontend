<template src="./base-dialog.html"></template>

<script lang="ts">
import { defineComponent } from 'vue'
import { modalController } from '@ionic/vue';

export default defineComponent({
    name: "baseDialogVue",
    props: {
        title: {
            type: String
        },
        content: {
            type: String
        },
        btnLabel: {
            type: String
        },
        showCancel: {
            type: Boolean,
            default: true
        },
        cancelLabel : {
            type : String,
        }
    },
    data() {
        return {}
    },

    methods: {
        handleClose() {
            return modalController.dismiss()
        },
        onClickOK() {
            return modalController.dismiss(null, 'ok')
        }
    }
})
</script>

<style lang="scss" scoped>
@import "./base-dialog.scss";
</style>
