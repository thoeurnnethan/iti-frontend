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
  studentInfo?: STUDENT_INFO
}

interface PARENT_LIST{
  firstName: string;
  lastName: string;
  nickName: string;
  gender: string;
  job: string;
  phone: string;
  address: string;
}

interface ACADEMIC_LIST {
  academicID: number;
  academicName: string;
  academicDesc: string;
  startDate: string;
  endDate: string;
  certificatedDate: string;
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

interface USER_LIST_REQ {
  userList: Array<USER_LIST>
}

interface STUDENT_INFO{
  academicList: Array<ACADEMIC_LIST>,
  parentList: Array<PARENT_LIST>
}

interface ManagerList_Res {
  body:{
    userList: Array<ManagerList>
  }
}

interface USER_LIST_RES {
  userList: Array<USER_LIST>
}

export type {
  USER_LIST,
  PARENT_LIST,
  ACADEMIC_LIST,
  USER_LIST_RES,
  USER_LIST_REQ,
  ManagerList_Req,
  ManagerList_Res,
  ManagerList,
}