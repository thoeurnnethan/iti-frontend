interface UserInfo {
    userID: string
    password: string
}

interface userRoleList {
    roleID: string
    roleName: string
}

interface userLoginResData{
    userID: string
    specificID: string
    firstName: string
    lastName: string
    nickName: string
    gender: string
    dateOfBirth: string
    placeOfBirth: string
    address: string
    phone: string
    email: string
    jwtToken: string
    imageUrl: string
    loginByUserYn: string
    loginSessionID?: string
}

interface userLoginRes {
    header:{
        error_code: string
        error_text: string
        id_token: string
        info_text: string
        login_session_id: string
        result: boolean
    }
    body: userLoginResData
}

export type {
    UserInfo,
    userRoleList,
    userLoginResData,
    userLoginRes
}