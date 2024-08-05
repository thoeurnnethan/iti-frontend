
export interface SUBJECT_LIST {
  seqNo?: number
  classID: string
  className?: string
  subjectID?: string
  subjectName: string
  subjectDesc?: string
  statusCode?: string
}

export interface SUBJECT_LIST_REQ {
  classID: string
  searchKey: string
  pageSize: number
  pageNumber: number
}

export interface SUBJECT_LIST_RES {
  body: {
    totalCount: number
    classID: string
    subjectList: Array<SUBJECT_LIST>
  }
}

