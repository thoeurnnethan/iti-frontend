import { defineStore } from 'pinia'

export const useDashboardStore = defineStore("Dashboard", {
    state: () => ({
        count: 0,
        data: []
    }),

    getters: {
        getCount: (state) => state.count,
    },

    actions: {
        increment() {
            this.count++
        },
    }
}) 