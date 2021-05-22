import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  messages: Message[] = [];

  onAddMessage(message: Message) {
    this.messageService.addMessage(message);
  }

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.messages = this.messageService.getMessages().slice();
    this.messageService.messageChangedEvent
      .subscribe((messages) => this.messages = messages.slice())
  }

}
