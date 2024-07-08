interface USER_LIST {
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
  phone: string
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
interface USER_LIST_REQ {
  searchKey: string
  roleID: string
  statusCode: string
  pageSize: number
  pageNumber: number
}
interface USER_LIST_RES {
  body:{
    totalCount: number
    userList: Array<USER_LIST>
  }
  
}

export type {
  USER_LIST,
  USER_LIST_RES,
  USER_LIST_REQ,
  ManagerList_Req,
  ManagerList_Res,
  ManagerList,
}