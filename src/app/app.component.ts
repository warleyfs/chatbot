import { Component } from '@angular/core';
import { ChatGPTService } from './services/chatgpt.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ChatGPTService]
})
export class AppComponent {
  title = 'chatbot';
  messages: any[] = [];

  constructor(protected chatGPTService: ChatGPTService) {
    this.messages.push({
      text: 'Olá, sou o agente do Itaú! Como posso ajudar?',
      date: new Date(),
      reply: true,
      type: 'text',
      files: null,
      user: {
        name: 'Jonh Doe',
        avatar: 'https://i.gifer.com/no.gif',
      },
    });
  }

  sendMessage(event: any) {
    const files = !event.files ? [] : event.files.map((file: File) => {
      return {
        url: file.webkitRelativePath,
        type: file.type,
        icon: 'file-text-outline',
      };
    });

    this.messages.push({
      text: event.message,
      date: new Date(),
      reply: true,
      type: files.length ? 'file' : 'text',
      files: files,
      user: {
        name: 'Jonh Doe',
        avatar: 'https://i.gifer.com/no.gif',
      },
    });

    const botReply = this.chatGPTService.getResponse(event.message, '', '')
    
    if (botReply) {
      setTimeout(() => { this.messages.push(botReply) }, 500);
    }
  }
}
