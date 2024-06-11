import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "login",
            component: () => import("../layouts/loginLayout/loginLayout.vue"),
        },
        {
            path: "/register",
            name: "register",
            component: () => import("../layouts/registerLayout/registerLayout.vue"),
        },
        {
            path: "/dashboard",
            name: "dashboard",
            component: () => import("../layouts/dashboardLayout/dashboardLayout.vue"),
            children:[
                {
                    path: "/teaching-class",
                    name: "teaching-class",
                    component: () => import("../layouts/teachingClass/teachingClass.vue")
                },
                {
                    path: "/student-list",
                    name: "student-list",
                    component: () => import("../layouts/studentList/studentList.vue")
                },
                {
                    path: "/student-edit",
                    name: "student-edit",
                    component: () => import("../layouts/student_edit_layout/student_edit_layout.vue")
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
                },
            ]
        },
        
    ]
});

export default router