export const DahsboardService = {

    getMenuList() {
        return [
            {
                "path": "/",
                "iconClass": "fa-solid fa-user",
                "name": "DashboardLayout"
            },
            {
                "path": "/student",
                "iconClass": "fa-solid fa-user",
                "name": "Student",
                "subMenuList":[
                    {
                        "path": "/register",
                        "iconClass": "fa-solid fa-user",
                        "name": "StudentRegister",
                    },
                    {
                        "path": "/list",
                        "iconClass": "fa-solid fa-user",
                        "name": "StudentList",
                    }
                ]
            },
            {
                "path": "/customer",
                "iconClass": "fa-solid fa-user",
                "name": "Customer"
            },
            {
                "path": "/login",
                "iconClass": "fa-solid fa-user",
                "name": "Login"
            },
            {
                "path": "https://t.me/Thoeurn_Nethan",
                "iconClass": "fa-solid fa-user",
                "name": "Telegram"
            }
        ]
    }

}