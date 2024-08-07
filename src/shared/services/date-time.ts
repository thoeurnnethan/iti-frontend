import type {
    DateFormats,
    MonthSign,
    formatDateTime,
    FormatList,
    FormatStyle,
  } from "../types/common.type";
  
  export class DateFormat {
    //FormatDateTime (value:string = date,mode:DateFormats = Date format form Ex:yyyymmdd, format:FormatList = format style Ex: yyyy/mm/dd or yyyy-mm-dd,style:FormtStyle= month format )
    public formatDateTime(
      date: string,
      mode: DateFormats,
      format?: FormatList,
      style?: FormatStyle
    ) {
      let result: string | undefined;
      if(date!= ''){
        switch (mode) {
          case "hhmm":
            result = this.getDateToString(date, "Time", format, style, mode);
            break;
          case "hhmmss":
            result = this.getDateToString(date, "Time", format, style, mode);
            break;
          case "yyyymmdd":
            result = this.getDateToString(date, "Date", format, style, mode);
            break;
          case "yyyymmddhhmm":
            result = this.getDateToString(date, "DateTime", format, style, mode);
            break;
          case "yyyymmddhhmmss":
            result = this.getDateToString(date, "DateTime", format, style, mode);
            break;
          case "yyyymmddhhmmssSSS":
            result = this.getDateToString(date, "DateTime", format, style, mode);
            break;
          case "yyyy-mm-dd":
            result = this.getDateToString(date, "Date", format, style, mode);
            break;
          case "yyyy.mm.dd":
            result = this.getDateToString(date, "Date", format, style, mode);
            break;
          default:
            console.log("error");
            break;
        }
      }else{
        result=""
      }
    
      return result;
    }
    //GetMonth (value:string = date,type:MonthSign = convert month to String)
    public getMonth(value: number, type?: MonthSign): string {
        const date = new Date();
      date.setMonth(value - 1);
      return date.toLocaleString([], { month: type ? type : "short" });
    }
    //getDateToString (value:string = date,type:'Time | Date| DateTime',mode:DateFormats = Date format form Ex:yyyymmdd,format:FormatList = format style Ex: yyyy/mm/dd or yyyy-mm-dd,style:FormtStyle= month format)
    public getDateToString(
      date: string,
      type: formatDateTime,
      format?: FormatList,
      style?: FormatStyle,
      mode?: DateFormats
    ): string | undefined {
        const resultObject = this.getObjectOfDate(date);
      let result: string;
      let month: string;
      if (style == "FullMonth") {
        //Format Ex: 2023/Jan/12 or 2023-Jan-12
        month = this.getMonth(parseInt(resultObject.month), "short");
      } else if (style === "ShortMonth") {
        //Format Ex: 2023/January/12 or 2023-January-12
        month = this.getMonth(parseInt(resultObject.month), "long");
      } else {
        //Only Number Date
        month = resultObject.month;
      }
      if (type === "Date") {
        if (mode == "yyyymmdd") {
          if (format === "Minize") {
            result = `${resultObject.year}-${month}-${resultObject.day}`;
          } else {
            result = `${resultObject.year}/${month}/${resultObject.day}`;
          }
        } else if (mode == "yyyy-mm-dd") {
          result = `${resultObject.year}-${month}-${resultObject.day}`;
        } else if (mode === "yyyy.mm.dd") {
          result = `${resultObject.year}.${month}.${resultObject.day}`;
        } else {
          return "";
        }
        return result;
      } else if (type === "Time") {
        if (mode === "hhmm") {
          result = `${resultObject.hour}:${resultObject.min}`;
        } else if (mode === "hhmmss") {
          result = `${resultObject.hour}:${resultObject.min}:${resultObject.second}`;
        } else {
          result = `${resultObject.hour}:${resultObject.min}:${resultObject.second}:${resultObject.mil}`;
        }
        return result;
      } else {
        if (mode === "yyyymmddhhmm") {
          if (format === "Minize") {
            result = `${resultObject.year}-${month}-${resultObject.day} T${resultObject.hour}-${resultObject.min}`;
          } else {
            result = `${resultObject.year}/${month}/${resultObject.day} T${resultObject.hour}:${resultObject.min}`;
          }
          return result;
        } else if (mode === "yyyymmddhhmmss") {
          if (format === "Minize") {
            result = `${resultObject.year}-${month}-${resultObject.day} T${resultObject.hour}-${resultObject.min}-${resultObject.second}`;
          } else {
            result = `${resultObject.year}/${month}/${resultObject.day} T${resultObject.hour}:${resultObject.min}:${resultObject.second}`;
          }
          return result;
        } else if (mode === "yyyymmddhhmmssSSS") {
          if (format === "Minize") {
            result = `${resultObject.year}-${month}-${resultObject.day} T${resultObject.hour}-${resultObject.min}-${resultObject.second}-${resultObject.mil}`;
          } else {
            result = `${resultObject.year}/${month}/${resultObject.day} T${resultObject.hour}:${resultObject.min}:${resultObject.second}:${resultObject.mil}`;
          }
          return result;
        }
      }
    }
    //covertMonthToNumber (value:string = date, Covert string of month to number)
    public covertMonthToNumber(value: string) {
      return new Date(`${value} 1, 2022`).getMonth() + 1;
    }
    //getObjectOfDate (value:string = date,Covert date to object of date(month,year,day,hour,min,second,milsecond))
    public getObjectOfDate(date: string, formated?: boolean) {
      let fullDate = date;
      let result;
      if (formated) {
        fullDate = this.unFormatValue(date);
      }
      if (fullDate.length == 17) {
        result = fullDate
          .replace(
            /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{3})/,
            "$1-$2-$3-$4-$5-$6-$7"
          )
          .split("-");
      } else if (fullDate.length == 8) {
        result = fullDate.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3").split("-");
      } else if (fullDate.length == 12) {
        result = fullDate
          .replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/, "$1-$2-$3-$4-$5")
          .split("-");
      } else if (fullDate.length == 14) {
        result = fullDate
          .replace(
            /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,
            "$1-$2-$3-$4-$5-$6"
          )
          .split("-");
      } else {
        result=' '
      }
  
      const resultObject = {
        year: result[0] ? result[0] : "",
        month: result[1] ? result[1] : "",
        day: result[2] ? result[2] : "",
        hour: result[3] ? result[3] : "",
        min: result[4] ? result[4] : "",
        second: result[5] ? result[5] : "",
        mil: result[6] ? result[6] : "",
      };
  
      return resultObject;
  
    }
    //UnformatValue (value:string = date)
    public unFormatValue(date: string): string {
        const result = date.replace(/\D/g, "");
      return result;
    }
    private checkValue(date: string): boolean {
      if (date.includes("/") || date.includes("-") || date.includes(".")) {
        return false;
      } else {
        return true;
      }
    }
    //Add Day (value:string = date,day:number = number of day)
    public addDay(value: string, day: number): string {
      let objectDate;
      if (this.checkValue(value)) {
        objectDate = this.getObjectOfDate(value);
      } else {
        objectDate = this.getObjectOfDate(value, true);
      }
      const formatDate = `${objectDate.year}/${objectDate.month}/${objectDate.day}`;
      const convertDate = new Date(formatDate);
      convertDate.setDate(convertDate.getDate() + day);
      const converted = convertDate.toDateString().split(" ");
      const returnDate = `${converted[3]}${
        this.covertMonthToNumber(converted[1]) <= 9
          ? `0${this.covertMonthToNumber(converted[1])}`
          : this.covertMonthToNumber(converted[1])
      }${converted[2]}${objectDate?.hour}${objectDate?.min}${objectDate?.second}${
        objectDate?.mil
      }`;
      return returnDate;
    }
    //Add Month (value:string = date,month:number = number of month)
    public addMonth(date: string, month: number): string {
      let objectDate;
      if (this.checkValue(date)) {
        objectDate = this.getObjectOfDate(date);
      } else {
        objectDate = this.getObjectOfDate(date, true);
      }
      const formatDate = `${objectDate.year}/${objectDate.month}/${objectDate.day}`;
      const convertDate = new Date(formatDate);
      convertDate.setMonth(convertDate.getMonth() + month);
      const converted = convertDate.toDateString().split(" ");
      const returnDate = `${converted[3]}${
        this.covertMonthToNumber(converted[1]) <= 9
          ? `0${this.covertMonthToNumber(converted[1])}`
          : this.covertMonthToNumber(converted[1])
      }${converted[2]}${objectDate?.hour}${objectDate?.min}${objectDate?.second}${
        objectDate?.mil
      }`;
  
      return returnDate;
    }
    //Add Week (value:string = date,Week:number = number of week)
    public addWeek(date: string, week: number): string {
      const convertToDay = week * 7;
      let objectDate;
      if (this.checkValue(date)) {
        objectDate = this.getObjectOfDate(date);
      } else {
        objectDate = this.getObjectOfDate(date, true);
      }
      const formatDate = `${objectDate.year}/${objectDate.month}/${objectDate.day}`;
      const convertDate = new Date(formatDate);
      convertDate.setDate(convertDate.getDate() + convertToDay);
      const converted = convertDate.toDateString().split(" ");
      const returnDate = `${converted[3]}${
        this.covertMonthToNumber(converted[1]) <= 9
          ? `0${this.covertMonthToNumber(converted[1])}`
          : this.covertMonthToNumber(converted[1])
      }${converted[2]}${objectDate?.hour}${objectDate?.min}${objectDate?.second}${
        objectDate?.mil
      }`;
      return returnDate;
    }
    public convertTo12HourFormat(time:string) {
      try {
        const hour = parseInt(time.slice(0, 2), 10);
        const minutes = time.slice(2);
        const suffix = hour >= 12 ? 'PM' : 'AM';
        const standardHour = hour % 12 || 12;
        return `${standardHour}:${minutes} ${suffix}`;
      } catch (error) {
        return time;
      }
    }
  }
  