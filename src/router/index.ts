import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "login",
            component: () => import("@/layouts/Login/login.vue"),
        },
        {
            path: "/admin-dashboard",
            name: "dashboardLayout",
            component: () => import("@/layouts/AdminDashboardLayout/dashboardLayout.vue"),
            children:[
                {
                    path: "/student-list",
                    name: "student-list",
                    component: () => import("@/views/student/student-list/student-list.vue")
                },
                {
                    path: "/student-register",
                    name: "student-register",
                    component: () => import("@/views/student/student-register/student-register.vue")
                },
                {
                    path: "/department-list",
                    name: "department-list",
                    component: () => import("@/views/department/department-list/department-list.vue")
                }
            ]
        },
    ]
});

export default router