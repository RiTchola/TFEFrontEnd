import { Component } from '@angular/core';

import { EtablissementService } from '../../services/etablissement.service';

import { Etablissement } from './../../../../models/etablissement';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-etablissement-forms',
    templateUrl: './etablissement-forms.component.html',
    styleUrls: ['./etablissement-forms.component.scss'],
    providers: [MessageService]
})
export class EtablissementFormsComponent {

    name = '';
    email1 = '';
    email2 = '';
    tel1 = '';
    tel2 = '';
    adresse = '';
    dateCreation = '';
    username = '';

    constructor(private msgSrv: MessageService, private etablisSrv: EtablissementService) { }

    save() {
        const data: Etablissement = {
            adresse: this.adresse,
            email1: this.email1,
            email2: this.email2,
            tel1: this.tel1,
            tel2: this.tel2,
            dateCreation: this.dateCreation,
            nom: this.name,
            etabUsername: this.username,
        };

        this.etablisSrv.add(data).subscribe({
            next: (result) => {
                this.showSuccessViaToast(result);
            },
            error: (err) => console.error(err)
        });
    }

    showSuccessViaToast(msg: string) {
        this.msgSrv.add({ key: 'tst', severity: 'success', summary: 'Success', detail: msg });
    }


}
