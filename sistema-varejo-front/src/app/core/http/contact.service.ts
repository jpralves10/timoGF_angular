import {Contact, ContactData} from '../data/contact';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class ContactService implements ContactData {

    constructor(private apiService: ApiService) { }

    getContacts(): Observable<Contact> {
        return //this.apiService.get('catalogo/contato');
    }
}