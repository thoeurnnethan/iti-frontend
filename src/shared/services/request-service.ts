
import axios, { AxiosRequestConfig } from 'axios';
import { RequestErrorHandlingService } from './RequestErrorHandlingService';
import { API_PATH } from '../common/api-path';
import { CLASS_LIST } from '../types/class-list';

export class RequestService {
static request(DEPARTMENT_REGISTER: API_PATH, reqBody: CLASS_LIST, arg2: boolean): any {
throw new Error('Method not implemented.');
}
    baseUrl = import.meta.env.VITE_APP_SERVER_URL;
    private defaultHeaders: any;

    constructor() {
        this.defaultHeaders = {
            'Content-Type': 'application/json',
        };
    }

    public async request(apiPath: string, requestBody: any, isShowMessage = true): Promise<any> {
        const fullReqBody = {
            header: {
                error_code: "",
                error_text: "",
                id_token: "",
                info_text: "",
                result: false
            },
            body: requestBody
        }

        const url = `${this.baseUrl}/${apiPath}`;
        const config: AxiosRequestConfig = {
            headers: this.defaultHeaders,
        };
        try {
            const res = await axios.post(url, fullReqBody, config);
            if(isShowMessage) RequestErrorHandlingService.requestErrorHandler(res)
            return res.data;
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }
}

