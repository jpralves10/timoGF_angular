import { Injectable } from '@angular/core';
import { ChatData, ChatAuthentication, ChatHistory } from '../data/chat';
import { Observable, of } from 'rxjs';
//import { defaultData } from './data/favorit-mock.data';

@Injectable({
  providedIn: 'root'
})
export class ChatMockService implements ChatData {

  constructor() {}

  getChatAutentica(nome: string, email: string): Observable<ChatAuthentication>{
    // return undefined;
    return of(null);
  }

  getChatReceive(id: number, limit: number, hitory: boolean, last: number): Observable<ChatHistory>{
    // return undefined;
    return of(null);
  }

  setChatSend(id: number, mensagem: string): Observable<any>{
    // return undefined;
    return of(null);
  }
}
