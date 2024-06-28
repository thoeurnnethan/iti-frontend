import axios from 'axios'
import { DateFormat } from './shared/services/date-time'
import PopupService from './shared/services/popup.service';
import { ConvertCode } from './shared/services/code-convert';
import Utils from './shared/util';

declare module 'vue' {
    interface ComponentCustomProperties {
        $http: typeof axios
        $translate: (key: string) => string
        $format: DateFormat
        $popupService: PopupService;
        $codeConverter: ConvertCode;
        $util: Utils;
    }
}