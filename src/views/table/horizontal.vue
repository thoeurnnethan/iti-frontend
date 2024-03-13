<template src="./horizontal.html"></template>

<script lang="ts">
import { CustomerService } from './CustmersService';

export default {
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
