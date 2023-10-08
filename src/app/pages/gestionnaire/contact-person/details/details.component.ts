import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactPersonService } from '../../service/contact-person.service';
import { ContactPerson } from 'src/app/models/contact-person';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

import { Util } from 'src/app/shared/util';
import { User } from 'src/app/models/user';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
    providers: [ConfirmationService, MessageService]
})
export class ContactPersonDetailsComponent implements OnInit {

    residentId = NaN;
    personId = NaN;
    person?: ContactPerson;
    show = false;
    user?: User;

    constructor(
        private contactpersonSrv: ContactPersonService,
        private confirmationService: ConfirmationService,
        private msgSrv: MessageService,
        private router: Router
    ) {
        const parts = this.router.url.split("/");
        this.residentId = Number.parseInt(parts[parts.length - 2]);
        this.personId = Number.parseInt(parts[parts.length - 1]);
    }

    ngOnInit(): void {
        this.fetchById();
    }

    fetchById() {
        if (!isNaN(this.personId)) {
            this.contactpersonSrv.fetchById(this.personId).subscribe({
                next: (r) => this.person = r,
                error: (err) => console.log(err),
            });
        }
    }

    remove() {
        this.confirmationService.confirm({
            header: 'Êtes vous sure?',
            message: 'Cette action est irréversible',
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass: 'btn-danger',
            rejectButtonStyleClass: 'btn-outlined',
            accept: () => {
                this.contactpersonSrv.delete(this.personId).subscribe({
                    next: () => this.onSuccess('Le contact à été supprimé'),
                    error: () => this.onError('Erreur de la suppression'),
                    complete: () => {
                        setTimeout(() => {
                            this.router.navigateByUrl(`/gestionnaire/contact-person/${this.residentId}`);
                        }, 500);
                    }
                });
            }
        });
    }

    getDate(date: any) {
        return Util.displayAsDate(date);
    }

    personEdit() {
        if (!isNaN(this.residentId) && !isNaN(this.personId)) {
            this.router.navigateByUrl(`/gestionnaire/contact-person/edit/${this.residentId}/${this.personId}`);
        }
    }

    personUserEdit() {
        if (this.person?.idUser) {
            this.router.navigateByUrl(`/gestionnaire/contact-person/edit/user/${this.person?.idUser}/${this.personId}`);
        } else {
            this.router.navigateByUrl(`/gestionnaire/contact-person/add/user/${this.personId}`);
        }
    }

    onSave(event: boolean) {
        this.show = !event;
    }

    onSuccess(msg: string) {
        this.msgSrv.add({ severity: 'success', summary: 'Success', detail: msg });
    }

    onError(msg: string) {
        this.msgSrv.add({ severity: 'error', summary: 'Erreur', detail: msg });
    }

}
