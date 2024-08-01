
export interface SUBJECT_LIST {
  classID: string
  className: string
  subjectID: string
  subjectName: string
  subjectDesc?: string
  statusCode?: string
}

export interface SUBJECT_LIST_REQ {
  userID: string
  classID: string
  searchKey: string
  pageSize: number
  pageNumber: number
}

export interface SUBJECT_LIST_RES {
  body: {
    totalCount: number
    subjectList: Array<SUBJECT_LIST>
  }
}

