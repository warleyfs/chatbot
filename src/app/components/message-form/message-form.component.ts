import { Component, OnInit, Input, Inject } from '@angular/core';
import { Content } from '../../models/content';
import { Message } from './../../models';
import { Button } from '../../models/button';
import { ConversationalResponse } from 'src/app/models/conversational-response';
import { environment } from "../../../environments/environment";
import { ChatGPTService } from 'src/app/services/chatgpt.service';

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

  constructor(private chatGPTService: ChatGPTService) { }

  ngOnInit() {
    let initContentTemplate = new Array<Content>();
    initContentTemplate.push(new Content('simple_text', 'Que bom ter você aqui!', undefined, undefined, undefined, undefined));
    initContentTemplate.push(new Content('simple_text', 'Vi que você tem interesse no crédito com garantia de imóvel.', undefined, undefined, undefined, undefined));
    initContentTemplate.push(new Content('simple_text', 'Meu trabalho é te ajudar com o que você precisar!', undefined, undefined, undefined, undefined));

    const btnDoubts = new Array<Button>();
    btnDoubts.push(new Button('análise de crédito', '', () => { this.userMessage = 'análise de crédito'; this.sendMessage(new Message('../../../assets/user-avatar.png', new Date(), new Array<Content>(new Content('simple_text', 'análise de crédito', undefined, undefined, undefined, undefined)), false)); }));
    btnDoubts.push(new Button('custos em geral', '', () => { this.userMessage = 'custos em geral'; this.sendMessage(new Message('../../../assets/user-avatar.png', new Date(), new Array<Content>(new Content('simple_text', 'custos em geral', undefined, undefined, undefined, undefined)), false)); }));
    btnDoubts.push(new Button('avaliação do imóvel e documentação', '', () => { this.userMessage = 'avaliação do imóvel e documentação'; this.sendMessage(new Message('../../../assets/user-avatar.png', new Date(), new Array<Content>(new Content('simple_text', 'avaliação do imóvel e documentação', undefined, undefined, undefined, undefined)), false)); }));
    btnDoubts.push(new Button('documentos necessários', '', () => { this.userMessage = 'documentos necessários'; this.sendMessage(new Message('../../../assets/user-avatar.png', new Date(), new Array<Content>(new Content('simple_text', 'documentos necessários', undefined, undefined, undefined, undefined)), false)); }));
    btnDoubts.push(new Button('prazo das etapas', '', () => { this.userMessage = 'prazo das etapas'; this.sendMessage(new Message('../../../assets/user-avatar.png', new Date(), new Array<Content>(new Content('simple_text', 'prazo das etapas', undefined, undefined, undefined, undefined)), false)); }));
    btnDoubts.push(new Button('liberação de crédito', '', () => { this.userMessage = 'liberação de crédito'; this.sendMessage(new Message('../../../assets/user-avatar.png', new Date(), new Array<Content>(new Content('simple_text', 'liberação de crédito', undefined, undefined, undefined, undefined)), false)); }));

    const text = `Vou deixar aqui embaixo algumas possíveis dúvidas, precisando, é só clicar nelas.`;
    const buttons = new Array<Button>();

    btnDoubts.forEach(button => {
      buttons.push(new Button(button.title, '', button.action));
    });

    initContentTemplate.push(new Content('action_buttons', text, undefined, undefined, undefined, buttons));
    initContentTemplate.push(new Content('simple_text', 'Você também pode me fazer qualquer pergunta ou pedir para falar com um consultor.', undefined, undefined, undefined, undefined));

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

    // Envia a(s) respostas do bot para a janela de chat
    let responses = this.getResponseByUserMessage(this.userMessage)     
    let messagesToSend = new Message('../../../assets/julio-avatar.png', new Date(), new Array<Content>(), true);

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

  private async getResponseByUserMessage(userMessage: string) : Promise<Array<ConversationalResponse>> {
    
    let response = new Array<ConversationalResponse>();
    
    switch (userMessage) {
      case 'No Itaú, o seu empréstimo pode ser mais facilitado!':
        
        let cardPraSaber = new ConversationalResponse();
        cardPraSaber.type = 2;
        cardPraSaber.title = 'Pra você saber';
        cardPraSaber.speech = `IOF é o imposto sobre operações financeiras, é uma arrecadação do Governo.
        A alíquota é aplicada sobre o valor financiado, para essa proposta o valor chega aproximadamente 3%.
        Ao incorporar, esse valor é adicionado ao valor financiamento, caso opte em não financiar o valor será 
        descontado do montante a ser creditado no ato a liberação de recurso.`;

        response.push(cardPraSaber);

        let cardExemplo = new ConversationalResponse();
        cardExemplo.type = 2;
        cardExemplo.title = 'Exemplo';
        cardExemplo.speech = `Simulando um crédito de R$100.000,00 aproximadamente R$3.000,00 será de 10F.
        Se decidir incorporar ao financiamento, o valor de R$3.000,00 (referente ao IOF) será somado ao valor 
        financiado, totalizando o saldo devedor para R$103.000,00. Caso opte em pagar o IOF, o valor do IOF 
        será abatido do valor a ser creditado em sua conta. Ou seja, na liberação do crédito cairá R$97.000,00 
        em sua conta, pois o banco precisa repassar o valor referente ao IOF, para o governo.`;

        response.push(cardExemplo);

        let msg1 = new ConversationalResponse();
        msg1.type = 0;
        msg1.speech = `Agora ficou fácil decidir, não é?`;

        response.push(msg1);

        break;
      case 'Confira o resumo da sua proposta e todos os dados que você preencheu.':
        let msg2 = new ConversationalResponse();
        msg2.type = 0;
        msg2.speech = `ao clicar no botão "enviar para análise" você receberá um sms com um código para validação de segurança.`;

        response.push(msg2);
        break;
      case 'Sucesso! Sua proposta de n° 76593246 já foi enviada.':
        let msgSucesso = new ConversationalResponse();
        msgSucesso.type = 0;
        msgSucesso.speech = `Em até 1 hora, você receberá um email com o resultado da sua análise de crédito.`;
        
        response.push(msgSucesso);

        let msgEmail = new ConversationalResponse();
        msgEmail.type = 0;
        msgEmail.speech = `Em até 1 hora, você receberá um email com o resultado da sua análise de crédito.`;
        
        response.push(msgEmail);

        let msgPrxEtapas = new ConversationalResponse();
        msgPrxEtapas.type = 0;
        msgPrxEtapas.speech = `Nas próximas etapas, estarei te ajudando com a documentação e os dados complementares necessários.`;
        
        response.push(msgPrxEtapas);

        let msgFinalizar = new ConversationalResponse();

        const btnFinalizar = new Array<Button>();
        btnFinalizar.push(new Button('Seguir para os próximos passos', '', () => { this.userMessage = 'Seguir para os próximos passos'; this.sendMessage(new Message('../../../assets/user-avatar.png', new Date(), new Array<Content>(new Content('simple_text', 'Seguir para os próximos passos', undefined, undefined, undefined, undefined)), false)); }));
        
        msgFinalizar.speech = `Quando receber o e-mail, clique no botão abaixo.`;
        msgFinalizar.type = 1;
        msgFinalizar.buttons = btnFinalizar;

        response.push(msgFinalizar);
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
        let msgFallback = new ConversationalResponse();
        var value = await this.chatGPTService.getResponse(userMessage);
        msgFallback.type = 0;
        msgFallback.speech = value.choices[0].message.content
        response.push(msgFallback);
    }
    
    return response;
  }
}
