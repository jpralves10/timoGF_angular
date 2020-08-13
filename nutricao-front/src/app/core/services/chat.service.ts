import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChatHistory, ChatAuthentication } from '../data/chat';
import { ChatService } from '../http/chat.service';
import { scheduleJob } from 'node-schedule';

@Injectable({
    providedIn: 'root'
})
export class UpdateChatService {

  private chatHistorySource: BehaviorSubject<ChatHistory> = new BehaviorSubject(this.getChatHistory());
  public chatHistory: Observable<ChatHistory> = this.chatHistorySource.asObservable();

  constructor(
    private chatService: ChatService
  ){
    localStorage.setItem('chatHistory', JSON.stringify(''));
  }

  chatAuthentication(nome: string, email: string){
    return new Promise((resolve, reject) => {

        this.chatService.getChatAutentica(nome, email).subscribe(res => {

          this.saveChatAuthentication(res)

          this.getChatReceive(res.atendimento_sessao_id, 10, true)

          resolve(true);

        }, err => {
          reject(err);
        });
    });
  }

  getChatReceive(id: number, limit: number, hitory: boolean, last?: number): Promise<any> {
    return new Promise((resolve, reject) => {

      this.chatService.getChatReceive(id, limit, hitory, last).subscribe(chatHistory => {

        chatHistory.models.forEach(model => {
          model.person = model.sender_id == this.getChatAuthentication().atendimento_sessao_id ? 'message me' : 'message other'
        })

        this.saveChatHistory(chatHistory);
        
        //this.alertService.set({type: 'success', message: `Seja bem vindo, ${res.data.name}!`});

        resolve(true);

      }, err => {
        reject(err);
      });
    });
  }

  setChatReceive(message: string, idLastMessage: number){
    this.chatService.setChatSend(this.getChatAuthentication().atendimento_sessao_id, message).subscribe(returnSend => {

      if(returnSend.statusCode === 201){
        this.getChatReceive(this.getChatAuthentication().atendimento_sessao_id, 1, false, idLastMessage)
      }
    })
  }

  saveChatAuthentication(chatAuthentication: ChatAuthentication) {
    localStorage.setItem('chatAuthentication', JSON.stringify(chatAuthentication));
  }

  getChatAuthentication(): ChatAuthentication {
    return JSON.parse(localStorage.getItem('chatAuthentication'));
  }

  saveChatHistory(chatHistory: ChatHistory) {
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));

    this.chatHistorySource.next(chatHistory);
  }

  getChatHistory(): ChatHistory {
    return JSON.parse(localStorage.getItem('chatHistory'));
  }
}