
<template>
    <div class="card container min-width:200rem">
        <DataTable :value="customers" scrollable scrollHeight="400px">
            <Column 
                field="id" 
                header="Id" 
                footer="Id" 
                style="min-width: 100px">
            </Column>
            <Column 
                field="name" 
                header="Name" 
                footer="Name" 
                style="min-width: 200px">
            </Column>
            <Column 
                field="country.name" 
                header="Country" 
                footer="Country" 
                style="min-width: 200px">
            </Column>
            <Column 
                field="date" 
                header="Date" 
                footer="Date" 
                style="min-width: 200px">
            </Column>
            <Column 
                field="balance" 
                header="Balance" 
                footer="Balance" 
                style="min-width: 200px">
                <template #body="{ data }">
                    {{ formatCurrency(data.balance) }}
                </template>
            </Column>
            <Column field="company" header="Company" footer="Company" style="min-width: 200px"></Column>
            <Column field="status" header="Status" footer="Status" style="min-width: 200px"></Column>
            <Column field="activity" header="Activity" footer="Activity" style="min-width: 200px"></Column>
            <Column field="representative.name" header="Representative" footer="Representative" style="min-width: 200px"></Column>
        </DataTable>
    </div>
</template>

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
