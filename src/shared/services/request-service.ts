
import axios, { AxiosRequestConfig } from 'axios';
import { RequestErrorHandlingService } from './RequestErrorHandlingService';

export class RequestService {
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

