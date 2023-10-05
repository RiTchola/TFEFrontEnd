import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactPersonService } from '../../service/contact-person.service';
import { ContactPerson } from 'src/app/models/contact-person';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
    providers: [ConfirmationService, MessageService]
})
export class ContactPersonDetailsComponent implements OnInit {

    residentId = 0;
    personId = 0;
    person?: ContactPerson;

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
        this.contactpersonSrv.fetchById(this.personId).subscribe({
            next: (r) => this.person = r,
            error: (err) => console.log(err)
        });
    }

    remove() {
        this.confirmationService.confirm({
            header: 'Êtes vous sure?',
            message: 'Cette action est irréversible',
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass: 'p-button-danger',
            rejectButtonStyleClass: 'p-button-outlined',
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

    personEdit() {
        this.router.navigateByUrl(`/gestionnaire/contact-person/edit/${this.residentId}/${this.personId}`);
    }

    personUserEdit() { }

    onSuccess(msg: string) {
        this.msgSrv.add({ severity: 'success', summary: 'Success', detail: msg });
    }

    onError(msg: string) {
        this.msgSrv.add({ severity: 'error', summary: 'Erreur', detail: msg });
    }
}
