
export interface CLASS_LIST {
  classID: string
  departmentID: string
  className: string
  classDesc: string
  statusCode?: string
}

export interface CLASS_LIST_REQ {
  classID: string
  departmentID: string
  pageNumber: number
  pageSize: number
}

export interface CLASS_LIST_RES {
  body : {
    classList: CLASS_LIST[]
    totalCount : number 
  }
}

