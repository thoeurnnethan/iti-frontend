
export interface SUBJECT_LIST {
  classID: string
  seqNo: number
  subjectName: string
  subjectDesc: string
  statusCode: string
  firstRegisterDate?: string
  lastChangeDate?: string
}

export interface SUBJECT_LIST_REQ {
  userID: string
  classID: string
  searchKey: string
  pageSize: number
  pageNumber: number
}

export interface SUBJECT_LIST_RES {
  body : {
    subjectList: Array<SUBJECT_LIST>
    totalCount : number 
  }
}

