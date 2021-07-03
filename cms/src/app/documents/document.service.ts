import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription, Observable, throwError } from 'rxjs';
import { Subject } from 'rxjs';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  @Output() documentSelectedEvent: EventEmitter<Document> = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();

  documents: Document[] = [];
//   maxDocumentId: number = 0;

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document | null {
    for (const document of this.documents) {
      if (document.id == id) return document;
    }
    return null;
  }

//   getMaxId(): number {
//     let maxId = 0;
//     for (const document of this.documents) {
//       let currentId = parseInt(document.id);
//       if (currentId > maxId) maxId = currentId;
//     }
//     return maxId;
//   }

  addDocument(newDocument: Document) {
    if (!newDocument) return;
    newDocument.id = '';

    // add new document to documents
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.post<{ message: string, document: Document }>('http://localhost:3000/documents', newDocument, { headers: headers })
      .subscribe(
        (responseData) => {
          this.documents.push(responseData.document);
          this.documentListChangedEvent.next(this.documents.slice());
        }
      );
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) return;
    const position = this.documents.indexOf(originalDocument);
    if (position < 0) return;
    newDocument.id = originalDocument.id;

    // update database
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.put<any>('http://localhost:3000/documents/' + originalDocument.id, newDocument, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.documents[position] = newDocument;
          this.documentListChangedEvent.next(this.documents.slice());
        }
      );
  }

  deleteDocument(document: Document) {
    if (!document) return;
    const position = this.documents.indexOf(document);
    if (position < 0) return;

    // delete from database
    this.http.delete<any>('http://localhost:3000/documents/' + document.id)
      .subscribe(
        (response: Response) => {
          this.documents.splice(position, 1);
          this.documentListChangedEvent.next(this.documents.slice());
        }
      );
  }

//   storeDocuments() {
//     const documentsJson = JSON.stringify(this.documents);
//     const httpOptions = {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//       })
//     }
//     this.http.put<Document[]>('https://wdd-430-cms-b60cd-default-rtdb.firebaseio.com/documents.json', documentsJson, httpOptions).subscribe(() => this.documentListChangedEvent.next(this.documents.slice()));
//
//   }

  constructor(private http: HttpClient) {
    this.http.get<Document[]>('http://localhost:3000/documents').subscribe((documentsList: Document[]) => {
        this.documents = documentsList;
//         this.maxDocumentId = this.getMaxId();
        this.documents.sort((a, b) => parseInt(a.id) > parseInt(b.id) ? 1 : 0);
        this.documentListChangedEvent.next(this.documents.slice());
      }, (error: any) => { console.log(error); });
  }
}
