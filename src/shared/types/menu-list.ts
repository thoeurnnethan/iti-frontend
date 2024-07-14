
export interface MenuItem {
  path: string
  iconClass: string
  name: string
  open?: boolean
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

export interface FormItem {
  type: string
  name: string
  label: string
}