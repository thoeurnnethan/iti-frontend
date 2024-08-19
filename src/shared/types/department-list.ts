
export interface DEPARTMENT_LIST {
    departmentID: string
    departmentName: string
    departmentDesc: string
    statusCode: string
    teacherID: string
    firstName?: string
    lastName?: string
    firstRegisterDate?: string
    lastChangeDate?: string
}

export interface DEPARTMENT_INFO {
    departmentID: string
    departmentName: string
    departmentDesc: string
    statusCode: string
    teacherID: string
}

export interface DEPARTMENT_LIST_REQ {
    userID: string
    searchKey: string
    pageSize: number
    pageNumber: number
}

export interface DEPARTMENT_LIST_RES {
    body: {
        departmentList: DEPARTMENT_LIST[]
        totalCount: number
    }
}

