export const DahsboardService = {

    getMenuList() {
        return [
            {
                "path": "/",
                "iconClass": "fa-solid fa-house-user",
                "name": "home"
            },
            {
                "path": "/student-list",
                "iconClass": "fa-solid fa-school",
                "name": "studentList"
            },
            {
                "path": "/student-register",
                "iconClass": "fa-solid fa-school",
                "name": "studentRegister"
            },
            {
                "path": "/department-list",
                "iconClass": "fa-solid fa-bars",
                "name": "departmentList"
            },
            {
                "path": "/department-register",
                "iconClass": "fa-solid fa-bars",
                "name": "departmentRegister"
            }
        ]
    }

}