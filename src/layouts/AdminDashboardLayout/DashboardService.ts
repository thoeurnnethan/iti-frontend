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
                "iconClass": "fa-landmark",
                "name": "classList",
                "open": false,
                "subMenuList":[
                    {
                        "path": "/class-list",
                        "iconClass": "fa-caret-right",
                        "name": "classList",
                    },
                    {
                        "path": "/score-list",
                        "iconClass": "fa-caret-right",
                        "name": "studentScore",
                    }
                ]
            },
            {
                "path": "/subject-list",
                "iconClass": "fa-book-open",
                "name": "subjectList",
            },
            {
                "path": "/room-list",
                "iconClass": "fa-shop",
                "name": "roomList",
            },
            {
                "iconClass": "fa-calendar-days",
                "name": "scheduleManagement",
                "open": false,
                "subMenuList":[
                    {
                        "path": "/schedule-list",
                        "iconClass": "fa-caret-right",
                        "name": "scheduleList",
                    },
                    {
                        "path": "/schedule-register",
                        "iconClass": "fa-caret-right",
                        "name": "scheduleRegister",
                    },
                ]
            },
            {
                "iconClass": "fa-users",
                "name": "userManagement",
                "open": false,
                "subMenuList":[
                    {
                        "path": "/user-list",
                        "iconClass": "fa-caret-right",
                        "name": "userList",
                    },
                    {
                        "path": "/user-register",
                        "iconClass": "fa-caret-right",
                        "name": "userRegister",
                    },
                ]
            }
        ]
    }

}