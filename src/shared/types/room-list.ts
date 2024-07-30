export interface ROOM_LIST {
    roomID: string
    roomName: string 
    floor: number 
    roomDesc: string 
    building: string
    statusCode: string 
}

export interface ROOM_LIST_REQ {
    roomID?: string
    searchKey: string
    pageNumber: number
    pageSize: number
}

export interface ROOM_LIST_RES {
    body : {
        totalCount: number
        roomList: ROOM_LIST[]
    }
}