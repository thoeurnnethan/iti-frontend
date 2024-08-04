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

export interface SCHEDULE_LIST_RES{
  body:{
    scheduleList: Array<SCHEDULE_LIST>
  }
}



