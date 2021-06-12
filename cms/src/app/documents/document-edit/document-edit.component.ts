import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document | null = null;
  document?: Document;
  editMode: boolean = false;
  id?: string;

  constructor(private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute) { }

  onSubmit(f: NgForm) {
    var value = f.value;
    var newDocument = new Document(value.id, value.name, value.description, value.url, []);
    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument!, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }
    this.router.navigate(['documents']);
  }

  onCancel() {
    this.router.navigate(['documents']);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      if (!this.id) {
        this.editMode = false;
        return;
      }
      this.originalDocument = this.documentService.getDocument(this.id);
      if (!this.originalDocument) return;
      this.editMode = true;
      this.document = JSON.parse(JSON.stringify(this.originalDocument));
    });
  }

}
