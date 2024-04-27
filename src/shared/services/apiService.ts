
import axios, { AxiosRequestConfig } from 'axios';

export class ApiService {
    // private baseURL: string;
    private defaultHeaders: any;

    constructor() {
        // this.baseURL = baseURL;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
            // Add any other default headers here
        };
    }

    public async request(baseURL: string,apiPath: string, requestBody: any): Promise<any> {
        const fullReqBody = {
            META: {
                header: {
                    error_code: "",
                    error_text: "",
                    id_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySUQiOiJuZXRoYW4iLCJwYXNzd29yZCI6Ijk5N2Q1OTg3ZTdlMGU4MGYxNjZmMTBlMDI4OGEwNDdmMGMyZjAwMTNkNWMxZTNhNzM3ZDgzNWQwNzJkNDEyOTk1ZWUxZGQyNDJjMzk2NTJhNTYzODg1NjA1Y2Q4ZGZiMjhiYWFiYzJjMmQ2ZmM4MmVlMDdkM2I5MjczMGViZTMwIiwic3ViIjoibmV0aGFuIiwiZXhwIjoxNzEzODU0OTkxLCJpYXQiOjE3MTM4NTQ4MTF9.3AFheC-MVx89gEZnwVmZVdsVyo4ff6S6brLvghro0sI",
                    info_text: "",
                    result: true
                },
                body: requestBody
            }
        }


        const url = `${baseURL}/${apiPath}`;
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

