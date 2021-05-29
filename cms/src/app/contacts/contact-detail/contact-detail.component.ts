import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  selectedContact?: Contact | null;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  onDelete() {
    if (this.selectedContact) {
      this.contactService.deleteContact(this.selectedContact);
      this.router.navigate(['/contacts']);
    }
  }

  ngOnInit(): void {
    this.route.params
      .subscribe((params) => this.selectedContact = this.contactService.getContact(params.id));
  }

}
