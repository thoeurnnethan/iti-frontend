
export interface STUDENT_LIST {
  studentID: string
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

export interface STUDENT_LIST_REQ {
  userID: string
  pageSize: number
  pageNumber: number
}

export interface STUDENT_LIST_RES {
  body : {
    studentList: STUDENT_LIST[]
    totalCount : number 
  }
}

export interface PARENT_LIST {
  studentID: string
  seqNo : number 
  firstName : string
  lastName : string
  gender : string
  job : string
  address : string
  phone : string
}

export interface ACADEMIC_LIST {
  studentID: string
  seqNo : number 
  academicName : string
  academicDesc : string
  startDate : string
  endDate : string
  certificatedDate : string
}
export interface STUDENT_DETAILS_RES {
  body: {
    studentInfo: STUDENT_LIST,
    parentList: Array<PARENT_LIST>,
    academicList: Array<ACADEMIC_LIST>
  }
}


