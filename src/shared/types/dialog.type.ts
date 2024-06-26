interface Dialog {
    title?: string
    content?: any 
    btnLabel?: string
    showCancel?: boolean,
    cancelLabel? :string
    callback: (props?: any) => void
    onDidDismiss? : (props?: any) => void,
    onSetTimeout? : number
}

interface InputDialog {
    title?: string
    content?: any 
    note?: any 
    placeholder?: any 
    btnLabel?: string
    showCancel?: boolean,
    cancelLabel? :string
    callback: (props?: any) => void
}


export type { Dialog, InputDialog };