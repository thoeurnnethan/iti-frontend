
export interface SUBJECT_LIST {
    no?: number
    seqNo?: number
    classID?: string
    classInfoID?: string
    className?: string
    subjectID?: string
    subjectName: string
    subjectDesc?: string
    statusCode?: string
}

export interface SUBJECT_LIST_DOWNLOAD {
    classID: string
    classInfoID: string
    className: string
    year: string
    semester: string
    subjectID: string
    subjectName: string
    subjectDesc: string
    statusCode: string
}

export interface SUBJECT_LIST_REQ {
    classID: string
    classYear: string,
    semester: string,
    searchKey: string
}

export interface SUBJECT_LIST_RES {
    body: {
        totalCount: number
        subjectList: Array<SUBJECT_LIST_DOWNLOAD>
    }
}

