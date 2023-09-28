import { Component, OnInit } from '@angular/core';
import { Etablissement } from 'src/app/models/etablissement';
import { EtablissementService } from '../services/etablissement.service';

@Component({
    selector: 'app-etablissement',
    templateUrl: './etablissement.component.html',
    styleUrls: ['./etablissement.component.scss']
})
export class EtablissementComponent implements OnInit {

    currentEtab!: Etablissement;
    visible: boolean = false;

    constructor(private etabSrv: EtablissementService) { }

    ngOnInit(): void {
        this.getEtablishment();
    }

    getEtablishment() {
        this.etabSrv.get().subscribe({
            next: (res) => this.currentEtab = res,
            error: (err) => console.error(err)
        });
    }

    showForm() {
        this.visible = true;
    }
}
