import { Resident } from 'src/app/models/resident';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResidentService } from '../../service/resident.service';
import { Util } from 'src/app/shared/util';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { MedecinTraitant } from 'src/app/models/medecin-traitant';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
    providers: [ConfirmationService, MessageService]
})
export class DetailsComponent implements OnInit {

    residentId = 0;
    resident?: Resident;
    medecin?: MedecinTraitant;

    constructor(
        private residentSrv: ResidentService,
        private confirmationService: ConfirmationService,
        private msgSrv: MessageService,
        private router: Router
    ) {
        const parts = this.router.url.split("/");
        this.residentId = Number.parseInt(this.router.url.split("/")[this.router.url.split("/").length - 1]);
    }

    ngOnInit(): void {
        this.getResidentById(this.residentId);
    }

    getResidentById(id: number) {
        this.residentSrv.fetchById(id).subscribe({
            next: (r) => this.resident = r,
            complete: () => console.log(this.resident)
        })
    }

    getDate(date: any) {
        return Util.displayAsDate(date);
    }

    residentEdit() {
        this.router.navigateByUrl(`/gestionnaire/resident/edit/${this.residentId}`);
    }


   /*  disable() {
        this.confirmationService.confirm({
            header: 'Êtes vous sure?',
            message: 'Cette action est irréversible',
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass: 'p-button-danger',
            rejectButtonStyleClass: 'p-button-outlined',
            accept: () => {
                this.residentSrv.remove(this.residentId).subscribe({
                    next: () => this.onSuccess('Le contact à été supprimé'),
                    error: () => this.onError('Erreur de la suppression'),
                    complete: () => {
                        setTimeout(() => {
                            this.router.navigateByUrl(`/gestionnaire/resident`);
                        }, 500);
                    }
                });
            }
        });
    }

    onSuccess(msg: string) {
        this.msgSrv.add({ severity: 'success', summary: 'Success', detail: msg });
    }

    onError(msg: string) {
        this.msgSrv.add({ severity: 'error', summary: 'Erreur', detail: msg });
    } */
}
