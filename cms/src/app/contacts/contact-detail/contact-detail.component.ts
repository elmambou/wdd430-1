import { Component, OnInit } from '@angular/core';

import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contact: Contact = new Contact(1, 'Samuel', 'test-user@example.com', '801-555-1234', '../../assets/images/samuel.jpg', []);

  constructor() { }

  ngOnInit(): void {
  }

}
