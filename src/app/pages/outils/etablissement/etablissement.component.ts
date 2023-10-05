import { Component, OnInit } from '@angular/core';

import { Etablissement } from 'src/app/models/etablissement';

import { EtablissementService } from '../services/etablissement.service';
import { MessageService } from 'primeng/api';

import { Util } from 'src/app/shared/util';

@Component({
    selector: 'app-etablissement',
    templateUrl: './etablissement.component.html',
    styleUrls: ['./etablissement.component.scss'],
    providers: [MessageService]
})
export class EtablissementComponent implements OnInit {

    currentEtab!: Etablissement;
    visible: boolean = false;

    constructor(private etabSrv: EtablissementService, private msgSrv: MessageService) { }

    ngOnInit(): void {
        this.getEtablishment();
    }

    getEtablishment() {
        this.etabSrv.get().subscribe({
            next: (res) => {
                if (res) {
                    this.currentEtab = res
                }
            },
            error: (err) => console.error(err)
        });
    }

    showForm() {
        this.visible = true;
    }

    closeForm(msg: string) {
        if (msg) {
            this.showSuccessViaToast(msg);
            this.getEtablishment();
            this.visible = false;
        }
    }

    showSuccessViaToast(msg: string) {
        this.msgSrv.add({ key: 'tst', severity: 'success', summary: 'Success', detail: msg });
    }


}
