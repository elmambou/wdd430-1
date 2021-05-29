import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WinRefService } from '../../win-ref.service';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  selectedDocument?: Document | null;
  nativeWindow: any;

  constructor(
    private documentService: DocumentService,
    private windowRefService: WinRefService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.nativeWindow = windowRefService.getNativeWindow();
  }

  onView() {
    if (this.selectedDocument?.url) {
      this.nativeWindow.open(this.selectedDocument.url);
    }
  }

  onDelete() {
    if (this.selectedDocument) {
      this.documentService.deleteDocument(this.selectedDocument);
      this.router.navigate(['/documents']);
    }
  }

  ngOnInit(): void {
    this.route.params
      .subscribe((params) => this.selectedDocument = this.documentService.getDocument(params.id));
  }

}
