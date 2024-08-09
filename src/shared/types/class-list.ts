export interface CLASS_LIST {
  classID: string
  classInfoID: string
  departmentID: string 
  departmentName: string 
  className: string 
  classDesc: string 
  year: string 
  semester: string 
  generation: string 
  statusCode: string ,
  firstRegisterDate?: string
  lastChangeDate?: string
}

export interface CLASS_LIST_REQ {
  classID: string
  departmentID: string
  searchKey: string
  year: string 
  semester: string 
  generation: string
  pageNumber?: number
  pageSize?: number
}

export interface CLASS_LIST_RES {
  body : {
    totalCount: number
    classList: CLASS_LIST[]
  }
}


