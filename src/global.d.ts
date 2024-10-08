import axios from 'axios'
import { DateFormat } from './shared/services/date-time'
import PopupService from './shared/services/popup.service';
import { ConvertCode } from './shared/services/code-convert';
import Utils from './shared/util';
import { PhoneNumberFormat } from './shared/services/phone-number';
import { TranslateCodeUtil } from './shared/services/translate-code-list';

declare module 'vue' {
    interface ComponentCustomProperties {
        $http: typeof axios
        $translate: (key: string) => string
        $format: DateFormat
        $popupService: PopupService;
        $codeConverter: ConvertCode;
        $phoneNumberFormater: PhoneNumberFormat;
        $util: Utils;
        $codeUtil: TranslateCodeUtil;
    }
}