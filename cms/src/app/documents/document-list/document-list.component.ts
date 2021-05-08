import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  documents: Document[] = [
    new Document(1, 'My Document', 'This is my document!', 'https://www.google.com/', []),
    new Document(2, 'Another Document', 'This is my other document!', 'https://www.bing.com/', []),
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
