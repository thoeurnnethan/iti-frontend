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
            path: "/change-password",
            name: "change-password",
            component: () => import("@/layouts/change-password/change-password.vue"),
        },
        {
            path: "/admin-dashboard",
            name: "dashboardLayout",
            component: () => import("@/layouts/AdminDashboardLayout/dashboardLayout.vue"),
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
                    path: "/user-update/:userID",
                    name: "user-update",
                    component: () => import("@/views/user/user-register/user-register.vue")
                },
                {
                    path: "/class-list",
                    name: "class-list",
                    component: () => import("@/views/class/class-list/class-list.vue")
                },
                {
                    path: "/room-list",
                    name: "room-list",
                    component: () => import("@/views/room/room-list/room-list.vue")
                },
                {
                    path: "/department-list",
                    name: "department-list",
                    component: () => import("@/views/department/department-list/department-list.vue")
                },
                {
                    path: "/score-list",
                    name: "score-list",
                    component: () => import("@/views/score/score-list/score-list.vue")
                },
                {
                    path: "/subject-list",
                    name: "subject-list",
                    component: () => import("@/views/subject/subject-list/subject-list.vue")
                },
                {
                    path: "/schedule-list",
                    name: "schedule-list",
                    component: () => import("@/views/schedule/schedule-list/schedule-list.vue")
                },
                {
                    path: "/schedule-register",
                    name: "schedule-register",
                    component: () => import("@/views/schedule/schedule-register/schedule-register.vue")
                },
                {
                    path: "/score-list",
                    name: "score-list",
                    component: () => import("@/views/score/score-list/score-list.vue")
                }
            ]
        },
    ]
});

export default router