interface UserInfo {
  username: string
  password: string
  roleID: string
}

interface userRoleList {
  roleID: string
  roleName: string
}

export type {
  UserInfo,
  userRoleList
}