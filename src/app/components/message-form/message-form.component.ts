import { Component, OnInit, Input } from '@angular/core';
import { Content } from '../../models/content';
import { Message } from './../../models';
import { Button } from '../../models/button';
import { ConversationalResponse } from 'src/app/models/conversational-response';
import { environment } from "../../../environments/environment";

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
    let initContentTemplate = new Array<Content>();
    initContentTemplate.push(new Content('simple_text', 'Que bom ter você aqui!', undefined, undefined, undefined, undefined));
    initContentTemplate.push(new Content('simple_text', 'Eu sou o Júlio, seu assistente virtual.', undefined, undefined, undefined, undefined));
    initContentTemplate.push(new Content('simple_text', `Agora, vamos dar continuidade no seu processo de contratação? Analisando aqui, 
    vi que precisamos atualizar seu cadastro, Poderia por favor me informar o seu nome completo? Ah, pode ficar tranquilo, não compartilho seus dados 
    com ninguém sua autorização, ok? Eu prometo!`, undefined, undefined, undefined, undefined));

    let initMessageTemplate = new Message('../../../assets/julio-avatar.png', new Date(), initContentTemplate, true);

    this.messages.push(initMessageTemplate);
  }

  public sendMessage(userMessageText: Message | undefined): void {
    
    console.log(userMessageText);
    // Envia a mensagem do usuário para a janela de chat.
    if (userMessageText) {
      this.messages.push(userMessageText);
    } else {
      this.messages.push(new Message('../../../assets/user-avatar.png', new Date(), new Array<Content>(new Content('simple_text', this.userMessage, undefined, undefined, undefined, undefined)), false));
    }

    console.log(userMessageText);
    console.log(this.userMessage);
    // Envia a(s) respostas do bot para a janela de chat
    let responses = this.getResponseByUserMessage(this.userMessage)     
    let messagesToSend = new Message('../../../assets/julio-avatar.png', new Date(), new Array<Content>(), true);
    console.log(responses);
    responses.then(resp=> resp.forEach(response => {
      switch (response.type) {
        case 0: // Simple Text
          {
            messagesToSend.content!.push(new Content('simple_text', response.speech, undefined, undefined, undefined, undefined));
            break;
          }
        case 1: // Action Buttons
          {            
            const text = response.speech;
            const buttons = new Array<Button>();
  
            response.buttons.forEach(button => {
              buttons.push(new Button(button.title, '', button.action));
            });
  
            const action_buttons = new Content('action_buttons', text, '', '', '', buttons);
  
            messagesToSend.content!.push(action_buttons);
            break;
          }
        case 2: // To You Know Card
          {
            const title = response.title;
            const text = response.speech;
            const buttons = new Array<Button>();
            const card = new Content('to_you_know', text, title, '', '', buttons);
  
            messagesToSend.content!.push(card);
            break;
          }
        default:
          {
            messagesToSend.content!.push(new Content('simple_text', 'Desculpe, não entendi. Poderia repetir?', undefined, undefined, undefined, undefined));
          }
      }
    }));

    this.messages.push(messagesToSend);
    this.userMessage = '';
  }

  public getFormattedUrl(url: string): string {

    if (url.indexOf('http') === -1 && url.indexOf('https') === -1) {
      url = `http://${url}`;
    }

    return url;
  }

  private async getJSON(mensagem: string) {
    const baseURL = environment.chatGPT.endpoint;
    const token = environment.chatGPT.token;
    
    return fetch(`${baseURL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(          
          {
              "messages": [            
              {"role": "user", "content": mensagem}
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

  private async caller(mensagem: string): Promise<string> {
    const json = await this.getJSON(mensagem);  
    return json.choices[0].message.content;
  }

  private async getResponseByUserMessage(userMessage: string) : Promise<Array<ConversationalResponse>> {
    
    let response = new Array<ConversationalResponse>();
    
    switch (userMessage) {
      case 'Eduarda Costa Leal':
        let msg1 = new ConversationalResponse();
        msg1.type = 0;
        msg1.speech = 'E como prefere ser chamada?';

        response.push(msg1);
        break;
      case 'Duda':
        let msg2 = new ConversationalResponse();
        msg2.type = 0;
        msg2.speech = `Legal, Duda! Agora, preciso do seu telefone para contato com o DDD. Digite por favor sem caracteres especiais, tudo junto. Por exemplo: 3199457848.`;

        response.push(msg2);
        break;
      case '31983174822':
        let msg3 = new ConversationalResponse();
        msg3.type = 0;
        msg3.speech = `Ótimo! Agora, vou precisar do número da sua agência e conta com dígido. Exemplo: Ag xxxx C xxxxx-x.`;
        
        response.push(msg3);
        break;
      case 'Ag 1234 C 12345-0':
        let msg4 = new ConversationalResponse();
        msg4.type = 0;
        msg4.speech = `Perfeito, Duda. Agora vou precisar de uma autorização sua.`;

        response.push(msg4);
      
        let msg5 = new ConversationalResponse();

        const buttons = new Array<Button>();
        buttons.push(new Button('Sim', '', () => { this.userMessage = 'Sim'; this.sendMessage(new Message('../../../assets/user-avatar.png', new Date(), new Array<Content>(new Content('simple_text', 'Sim', undefined, undefined, undefined, undefined)), false)); }));
        buttons.push(new Button('Não', '', () => { this.userMessage = 'Não'; this.sendMessage(new Message('../../../assets/user-avatar.png', new Date(), new Array<Content>(new Content('simple_text', 'Não', undefined, undefined, undefined, undefined)), false)); }));
        
        msg5.speech = `Você autoriza o débito do valor total ou parcial da(s) parcela(s) em sua conta corrente acima indicadas, 
        na data do vencimento ou após, podendo ser utilizado o limite do cheque especial, se contratado, evitando 
        atrasos nos pagamentos?`;
        msg5.type = 1;
        msg5.buttons = buttons;

        response.push(msg5);
        break;
      case 'Sim':
        let msg6 = new ConversationalResponse();
        msg6.type = 0;
        msg6.speech = `Ok. Entendi. Vamos continuar... Agora vamos falar dos custos. Para esse crédito você precisa escolher se deseja incorporar o IOF no financiamento ou não.`;

        response.push(msg6);

        let cardIOF = new ConversationalResponse();
        cardIOF.type = 2;
        cardIOF.title = 'Pra você saber';
        cardIOF.speech = `IOF é o imposto sobre operações financeiras, é uma arrecadação do Governo.
        A alíquota é aplicada sobre o valor financiado, para essa proposta o valor chega aproximadamente 3%.
        Ao incorporar, esse valor é adicionado ao valor financiamento, caso opte em não financiar o valor será 
        descontado do montante a ser creditado no ato a liberação de recurso.`;

        response.push(cardIOF);

        break;
      // case ``:
      //   let msg7 = new ConversationalResponse();
      //   msg7.type = 0;
      //   msg7.speech = ``;

      //   response.push(msg7);
      //   break;
      // case 'Mostre-me um card.':
      //   const buttons = new Array<Button>();
      //   buttons.push(new Button('Botão 1', 'https://www.google.com'));
      //   buttons.push(new Button('Botão 2', 'https://www.google.com'));
        
      //   response.speech = 'Texto para o card';
      //   response.subtitle = 'Subtítulo do card';
      //   response.title = 'Título do card';
      //   response.imageUrl = 'https://www.mactip.net/wp-content/uploads/2016/11/macbook-battery-charge-286x180.jpg';
      //   response.type = 1;
      //   response.buttons = buttons;

      //   break;
      case `Vi que você avançou para a próxima etapa.`:
        let msg8 = new ConversationalResponse();

        const buttons8 = new Array<Button>();
        buttons8.push(new Button('O que é o crédito com garantia de imóveis?', '', () => { this.userMessage = 'O que é o crédito com garantia de imóveis?'; this.sendMessage(new Message('../../../assets/user-avatar.png', new Date(), new Array<Content>(new Content('simple_text', 'O que é o crédito com garantia de imóveis?', undefined, undefined, undefined, undefined)), false)); }));
        buttons8.push(new Button('Quais as taxas envolvidas neste produto?', '', () => { this.userMessage = ''; this.sendMessage(new Message('../../../assets/user-avatar.png', new Date(), new Array<Content>(new Content('simple_text', 'Quais as taxas envolvidas neste produto?', undefined, undefined, undefined, undefined)), false)); }));
        buttons8.push(new Button('Quanto tempo leva para acontecer o crédito na conta?', '', () => { this.userMessage = ''; this.sendMessage(new Message('../../../assets/user-avatar.png', new Date(), new Array<Content>(new Content('simple_text', 'Quanto tempo leva para acontecer o crédito na conta?', undefined, undefined, undefined, undefined)), false)); }));
        buttons8.push(new Button('Posso amortizar as parcelas posteriormente?', '', () => { this.userMessage = ''; this.sendMessage(new Message('../../../assets/user-avatar.png', new Date(), new Array<Content>(new Content('simple_text', 'Posso amortizar as parcelas posteriormente?', undefined, undefined, undefined, undefined)), false)); }));
        buttons8.push(new Button('O que é IOF?', '', () => { this.userMessage = 'O que é IOF?'; this.sendMessage(new Message('../../../assets/user-avatar.png', new Date(), new Array<Content>(new Content('simple_text', 'O que é IOF?', undefined, undefined, undefined, undefined)), false)); }));
        buttons8.push(new Button('Como fica o valor do IOF caso eu queira incorporar no CGI?', '', () => { this.userMessage = 'Como fica o valor do IOF caso eu queira incorporar no CGI?'; this.sendMessage(new Message('../../../assets/user-avatar.png', new Date(), new Array<Content>(new Content('simple_text', 'Não', undefined, undefined, undefined, undefined)), false)); }));

        msg8.speech = `Estou aqui para ajudar no que precisar certo? Aliás, segue alguns tópicos que são dúvidas comuns dos nossos clientes nessa etapa! Você pode usar essas dicas, ou se preferir me perguntar diretamente!`;
        msg8.type = 1;
        msg8.buttons = buttons8;

        response.push(msg8);
        break;
      case `O que é o crédito com garantia de imóveis?`:
        let msg9 = new ConversationalResponse();
        msg9.type = 0;
        msg9.speech = `O Crédito com Garantia de Imóvel Itaú te ajuda a colocar seus planos em prática. Use o empréstimo como quiser, conte com taxa fixa e tenha até 20 anos para pagar.`;

        response.push(msg9);
        break;
      default:
        if(userMessage.includes("ITBI") || userMessage.includes("Imposto")){
          let msgFallback = new ConversationalResponse();
          var value =  await this.caller(userMessage)        
          msgFallback.type = 0;
          msgFallback.speech = value
          response.push(msgFallback);
        }
        else{
          let msgFallback = new ConversationalResponse();
          msgFallback.type = 0;
          msgFallback.speech  = 'Desculpe Duda, não entendi, poderia repetir?';
          response.push(msgFallback);
        }
    }
    
    return response;
  }
}
