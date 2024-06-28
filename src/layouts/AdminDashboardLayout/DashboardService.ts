export const DahsboardService = {

    getMenuList() {
        return [
            {
                "path": "/home",
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
            }
        ]
    }

}