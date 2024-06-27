export const LoginService = {

    getUserMockList() {
        return [
            {
                "username": "admin",
                "password": "admin",
                "roleID": "admin"
            },
            {
                "username": "teacher",
                "password": "teacher",
                "roleID": "teacher"
            },
            {
                "username": "student",
                "password": "teacher",
                "roleID": "student"
            }
        ]
    }

}