import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpHeaders } from '@angular/common/http';
import { LexRuntimeV2Client, StartConversationCommand, StartConversationCommandInput } from "@aws-sdk/client-lex-runtime-v2";

@Injectable()
export class AmazonLexService {
    private baseURL = environment.chatGPT.endpoint;
    private token: string = environment.chatGPT.token;
    private client: LexRuntimeV2Client = new LexRuntimeV2Client({ 
      region: "us-east-1",
       
    });

    constructor() { }

    public async getResponse(query: string) {
      const input: StartConversationCommandInput = {
        botId: "STRING_VALUE", // required
        botAliasId: "STRING_VALUE", // required
        localeId: "STRING_VALUE", // required
        sessionId: "STRING_VALUE", // required
        requestEventStream: undefined
      }
      const command = new StartConversationCommand(input);

      return this.client.send(command).then(
        (data) => {
            return data;
        },
        (error) => {
          console.error(error);
        }
      );
    }

    public getHeaders() {
        const headers = new HttpHeaders();
        headers.append('Authorization', `Bearer ${this.token}`);
        headers.append('Content-Type', 'application/json; charset=UTF-8');
        return headers;
    }
}