import { Component, OnInit } from '@angular/core';
import {InstitutionalService} from '../../core/services/institutional.service';
import {Contact} from '../../core/data/contact';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public contact: Contact;

  constructor(private institutional: InstitutionalService) { }

  ngOnInit() {
    this.institutional.contact.subscribe(contact => this.contact = contact);
  }

}
