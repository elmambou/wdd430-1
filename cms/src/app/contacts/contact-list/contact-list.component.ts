import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];

  subscription?: Subscription;

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
//     this.contactService.contactChangedEvent
//       .subscribe((contacts) => this.contacts = contacts.slice())
    this.subscription = this.contactService.contactListChangedEvent
      .subscribe((contactsList: Contact[]) => this.contacts = contactsList.slice())
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
