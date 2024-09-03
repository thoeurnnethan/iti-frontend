import i18n from "@/i18n";

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
}