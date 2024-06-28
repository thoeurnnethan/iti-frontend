
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

