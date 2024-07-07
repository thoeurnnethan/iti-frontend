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
            redirect: "/home",
            children:[
                {
                    path: "/home",
                    name: "home",
                    component: () => import("@/views/home/home.vue")
                },
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
                    path: "/class-list",
                    name: "class-list",
                    component: () => import("@/views/class/class-list/class-list.vue")
                },
                {
                    path: "/class-insert",
                    name: "class-insert",
                    component: () => import("@/views/class/class-insert/class-insert.vue")
                },
                {
                    path: "/class-edit/:id",
                    name: "class-edit",
                    component: () => import("@/views/class/class-edit/class-edit.vue")
                },
                {
                    path: "/department-list",
                    name: "department-list",
                    component: () => import("@/views/department/department-list/department-list.vue")
                },
                {
                    path: "/department-insert",
                    name: "department-insert",
                    component: () => import("@/views/department/department-insert/department-insert.vue")
                },
                {
                    path: "/department-edit/:id",
                    name: "department-edit",
                    component: () => import("@/views/department/department-edit/department-edit.vue")
                },
                {
                    path: "/score-list",
                    name: "score-list",
                    component: () => import("@/views/score/score-list/score-list.vue")
                },
            ]
        },
    ]
});

export default router