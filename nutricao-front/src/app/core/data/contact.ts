import {Observable} from 'rxjs';


export interface Contact {
    contato_email: string;
    contato_telefone: string;
    contato_whatsapp: string;
    contato_endereco: string;
    contato_horario: string;
    contato_lat: string;
    contato_lon: string;
    contato_chat: string;
}

export abstract class ContactData{
    abstract getContacts(): Observable<Contact>;
}