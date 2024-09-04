import { Header } from "./service-header"

export interface STUDENT_DETAIL {
    studentID: string
    firstName: string
    lastName: string
    nickName: string
    gender: string
    dateOfBirth: string
    placeOfBirth: string
    address: string
    phone: string
    email: string
    passwd: string
    imageUrl: string
}

export interface PARENT_LIST {
    seqNo: number
    firstName: string
    lastName: string
    gender: string
    job: string
    address: string
    phone: string
}

export interface ACADEMIC_LIST {
    seqNo: number
    academicName: string
    academicDesc: string
    startDate: string
    endDate: string
    certificatedDate: string
}

export interface STUDENT_DETAIL_REQ {
    userID: string
    studentID: string
}

export interface STUDENT_DETAIL_RES {
    header: Header
    body: {
        studentDetail: STUDENT_DETAIL
        parentList: PARENT_LIST[]
        academicList: ACADEMIC_LIST[]
    }
}

