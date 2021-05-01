import { Component, OnInit } from '@angular/core';

import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [
    new Contact(1, 'Samuel', 'test-user@example.com', '801-555-1234', '../../assets/images/samuel.jpg', []),
    new Contact(2, 'Calvin', 'test-user2@example.com', '801-555-4321', '../../assets/images/calvin.jpg', []),
    new Contact(3, 'Hobbes', 'test-user3@example.com', '801-555-1324', '../../assets/images/hobbes.jpg', []),
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
