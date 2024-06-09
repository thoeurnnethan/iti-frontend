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
                    path: "/student-list",
                    name: "student-list",
                    component: () => import("../views/student/student-list/student-list.vue")
                },
                {
                    path: "/student-register",
                    name: "student-register",
                    component: () => import("../views/student/student-register/student-register.vue")
                },
                {
                    path: "/department-list",
                    name: "department-list",
                    component: () => import("../views/department/department-list/department-list.vue")
                },
                {
                    path: "/department-register",
                    name: "department-register",
                    component: () => import("../views/department/department-register/department-register.vue")
                }
            ]
        },
    ]
});

export default router