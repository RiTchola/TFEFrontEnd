import {Component, OnInit} from '@angular/core';
import {RapportVisiteTable} from 'src/app/models/rapport-visite-table';
import {RapportDeVisiteService} from '../services/rapport-de-visite.service';

@Component({
    selector: 'app-rapport-visite',
    templateUrl: './rapport-visite.component.html',
    styleUrls: ['./rapport-visite.component.scss'],
})
export class RapportVisiteComponent implements OnInit {
    rapportVisiteTable: RapportVisiteTable[] = [];
    rapportVisiteTable2: RapportVisiteTable[] = [];

    rapportVisiteHelper: RapportVisiteTable = {
        id: 0,
        nomResid: '',
        prenomResid: '',
        dateVisite: new Date(),
        nomVisiteur: '',
        typePersonne: 'ENFANT',
        dateBirthResid: new Date(),
        commentaire: ""
    };

    visible: boolean = false;

    constructor(private rvt: RapportDeVisiteService) {
    }

    ngOnInit(): void {
        this.rapportVisiteTable2 = [
            {
                id: 0,
                nomResid: 'Doe',
                prenomResid: 'check',
                dateVisite: new Date(),
                nomVisiteur: 'Hello',
                typePersonne: 'ENFANT',
                dateBirthResid: new Date(),
                commentaire: "Hallllos dsfgdsfgsdfgsd fdsf fdsfdsf"
            },
            {
                id: 1,
                nomResid: 'Doe',
                prenomResid: 'check',
                dateVisite: new Date(),
                nomVisiteur: 'Hello',
                typePersonne: 'ENFANT',
                dateBirthResid: new Date(),
                commentaire: "Hallllos dsfgdsfgsdfgsd fdsf fdsfdsf"
            }
        ]
    }

    view(rv: RapportVisiteTable) {

    }

    showDialog(rv: RapportVisiteTable) {
        this.visible = true;
        this.rapportVisiteHelper = rv;

    }
}
