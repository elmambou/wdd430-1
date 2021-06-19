import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription, Observable, throwError } from 'rxjs';
import { Subject } from 'rxjs';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  @Output() messageChangedEvent: EventEmitter<Message[]> = new EventEmitter<Message[]>();
  messageListChangedEvent = new Subject<Message[]>();

  messages: Message[] = [];
  maxMessageId: number = 0;

  getMessages(): Message[] {
    return this.messages.slice();
  }

  getMessage(id: string): Message | null {
    for (const message of this.messages) {
      if (message.id == id) return message;
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;
    for (const message of this.messages) {
      let currentId = parseInt(message.id);
      if (currentId > maxId) maxId = currentId;
    }
    return maxId;
  }

  addMessage(newMessage: Message) {
    if (!newMessage) return;
    this.maxMessageId++;
    newMessage.id = this.maxMessageId.toString();
    this.messages.push(newMessage);
    this.storeMessages();
  }

  updateMessage(originalMessage: Message, newMessage: Message) {
    if (!originalMessage || !newMessage) return;
    const position = this.messages.indexOf(originalMessage);
    if (position < 0) return;
    newMessage.id = originalMessage.id;
    this.messages[position] = newMessage;
    this.storeMessages();
  }

  deleteMessage(message: Message) {
    if (!message) return;
    const position = this.messages.indexOf(message);
    if (position < 0) return;
    this.messages.splice(position, 1);
    this.storeMessages();
  }

  storeMessages() {
    const messagesJson = JSON.stringify(this.messages);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    this.http.put<Message[]>('https://wdd-430-cms-b60cd-default-rtdb.firebaseio.com/messages.json', messagesJson, httpOptions).subscribe(() => this.messageListChangedEvent.next(this.messages.slice()));

  }

  constructor(private http: HttpClient) {
    this.http.get<Message[]>('https://wdd-430-cms-b60cd-default-rtdb.firebaseio.com/messages.json').subscribe((messagesList: Message[]) => {
        this.messages = messagesList;
        this.maxMessageId = this.getMaxId();
        this.messages.sort((a, b) => parseInt(a.id) > parseInt(b.id) ? 1 : 0);
        this.messageListChangedEvent.next(this.messages.slice());
      }, (error: any) => { console.log(error); });
  }
}
