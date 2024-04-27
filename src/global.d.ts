import axios from 'axios'
import { DateFormat } from './shared/services/date-time'

declare module 'vue' {
    interface ComponentCustomProperties {
        $http: typeof axios
        $translate: (key: string) => string
        $format: DateFormat
    }
}