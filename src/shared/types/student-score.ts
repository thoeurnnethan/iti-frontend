export interface SCORE_LIST{
    no?: number
    studentID: string
    firstName: string
    lastName: string
    gender: string
    phoneNumber: string
    totalScore: number,
    average: number,
    grade: number
}

export interface Subject {
    subjectID: string
    subjectName: string
}


export interface SCORE_LIST_RES{
    body:{
        subjects: any
        data: Array<SCORE_LIST>
    }
}