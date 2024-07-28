export const DashboardService = {

    getMenuList() {
        return [
            {
                "path": "/admin-dashboard",
                "iconClass": "fa fa-house",
                "name": "home"
            },
            {
                "path": "/department-list",
                "iconClass": "fa-building",
                "name": "departmentList"
            },
            {
                "path": "/room-list",
                "iconClass": "fa-calendar-days",
                "name": "roomList",
            },
            {
                "path": "/class-list",
                "iconClass": "fa-calendar-days",
                "name": "classList",
            },
            {
                "path": "/subject-list",
                "iconClass": "fa-calendar-days",
                "name": "subjectList",
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
        ]
    }

}