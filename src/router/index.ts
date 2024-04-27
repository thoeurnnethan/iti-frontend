import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "dashboardLayout",
            component: () => import("../layouts/dashboardLayout/dashboardLayout.vue"),
            children:[
                {
                    path: "/login",
                    name: "login",
                    component: () => import("../layouts/auth/auth.vue")
                },
                {
                    path: "/student",
                    name: "student",
                    component: () => import("../views/student/student list/student-list.vue")
                },
                {
                    path: "/customer",
                    name: "customer",
                    component: () => import("../views/table/horizontal.vue")
                },
                {
                    path: "/navbar",
                    name: "navbar",
                    component: () => import("../components/Navbar/Navbar.vue")
                }
            ]
        },
    ]
});

export default router