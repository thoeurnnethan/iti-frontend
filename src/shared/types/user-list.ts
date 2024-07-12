interface USER_LIST {
  roleID: string
  firstName: string
  lastName: string
  nickName: string
  gender: string
  dateOfBirth: string
  placeOfBirth: string
  address: string
  phone: string
  email: string
  passwd: string
  imageUrl: string
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
  body:{
    userList: Array<USER_LIST>
  }
}
interface USER_LIST_RES {
  userList: Array<USER_LIST>
}

export type {
  USER_LIST,
  USER_LIST_RES,
  USER_LIST_REQ,
  ManagerList_Req,
  ManagerList_Res,
  ManagerList,
}