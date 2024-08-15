
export interface TEACHER_DEPARTMENT_LIST {
[x: string]: any
  teacherID?: string 
  roleID?: string 
  firstName?: string z
  lastName?: string 
  gender?: string 
  dateOfBirth?: string 
  departmentID?: string 
  userRoleInDpm?: string 
}

export interface TEACHER_DEPARTMENT_LIST_REQ {
  teacherID: string
  departmentID: string,
}

export interface TEACHER_DEPARTMENT_LIST_RES {
  body: {
    departmentID: string
    teacherList: Array<TEACHER_DEPARTMENT_LIST>
  }
}

