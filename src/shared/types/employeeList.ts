

interface EmployeeList {
    studentID: number
    studentName: string
    gender: string
    dateOfBirth: string
    placeOfBirth: string
    positionDesc: string
    bankAccountNo: string
  }

  interface TotalCount {
    totalCount: number
  }

  interface EmployeeList_Res {
      totalCount: number
      employeeList: Array<EmployeeList>
  }

  export type{
    EmployeeList,
    TotalCount,
    EmployeeList_Res
  }