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
                "path": "/class-list",
                "iconClass": "fa-user-graduate",
                "name": "classList",
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
                "path": "/schedule-list",
                "iconClass": "fa-book-open",
                "name": "scheduleManagement"
            },
            {
                "path": "/user-list",
                "iconClass": "fa-users",
                "name": "userList",
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