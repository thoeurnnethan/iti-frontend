export interface CLASS_LIST {
  classID: string
  departmentID: string 
  className: string 
  classDesc: string 
  year: string 
  generation: string 
  time: string 
  semester: number 
  statusCode: string 
}

export interface CLASS_LIST_REQ {
  classID: string
  departmentID: string
  pageNumber: number
  pageSize: number
}

export interface CLASS_LIST_RES {
  body : {
    totalCount: number
    classList: CLASS_LIST[]
  }
}


