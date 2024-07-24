interface USER_LIST {
  userID?: string
  specID?: string
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
  status: string 
  studentInfo?: STUDENT_INFO
  teacherInfo?: TEACHER_INFO
}

interface PARENT_LIST {
  firstName: string
  lastName: string
  nickName: string
  gender: string
  job: string
  phone: string
  address: string
}

interface ACADEMIC_LIST {
  no?: number
  seqNo?: number
  academicID?: number
  academicName: string
  academicDesc: string
  startDate: string
  endDate: string
  certificatedDate: string
}

interface QUALIFICATION_LIST {
  no?: number
  seqNo?: number
  qualificationName: string
  qualificationDesc: string
  startDate: string
  endDate: string
  certificatedDate: string
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

interface TEACHER_RES {
  body:{
    userList: Array<USER_LIST>
  }
}

interface STUDENT_INFO {
  academicList: Array<ACADEMIC_LIST>,
  parentList: Array<PARENT_LIST>
}

interface TEACHER_INFO{
  qualificationList: Array<QUALIFICATION_LIST>
}

interface USER_DETAIL_REQ {
  userID: string,
  specificID: string
}

interface USER_DETAIL_RES {
  body: USER_LIST
}

export type {
  PARENT_LIST,
  ACADEMIC_LIST,
  QUALIFICATION_LIST,
  USER_DETAIL_REQ,
  USER_DETAIL_RES,
  USER_LIST,
  USER_LIST_REQ,
  USER_LIST_RES,
  TEACHER_RES,
  ManagerList,
  ManagerList_Req,
  ManagerList_Res, STUDENT_INFO,
}