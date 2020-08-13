import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Contact} from '../data/contact';

@Injectable({
  providedIn: 'root'
})
export class InstitutionalService {

  private contactSource: BehaviorSubject<Contact> = new BehaviorSubject(this.getContact());

  public contact: Observable<Contact> = this.contactSource.asObservable();

  constructor() {
  }

  setContact(contact: Contact) {
    localStorage.setItem('contact', JSON.stringify(contact));
    this.contactSource.next(contact);
  }

  getContact(): Contact  {
    return JSON.parse(localStorage.getItem('contact'));
  }
}
