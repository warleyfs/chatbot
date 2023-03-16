import { Component, OnInit, Input } from '@angular/core';
import { Content } from '../../models/content';
import { Message } from './../../models';
import { Button } from '../../models/button';
import { ConversationalResponse } from 'src/app/models/conversational-response';

@Component({
  selector: 'message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.scss']
})
export class MessageFormComponent implements OnInit {

  @Input('userMessage')
  public userMessage: string = '';

  @Input('messages')
  public messages: Message[] = new Array<Message>();

  constructor() { }

  ngOnInit() {
  }

  public sendMessage(userMessageText: Message | undefined): void {
    console.log(userMessageText)
    if (userMessageText) {
      this.messages.push(userMessageText);
    } else {
      this.messages.push(new Message('../../../assets/user-avatar.png', new Date(), new Array<Content>(new Content('simple_text', this.userMessage, undefined, undefined, undefined, undefined)), false));
    }

    const response = this.getResponseByUserMessage(this.userMessage) 
    const message = new Message('../../../assets/julio-avatar.png', new Date(), new Array<Content>(), true);

    switch (response.type) {
      case 0:
        {
          console.log(message)
          message.content!.push(new Content('simple_text', response.speech, undefined, undefined, undefined, undefined));
          break;
        }
      case 1: // Card
        {
          const title = response.title;
          const subtitle = response.subtitle;
          const text = response.speech;
          const imageUrl = response.imageUrl;
          const buttons = new Array<Button>();

          response.buttons.forEach(button => {
            buttons.push(new Button(button.title, button.url));
          });

          const card = new Content('basic_card', text, title, subtitle, imageUrl, buttons);

          message.content!.push(card);
          break;
        }
      default:
        {
          message.content!.push(new Content('simple_text', 'Desculpe, não entendi. Poderia repetir?', undefined, undefined, undefined, undefined));
        }
    }
    this.messages.push(message);
    this.userMessage = '';
  }

  public getFormattedUrl(url: string): string {

    if (url.indexOf('http') === -1 && url.indexOf('https') === -1) {
      url = `http://${url}`;
    }

    return url;
  }

  private getResponseByUserMessage(userMessage: string) : ConversationalResponse {
    
    let response = new ConversationalResponse();

    switch (userMessage) {
      case 'Mostre-me um texto simples.':
        response.type = 0;
        response.speech = 'Esta é a resposta em um texto simples.';
        break;
      case 'Mostre-me um card.':
        const buttons = new Array<Button>();
        buttons.push(new Button('Botão 1', 'https://www.google.com'));
        buttons.push(new Button('Botão 2', 'https://www.google.com'));
        
        response.speech = 'Texto para o card';
        response.subtitle = 'Subtítulo do card';
        response.title = 'Título do card';
        response.imageUrl = 'https://www.mactip.net/wp-content/uploads/2016/11/macbook-battery-charge-286x180.jpg';
        response.type = 1;
        response.buttons = buttons;

        break;
      default:
        response.type = 0;
        response.speech  = 'Não entendi, poderia repetir?';
    }
    
    return response;
  }
}