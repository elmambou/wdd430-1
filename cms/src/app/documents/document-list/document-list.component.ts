import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent: EventEmitter<Document> = new EventEmitter<Document>();

  documents: Document[] = [
    new Document(1, 'Document One', 'This is my document!', 'https://www.google.com/', []),
    new Document(2, 'Document Two', 'This is my other document!', 'https://www.bing.com/', []),
    new Document(3, 'Document Three', 'I am the third document!', 'https://duckduckgo.com/', []),
    new Document(4, 'Document Four', 'I am the fourth document!', 'https://singpraises.net/', []),
  ];

  onSelected(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
