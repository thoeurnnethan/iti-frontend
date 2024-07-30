
export interface SUBJECT_LIST {
[x: string]: { classID?: string | undefined; seqNo?: number | undefined; subjectName: string; subjectDesc?: string | undefined; statusCode?: string | undefined }[]
  classID?: string
  seqNo?: number
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
  body : {
roomList: any
    subjectList: Array<SUBJECT_LIST>
    totalCount : number 
  }
}

