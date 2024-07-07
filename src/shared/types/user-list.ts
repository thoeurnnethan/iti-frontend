interface UserList {
  userID: number
  roleID: string
  firstName: string
  lastName: string
  nickName: string
  gender: string
  dateOfBirth: string
  placeOfBirth: string
  address: string
  email: string
  passwd: string
  imageUrl: string
  firstLoginDate: string
  lastLoginDate: string
  statusCode: string
}

interface ManagerList {
  userID: string
  roleID: string
  specificID: string
  firstName: string
  lastName: string
}

interface ManagerList_Req {
  userID: string
  roleID: string
  pageSize: number
  pageNumber: number
}

interface ManagerList_Res {
  body:{
    userList: Array<ManagerList>
  }
}

interface UserList_Res {
  totalCount: number
  employeeList: Array<UserList>
}

export type {
  UserList,
  ManagerList_Req,
  ManagerList_Res,
  ManagerList,
  UserList_Res
}