import {Observable} from 'rxjs';

export interface ChatAuthentication {
    atendimento_sessao_id: number;
    atendimento_sessao_email: string;
    atendimento_sessao_nome: string;
    atendimento_sessao_data_hora_gmt: string;
    aplicativo_instancia_id: number;
}

export interface ChatHistory {
    count: 1,
    keys: string[],
    models: Message[]
}

export interface Message {
    id?: string,
    sender_id?: number,
    receiver_id?: number,
    text?: string,
    is_new?: number,
    is_deleted_by_sender?: number,
    is_deleted_by_receiver?: number,
    created_at?: number,
    updated_at?: number,
    status?: number,
    person?: string
}

export abstract class ChatData{
  abstract getChatAutentica(nome: string, email: string): Observable<ChatAuthentication>;
  abstract getChatReceive(id: number, limit: number, hitory: boolean, last?: number): Observable<ChatHistory>;
  abstract setChatSend(id: number, mensagem: string): Observable<any>;
}