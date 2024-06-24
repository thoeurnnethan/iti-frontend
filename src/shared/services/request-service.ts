
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
            const response = await axios.post(url, fullReqBody, config);
            if(!response.data.header.result){
                console.log(response.data.header.error_code)
                console.log(response.data.header.error_text)
            }
            return response.data;
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }
}

