import { defineStore } from 'pinia'

export const useAuth = defineStore("Auth", {
    state: () => ({
        isAuth: false
    }),

    getters: {
        getCount: (state) => state.isAuth,
    },

    actions: {
        onLogin(userID: string, password: string) {
            if (userID.trim() && password.trim()) {
                this.$state.isAuth = true;
            }
        },
    }
}) 