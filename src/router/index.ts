import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "login",
            component: () => import("../views/auth/auth.vue")
        },
        {
            path: "/dashboard",
            name: "dashboard",
            component: () => import("../views/dashboard/dashboard.vue"),
            props: route => ({ id: route.params.id })
        }
    ]
});

export default router