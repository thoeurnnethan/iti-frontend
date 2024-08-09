
import axios, { AxiosRequestConfig } from 'axios';
import { RequestErrorHandlingService } from './RequestErrorHandlingService';
import Utils from '../util';

const util = new Utils();

export class RequestService {
    baseUrl = import.meta.env.VITE_APP_SERVER_URL;
    private defaultHeaders: any;

    constructor() {
        this.defaultHeaders = {
            'Content-Type': 'application/json',
        };
    }

    public async request(apiPath: string, requestBody: any, isShowMessage = true): Promise<any> {
        const userInfo = util.getDataStorage('userInfo', true)
        const fullReqBody = {
            header: {
                error_code: "",
                error_text: "",
                login_session_id: userInfo.username,
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

