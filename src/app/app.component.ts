import { Component, ViewChild } from '@angular/core';
import { ChatGPTService } from './services/chatgpt.service';
import { NbSidebarService } from '@nebular/theme';
import { Message } from './models';
import { MessageFormComponent } from './components/message-form/message-form.component';
import { Content } from './models/content';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ChatGPTService]
})
export class AppComponent {
  title = 'Assistente Virtual CGI';
  
  currentScreen: number = 1;
  screens: number[] = [1, 2, 3, 4];
  currentStep = 1;
  step1Completed = this.currentStep >= 0;
  step2Completed = this.currentStep >= 1;
  step3Completed = this.currentStep >= 2;
  step4Completed = this.currentStep >= 3;
  step5Completed = this.currentStep >= 4;
  step6Completed = this.currentStep >= 5;

  userMessage: string = '';
  messages: Message[] = new Array<Message>();
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
  
  checked = false;

  @ViewChild(MessageFormComponent) chatForm: MessageFormComponent | undefined;

  constructor(protected chatGPTService: ChatGPTService, private sidebarService: NbSidebarService) {
  }

  avancar() {
    if (this.currentScreen <= 4)
      this.currentScreen++;
    
      switch (this.currentScreen) {
        case 2:
          this.sendUserOptionMessage('No Itaú, o seu empréstimo pode ser mais facilitado!');
          break;
        case 3:
          this.sendUserOptionMessage('Confira o resumo da sua proposta e todos os dados que você preencheu.');
          break;
      }
  }

  voltar() {
    if (this.currentScreen >= 1)
      this.currentScreen--;

      switch (this.currentScreen) {
        case 1:
          //this.sendUserOptionMessage('');
          break;
        case 2:
          //this.sendUserOptionMessage('');
          break;
        case 3:
          //this.sendUserOptionMessage('');
          break;
      }
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
    this.chatForm!.sendMessage(new Message('../assets/julio-avatar.png', new Date(), new Array<Content>(new Content('simple_text', simpleText, undefined, undefined, undefined, undefined)), true));
  }
}
