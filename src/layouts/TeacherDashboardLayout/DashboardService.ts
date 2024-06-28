export const DahsboardService = {

    getMenuList() {
        return [
            {
                "path": "/",
                "iconClass": "fa-solid fa-house",
                "name": "Home"
            },
            {
                "path": "/student-list",
                "iconClass": "fa-solid fa-school",
                "name": "Student List"
            },
            {
                "path": "/student-register",
                "iconClass": "fa-solid fa-school",
                "name": "Register Student"
            },
            {
                "path": "/department-list",
                "iconClass": "fa-solid fa-bars",
                "name": "Department List"
            },
            {
                "path": "/department-register",
                "iconClass": "fa-solid fa-bars",
                "name": "Register Department"
            }
        ]
    }

}