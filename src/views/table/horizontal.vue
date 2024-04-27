<template src="./horizontal.html"></template>

<script lang="ts">
import DataTable from 'primevue/datatable';
import { CustomerService } from './CustmersService';
import Column from 'primevue/column';

export default {

    components:{
        DataTable,Column
    },

    data() {
        return {
            customers: null as any
        };
    },
    mounted() {
        CustomerService.getCustomersMedium().then((data) => {
            this.customers = data;
        });
    },
    methods: {
        formatCurrency (value: any) {
            return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        }
    }
};
</script>
