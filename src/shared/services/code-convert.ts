import i18n from "@/i18n";
import { StandardCodeData } from "../types/standard-code";

export class ConvertCode {
    /**
     * Converts a code to its corresponding string value, with support for i18n translation.
     * @param list - The list of code-value mappings.
     * @param code - The code to translate.
     * @param prefix - The i18n key prefix for translation (e.g., 'statusCode').
     * @returns The translated string or 'Unknown' if not found.
     */
    public codeToString(list: any[], code: string, prefix?: string): string {
        if (list && list.length > 0) {
            const item = list.find((item) => code === item.codeValue)
            if (item) {
                if(prefix !== undefined){
                    return i18n.global.t(`commonCode.${prefix}.${item.codeValue}`, item.codeValueDesc)
                }else{
                    return item.codeValueDesc
                }
            }
            return 'Unknown';
        }
        return code
    }

    public codeToStringList(list: any[], prefix?: string): StandardCodeData[] {
        const _list= [] as StandardCodeData[]
        if (list && list.length > 0) {
            list.forEach(item =>{
                let data:StandardCodeData = {
                    codeValue: '',
                    codeValueDesc: 'Unknown'
                }
                data.codeValue = item.codeValue
                if(prefix !== undefined){
                    data.codeValueDesc = i18n.global.t(`commonCode.${prefix}.${item.codeValue}`, item.codeValueDesc)
                }else{
                    data.codeValueDesc = item.codeValueDesc
                }
                _list.push(data)
            })
        }
        return _list
    }
}