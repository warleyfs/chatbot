import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { environment } from "../../environments/environment";
import { ConversationalResponse } from '../models/conversational-response';

@Injectable()
export class DialogflowService {

  private baseURL = 'https://api.dialogflow.com/v1/query?v=20170712';
  private token: string = environment.chatGPT.token;

  constructor(private http: HttpClient) { }

  public getResponse<ConversationalResponse>(query: string) {

    const data = {
      query: query,
      lang: 'pt-BR'
    };

    return new Observable(this.ConversationalResponseSubscriber);

    // return this.http
    //   .post(`${this.baseURL}`, data, { headers: this.getHeaders() });
  }

  public getHeaders() {
    const headers = new HttpHeaders();
    headers.append('Authorization', `Bearer ${this.token}`);
    headers.append('Content-Type', 'application/json; charset=UTF-8');
    return headers;
  }

  private ConversationalResponseSubscriber(observer: Observer<ConversationalResponse>) {
    
    observer.next(new ConversationalResponse());
    observer.complete();
  
    return {unsubscribe() {}};
  }
  
}
