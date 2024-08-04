export interface CLASS_LIST {
  classID: string
  departmentID: string 
  departmentName: string 
  className: string 
  classDesc: string 
  year: string 
  generation: string 
  time: string 
  semester: string 
  statusCode: string ,
  firstRegisterDate?: string
  lastChangeDate?: string
}

export interface CLASS_LIST_REQ {
  classID?: string
  departmentID: string
  pageNumber: number
  pageSize: number
  searchKeyword: string
  year: string 
  semester?: any 
}

export interface CLASS_LIST_RES {
  body : {
    totalCount: number
    classList: CLASS_LIST[]
  }
}


