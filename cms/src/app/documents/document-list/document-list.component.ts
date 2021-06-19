import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Document[] = [];

  subscription?: Subscription;

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
    this.subscription = this.documentService.documentListChangedEvent
      .subscribe((documentsList: Document[]) => this.documents = documentsList.slice())
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
