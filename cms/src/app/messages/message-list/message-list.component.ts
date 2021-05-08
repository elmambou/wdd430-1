import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  messages: Message[] = [
    new Message(1, 'Hello', 'Hello, world!', 'Mars'),
    new Message(2, 'Redacted', 'Iyay adhay izzapay orfay innerday. Atwhay aboutyay ouyay?', 'Agent 47'),
    new Message(3, 'Good luck with your interview', 'Don’t forget to brush your teeth!', 'Mom'),
  ];

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
