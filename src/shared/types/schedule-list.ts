export interface SCHEDULE_LIST {
  scheduleYear: string
  classID: string
  className: string
  classYear: string
  semester: string
  generation: string
  departmentID: string
  departmentName: string
  scheduleID: string
  seqNo: number,
  schDay: string,
  teacherID: string,
  firstName: string,
  lastName: string,
  gender: string,
  email: string,
  subjectID: string,
  subjectName: string,
  roomID: string,
  roomName: string,
  building: string,
  floor: string,
  startTime: string,
  endTime: string,
}

export interface SCHEDULE_INFO {
  scheduleYear?: string
  scheduleDay: string
  seqNo: number,
  teacherID: string,
  firstName: string,
  lastName: string,
  phoneNumber: string
  subjectID: string,
  subjectName: string,
  roomID: string,
  roomName: string,
  building: string,
  floor: string,
  startTime: string,
  endTime: string
}

export interface ScheduleRow {
  startTime: string,
  endTime: string
  Monday?: SCHEDULE_INFO
  Tuesday?: SCHEDULE_INFO
  Wednesday?: SCHEDULE_INFO
  Friday?: SCHEDULE_INFO
  Saturday?: SCHEDULE_INFO
}

export interface TEACHER_LIST {
  departmentID: string,
  departmentName: string
  departmentDesc: string
  teacherID: string
  userRoleID: string
  firstName: string
  lastName: string
  gender: string
  dateOfBirth: string
  phoneNumber: string
}

export interface TEACHER_LIST_RES{
  body:{
    departmentList: Array<TEACHER_LIST>
  }
}

export interface ScheduleColumn {
  field: string;
  header: string;
}

export interface SCHEDULE_LIST_REQ {
  scheduleYear: string
  scheduleDay?: string
  classYear: string
  departmentID: string
  classID: string
  semester: string
  searchKey: string
}

export interface SCHEDULE_LIST_RES{
  body:{
    scheduleList: Array<SCHEDULE_LIST>
  }
}



