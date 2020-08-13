import { Injectable } from '@angular/core';
import {Contact, ContactData} from '../data/contact';
import {Observable, of} from 'rxjs';
import {defaultData} from './data/contact-mock.data';

@Injectable({
  providedIn: 'root'
})
export class ContactMockService implements ContactData {

  constructor() { }

    getContacts(): Observable<Contact> {
        return of(defaultData);
    }

}
