import { Component, ViewChild } from '@angular/core';
import { ChatGPTService } from './services/chatgpt.service';
import { NbSidebarService } from '@nebular/theme';
import { Message } from './models';
import { MessageFormComponent } from './components/message-form/message-form.component';
import { Content } from './models/content';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ChatGPTService]
})
export class AppComponent {
  showResume = false;
  currentStep = 1;
  step1Completed = this.currentStep >= 0;
  step2Completed = this.currentStep >= 1;
  step3Completed = this.currentStep >= 2;
  step4Completed = this.currentStep >= 3;
  step5Completed = this.currentStep >= 4;
  title = 'Assistente Virtual CGI';
  userMessage: string = '';
  messages: Message[] = new Array<Message>();
  //messages: any[] = [];
  resumeData: any[] = [
    { title: 'Nome', value: 'Eduarda Costa Leal' },
    { title: 'Telefone', value: '21918755561' },
    { title: 'CEP do imóvel', value: '25780-90' },
    { title: 'Agência e conta', value: 'Ag 0112 C 12345-6' },
    { title: 'Proprietário(s) representato(s) por procuração', value: 'Documento anexado' }
  ];
  botMessageTemplate = {
    text: '',
    date: new Date(),
    reply: true,
    type: 'text',
    files: null,
    user: {
      name: 'Júlio',
      avatar: '../assets/julio-avatar.png',
    }
  }

  @ViewChild(MessageFormComponent) chatForm: MessageFormComponent | undefined;

  constructor(protected chatGPTService: ChatGPTService, private sidebarService: NbSidebarService) {
    
    // let message1 = this.botMessageTemplate;
    // message1.text = 'Olá! Sou o Júlio! E tô aqui pra te ajudar!';
    // this.messages.push(message1);

    // let message2 = this.botMessageTemplate;
    // message2.text = 'Que bom ter você aqui!';
    // this.messages.push(message2);

    // let message3 = this.botMessageTemplate;
    // message3.text = 'Agora, preciso do seu nome completo';
    // this.messages.push(message3);
  }
  
  toggleResume() {
    this.showResume = !this.showResume;
  }

  getStepCompletionStatusClass(step: number) {
    if (step == this.currentStep)
      return 'stepper-label-current'
    else if (step < this.currentStep)
      return 'stepper-label-completed'
    else
      return 'stepper-label-todo'
  }

  toggle() {
    this.sidebarService.toggle(false, 'left');
  }

  public sendUserOptionMessage(simpleText: string) {
    this.chatForm!.userMessage = simpleText;
    this.chatForm!.sendMessage(new Message('assets/images/user.png', new Date(), new Array<Content>(new Content('simple_text', simpleText, undefined, undefined, undefined, undefined))));
  }

  // sendMessage(event: any) {
  //   const files = !event.files ? [] : event.files.map((file: File) => {
  //     return {
  //       url: file.webkitRelativePath,
  //       type: file.type,
  //       icon: 'file-text-outline',
  //     };
  //   });
  //   this.messages.push({
  //     text: event.message,
  //     date: new Date(),
  //     reply: true,
  //     type: files.length ? 'file' : 'text',
  //     files: files,
  //     user: {
  //       name: 'Jonh Doe',
  //       avatar: 'https://i.gifer.com/no.gif',
  //     },
  //   });
  //   const botReply = this.chatGPTService.getResponse(event.message, '', '')
  //   if (botReply) {
  //     setTimeout(() => { this.messages.push(botReply) }, 500);
  //   }
  // }
}
