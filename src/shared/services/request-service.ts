
import axios, { AxiosRequestConfig } from 'axios';
import { RequestErrorHandlingService } from './RequestErrorHandlingService';
import Utils from '../util';
import { userLoginResData } from '../types/user-type';
import { DateFormat } from './date-time';
import router from '@/router';

const util = new Utils();
const dateTime = new DateFormat();

export class RequestService {
    baseUrl = import.meta.env.VITE_APP_SERVER_URL
    private defaultHeaders: any
    private userInfo = util.getDataStorage('userInfo', true) as userLoginResData
    private isAuthenticated = util.getDataStorage('isAuthenticated', true)

    constructor() {
        this.defaultHeaders = {
            'Content-Type': 'application/json',
        };
    }

    private getHeaders() {
        if(this.isAuthenticated && this.isAuthenticated === true) {
            const token = this.userInfo.token ? this.userInfo.token : ''
            this.defaultHeaders['Authorization'] = 'Bearer ' + token
        }
        return {
            ...this.defaultHeaders
        };
    }

    public async request(apiPath: string, requestBody: any, isShowMessage = false) {
        const fullReqBody = {
            header: {
                error_code: "",
                error_text: "",
                info_text: "",
                login_session_id: this.userInfo ? this.userInfo.token : '',
                created_datetime: dateTime.getDate(),
                result: false
            },
            body: requestBody
        }

        const url = `${this.baseUrl}/${apiPath}`;
        const config: AxiosRequestConfig = {
            headers: this.getHeaders()
        };
        try {
            const res = await axios.post(url, fullReqBody, config);
            if (res && res.data.header.result){
                if(isShowMessage) RequestErrorHandlingService.requestErrorHandler(res)
            } else {
                RequestErrorHandlingService.requestErrorHandlerOnlyError(res)
            }
            return res.data;
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }
}

