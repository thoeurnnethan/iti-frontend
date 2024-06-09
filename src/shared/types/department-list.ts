
export interface DEPARTMENT_LIST {
  departmentID: string
  departmentName: string
  departmentDesc: string
  statusCode: string
  teacherID: string
  firstName: string
  lastName: string
  departmentRoleCode: string
  departmentRoleName: string
  departmentRoleDesc: string
  firstRegisterDate: string
  lastChangeDate: string
}

export interface DEPARTMENT_LIST_REQ {
  userID: string
  departmentName: string
  pageSize: number
  pageNumber: number
}

export interface DEPARTMENT_LIST_RES {
  body : {
    departmentList: DEPARTMENT_LIST[]
    totalCount : number 
  }
}

