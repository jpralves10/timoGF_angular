import { Component, OnInit } from '@angular/core';
import {Contact, ContactData} from '../../core/data/contact';
import {InstitutionalService} from '../../core/services/institutional.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent implements OnInit {

  public contact: Contact;

  constructor(private institutional: InstitutionalService) { }

  ngOnInit() {
    this.institutional.contact.subscribe(contact => this.contact = contact);
  }
}
