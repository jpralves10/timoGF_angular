import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Contact, ContactData} from '../data/contact';
import {InstitutionalService} from '../services/institutional.service';

@Injectable()
export class ContactResolver implements Resolve<Contact> {
  constructor(private contactData: ContactData, private institutional: InstitutionalService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Contact>|Promise<Contact>|Contact {
    this.contactData.getContacts().subscribe(contact =>{
      this.institutional.setContact(contact);
    });
    return null;
  }
}
