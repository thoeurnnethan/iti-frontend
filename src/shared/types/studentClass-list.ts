
export interface STUDENT_CLASS_LIST {
  classID?: string 
  classYear?: string 
  semester?: string 
  generation?: string
  className?: string 
  classDesc?: string 
  studentID?: string 
  firstName?: string 
  lastName?: string 
  dateOfBirth?: string 
  gender?: string 
  phoneNumber?: string 
  statusCode?: string 
}

export interface STUDENT_CLASS_LIST_REQ {
  classInfoID: string
  studentID: string,
}

export interface STUDENT_CLASS_LIST_RES {
  body: {
    classInfoID: string
    studentList: Array<STUDENT_CLASS_LIST>
  }
}

