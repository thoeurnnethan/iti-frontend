export type DateFormats =
    | 'hhmm' // hh:mm
    | 'hhmmss' // hh:mm:ss
    | 'hhmmssSSS' // hh:mm:ss.SSS
    | 'yyyymmdd' // yyyy:mm:dd
    | 'yyyy-mm-dd' // yyyy-mm-dd
    | 'yyyymmddhhmm' // yyyy:mm:dd: hhmm
    | 'yyyymmddhhmmss' // yyyymmddhhmmss
    | 'yyyymmddhhmmssSSS' // yyyymmdd hhmmss sss
    | 'yyyy.mm.dd';
export type Months =
    | '01'
    | '02'
    | '03'
    | '04'
    | '05'
    | '06'
    | '07'
    | '08'
    | '09'
    | '10'
    | '11'
    | '12';

export type MonthSign = 'long' | 'short';
export type formatDateTime = 'Time' | 'Date' | 'DateTime';
export type FormatList = 'Minize' | 'Slash' | 'Dot';
export type FormatStyle = 'FullMonth' | 'Number' | 'ShortMonth';
export type currencyCode = 'USD' | 'KHR' | 'KRW' | 'VND' | 'EUR' | 'THB' | 'JPY' | 'CNY' | 'SGD';

export type ColumnType = 'date' | 'USD' | 'KHR';

export type toastType = 'danger' | 'success' | 'info' | 'warning';

export type roleType =
    | 'Viewer'
    | 'Maker'
    | 'Checker'
    | 'Authorizer'
    | 'FinalAuthorizer'
    | 'Both'
    | 'STP'
    | 'Admin';
