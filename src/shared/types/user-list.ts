interface USER_LIST {
  userID?: string
  specID?: string
  roleID: string
  classInfoID?: string,
  departmentID?: string,
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
  studentInfo: STUDENT_INFO
  teacherInfo: TEACHER_INFO
}

interface USER_LIST_FORM_CHECK {
  firstName: boolean
  lastName: boolean
  nickName: boolean
  gender: boolean
  dateOfBirth: boolean
  placeOfBirth: boolean
  address: boolean
  phone: boolean
  email: boolean
  passwd: boolean
}

interface PARENT_LIST {
  firstName: string
  lastName: string
  job: string
  phone: string
  address: string
}

interface PARENT_LIST_FORM_CHECK {
  firstName: boolean
  lastName: boolean
  gender: boolean
  job: boolean
  phone: boolean
  address: boolean
}

interface ACADEMIC_LIST {
  studentID?: string
  seqNo?: number
  academicName: string
  academicDesc: string
  startDate: string
  endDate: string
  certificatedDate: string
}

interface ACADEMIC_LIST_FORM_CHECK {
  academicName: boolean
  startDate: boolean
  endDate: boolean
  certificatedDate: boolean
}

interface QUALIFICATION_LIST {
  studentID?: string
  seqNo?: number
  qualificationName: string
  qualificationDesc: string
  startDate: string
  endDate: string
  certificatedDate: string
}

interface QUALIFICATION_LIST_FORM_CHECK {
  qualificationName: boolean
  startDate: boolean
  endDate: boolean
  certificatedDate: boolean
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
  roleID: string
}

interface USER_LIST_RES {
  body:{
    totalCount: number
    totalMale: number
    totalFemale: number
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
  ManagerList_Res,
  STUDENT_INFO,
  USER_LIST_FORM_CHECK,
  QUALIFICATION_LIST_FORM_CHECK,
  ACADEMIC_LIST_FORM_CHECK,
  PARENT_LIST_FORM_CHECK
}