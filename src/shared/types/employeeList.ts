

interface EmployeeList {
    studentID: number
    name: string
    gender: number
    dob: string
    pob: string
    position: string
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