import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactPerson } from './../../../models/contact-person';
import { Util } from 'src/app/shared/util';
import { ContactPersonService } from '../service/contact-person.service';

@Component({
    selector: 'app-contact-person',
    templateUrl: './contact-person.component.html',
    styleUrls: ['./contact-person.component.scss']
})
export class ContactPersonComponent implements OnInit {

    contacts: ContactPerson[] = [];
    residentId = 0;

    constructor(
        private contactPersonSrv: ContactPersonService,
        private router: Router
    ) {
        this.residentId = Number.parseInt(this.router.url.split("/")[this.router.url.split("/").length - 1]);
    }

    ngOnInit(): void {
        this.getResidentById(this.residentId);
    }

    getResidentById(id: number) {
        this.contactPersonSrv.fetchAll(id).subscribe({
            next: (r) => this.contacts = r,
            error: (err) => console.log(err)
        })
    }

    getDateOf(date: any) {
        return Util.displayAsDate(date);
    }

    view(contact: ContactPerson) {
        this.router.navigateByUrl(`/gestionnaire/contact-person/details/${this.residentId}/${contact.id}`);
    }

    edit(contact: ContactPerson) {
        this.router.navigateByUrl(`/gestionnaire/contact-person/edit/${this.residentId}/${contact.id}`);
    }
}
