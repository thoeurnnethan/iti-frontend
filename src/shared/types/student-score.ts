export interface SCORE_LIST{
    studentID: string
    firstName: string
    lastName: string
    gender: string
    phoneNumber: string
}


export interface SCORE_LIST_RES{
    body:{
        subjects: any
        data: Array<SCORE_LIST>
    }
}