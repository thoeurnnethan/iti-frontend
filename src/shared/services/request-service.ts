
import axios, { AxiosRequestConfig } from 'axios';
import { RequestErrorHandlingService } from './RequestErrorHandlingService';
import Utils from '../util';
import { userLoginResData } from '../types/user-type';

const util = new Utils();

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
        if(this.isAuthenticated) {
            this.defaultHeaders['Authorization'] = 'Bearer ' + this.userInfo.jwtToken
        }
        return {
            ...this.defaultHeaders
        };
    }

    public async request(apiPath: string, requestBody: any, isShowMessage = true, isShowErrorOnly = false): Promise<any> {
        const fullReqBody = {
            header: {
                error_code: "",
                error_text: "",
                info_text: "",
                login_session_id: this.userInfo ? this.userInfo.loginSessionID : '',
                created_datetime: new Date(new Date).toString(),
                result: false
            },
            body: requestBody
        }

        const url = `${this.baseUrl}/${apiPath}`;
        const config: AxiosRequestConfig = {
            headers: this.getHeaders(),
            withCredentials: true
        };
        try {
            const res = await axios.post(url, fullReqBody, config);
            if(isShowMessage) RequestErrorHandlingService.requestErrorHandler(res)
            if(isShowErrorOnly) RequestErrorHandlingService.requestErrorHandlerOnlyError(res)
            return res.data;
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }
}

