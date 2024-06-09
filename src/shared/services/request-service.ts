
import axios, { AxiosRequestConfig } from 'axios';

export class RequestService {
    baseUrl = import.meta.env.VITE_APP_SERVER_URL;
    private defaultHeaders: any;

    constructor() {
        // this.baseURL = baseURL;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
        };
    }

    public async request(apiPath: string, requestBody: any): Promise<any> {
        const fullReqBody = {
            META: {
                header: {
                    error_code: "",
                    error_text: "",
                    id_token: "",
                    info_text: "",
                    result: false
                },
                body: requestBody
            }
        }


        const url = `${this.baseUrl}/${apiPath}`;
        const config: AxiosRequestConfig = {
            headers: this.defaultHeaders,
        };
        try {
            const response = await axios.post(url, fullReqBody, config);
            return response.data;
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }
}

