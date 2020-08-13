import { Injectable } from '@angular/core';
import { ChatAuthentication, ChatHistory, ChatData } from '../data/chat';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService implements ChatData {

  constructor(private apiService: ApiService) { }
  
  getChatAutentica(nome: string, email: string): Observable<ChatAuthentication>{
    return this.apiService.post('chat/autentica', {'nome': nome.toString(), 'email': email.toString()});
  }

  getChatReceive(id: number, limit: number, history: boolean, last?: number): Observable<ChatHistory>{
    return this.apiService.get('chat/receive/' + id, {'limit': limit.toString(), 'history': history.toString(), 'last': !last ? 'last' : last.toString() });
  }

  setChatSend(id: number, mensagem: string): Observable<any>{
    return this.apiService.post('chat', {'id': id.toString(), 'mensagem': mensagem.toString()});
  }
}
