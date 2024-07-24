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
            // redirect: "/home",
            children:[
                {
                    path: "/admin-dashboard",
                    name: "home",
                    component: () => import("@/views/home/home.vue")
                },
                {
                    path: "/user-list",
                    name: "user-list",
                    component: () => import("@/views/user/user-list/user-list.vue")
                },
                {
                    path: "/user-register",
                    name: "user-register",
                    component: () => import("@/views/user/user-register/user-register.vue")
                },
                {
                    path: "/user-edit/:id",
                    name: "user-update",
                    component: () => import("@/views/user/user-update/user-update.vue")
                },
                {
                    path: "/class-list",
                    name: "class-list",
                    component: () => import("@/views/class/class-list/class-list.vue")
                },
                {
                    path: "/class-register",
                    name: "class-register",
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
                    path: "/student-list",
                    name: "department-insert",
                    component: () => import("@/views/")
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