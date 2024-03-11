import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/login",
            name: "login",
            component: () => import("../layouts/auth/auth.vue")
        },
        {
            path: "/",
            name: "dashboardLayout",
            component: () => import("../layouts/dashboardLayout/dashboardLayout.vue"),
            // props: route => ({ id: route.params.id })
            children:[
                {
                    path: "/student",
                    name: "student",
                    component: () => import("../views/student/register/student-register.vue")
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