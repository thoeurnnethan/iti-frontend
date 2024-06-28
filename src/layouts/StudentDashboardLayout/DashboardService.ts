export const DahsboardService = {

    getMenuList() {
        return [
            {
                "path": "/",
                "iconClass": "fa-solid fa-house-user",
                "name": "Home"
            },
            {
                "path": "/student",
                "iconClass": "fa-solid fa-school",
                "name": "Student Management",
                "subMenuList":[
                    {
                        "path": "/student-list",
                        "iconClass": "fa-solid fa-school",
                        "name": "Student List"
                    },
                    {
                        "path": "/student-register",
                        "iconClass": "fa-solid fa-school",
                        "name": "Student Register"
                    }
                ]
            },
            {
                "path": "/department-list",
                "iconClass": "fa-solid fa-bars",
                "name": "Department Management"
            },
            {
                "path": "/department-register",
                "iconClass": "fa-solid fa-bars",
                "name": "Department Register"
            }
        ]
    }

}