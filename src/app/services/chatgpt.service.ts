import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable()
export class ChatGPTService {
    private baseURL = environment.chatGPT.endpoint;
    private token: string = environment.chatGPT.token;;

    constructor(private http: HttpClient) { }

    public getResponse(query: string, userId: string, agent: string) {

        switch (agent) {
            case 'chatbot':
                {
                    this.token = environment.chatGPT.token;
                    break;
                }
        }

        // const sessionId = crypto.AES.encrypt(userName, this.token);

        const data = {
            query: query,
            lang: 'pt-BR',
            sessionId: userId
        };

        return this.http
            .post(`${this.baseURL}`, data, { headers: this.getHeaders() })
            .pipe(res => {
                return res;
            });
    }

    public getHeaders() {
        const headers = new HttpHeaders();
        headers.append('Authorization', `Bearer ${this.token}`);
        headers.append('Content-Type', 'application/json; charset=UTF-8');
        return headers;
    }
}