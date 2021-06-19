import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit, OnDestroy {
  messages: Message[] = [];

  subscription?: Subscription;

  onAddMessage(message: Message) {
    this.messageService.addMessage(message);
  }

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.messages = this.messageService.getMessages();
    this.subscription = this.messageService.messageListChangedEvent
      .subscribe((messagesList: Message[]) => this.messages = messagesList.slice())
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
