
export interface MenuItem {
  channelCategoryCode: string
  menuID: string
  menuName: string
  menuLevel: string
  screenID: string
  menuStatusCode: string
  parentMenuID: string
}

export interface COM10500111_REQ {
  userID: string
}

export interface COM10500111_RES {
  body : {
    grid01: MenuItem[]
    totalCount : number 
  }
}

