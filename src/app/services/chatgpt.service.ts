import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class ChatGPTService {
    private baseURL = environment.chatGPT.endpoint;
    private token: string = environment.chatGPT.token;;

    constructor() { }

    public async getResponse(query: string) {

        return fetch(`${this.baseURL}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.token}`
                },
                body: JSON.stringify(
                    {
                        "messages": [
                            { "role": "user", "content": query }
                        ],
                        "model": "gpt-3.5-turbo",
                        "temperature": 0.7,
                        "max_tokens": 60
                    }
                )
            })
            .then(response => response.json())
            .then(data => {
                return data
            })
            .catch(error => console.log(error));
    }

    public getHeaders() {
        const headers = new HttpHeaders();
        headers.append('Authorization', `Bearer ${this.token}`);
        headers.append('Content-Type', 'application/json; charset=UTF-8');
        return headers;
    }
}