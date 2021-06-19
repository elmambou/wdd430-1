import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription, Observable, throwError } from 'rxjs';
import { Subject } from 'rxjs';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  @Output() contactSelectedEvent: EventEmitter<Contact> = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();

  contacts: Contact[] = [];
  maxContactId: number = 0;

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Contact | null {
    for (const contact of this.contacts) {
      if (contact.id == id) return contact;
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;
    for (const contact of this.contacts) {
      let currentId = parseInt(contact.id);
      if (currentId > maxId) maxId = currentId;
    }
    return maxId;
  }

  addContact(newContact: Contact) {
    if (!newContact) return;
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.storeContacts()
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) return;
    const position = this.contacts.indexOf(originalContact);
    if (position < 0) return;
    newContact.id = originalContact.id;
    this.contacts[position] = newContact;
    this.storeContacts()
  }

  deleteContact(contact: Contact) {
    if (!contact) return;
    const position = this.contacts.indexOf(contact);
    if (position < 0) return;
    this.contacts.splice(position, 1);
    this.storeContacts()
  }

  storeContacts() {
    const contactsJson = JSON.stringify(this.contacts);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    this.http.put<Contact[]>('https://wdd-430-cms-b60cd-default-rtdb.firebaseio.com/contacts.json', contactsJson, httpOptions).subscribe(() => this.contactListChangedEvent.next(this.contacts.slice()));

  }

  constructor(private http: HttpClient) {
    this.http.get<Contact[]>('https://wdd-430-cms-b60cd-default-rtdb.firebaseio.com/contacts.json').subscribe((contactsList: Contact[]) => {
        this.contacts = contactsList;
        this.maxContactId = this.getMaxId();
        this.contacts.sort((a, b) => parseInt(a.id) > parseInt(b.id) ? 1 : 0);
           this.contactListChangedEvent.next(this.contacts.slice());
      }, (error: any) => { console.log(error); });
  }
}
