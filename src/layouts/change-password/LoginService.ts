export const LoginService = {

    getUserMockList() {
        return [
            {
                "userID": "admin",
                "password": "admin",
                "roleID": "admin"
            },
            {
                "userID": "teacher",
                "password": "teacher",
                "roleID": "teacher"
            },
            {
                "userID": "student",
                "password": "teacher",
                "roleID": "student"
            }
        ]
    }

}