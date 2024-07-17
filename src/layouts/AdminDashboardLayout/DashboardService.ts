export const DashboardService = {

    getMenuList() {
        return [
            {
                "path": "/admin-dashboard",
                "iconClass": "fa fa-house",
                "name": "home"
            },
            {
                "path": "/class-list",
                "iconClass": "fa-calendar-days",
                "name": "classList",
            },
            {
                "path": "/user-list",
                "iconClass": "fa-solid fa-school",
                "name": "userList",
                "open": false,
                "subMenuList":[
                    {
                        "path": "/user-list",
                        "iconClass": "fa-calendar-days",
                        "name": "userList",
                    },
                    {
                        "path": "/user-register",
                        "iconClass": "fa-calendar-days",
                        "name": "userRegister",
                    },
                ]
            },
            {
                "path": "/department-list",
                "iconClass": "fa-building",
                "name": "departmentList"
            }
        ]
    }

}