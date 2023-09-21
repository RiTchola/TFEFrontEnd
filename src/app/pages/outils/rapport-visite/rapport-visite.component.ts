import { Component, OnInit } from '@angular/core';
import { RapportVisiteTable } from 'src/app/models/rapport-visite-table';
import { RapportDeVisiteService } from '../services/rapport-de-visite.service';

@Component({
    selector: 'app-rapport-visite',
    templateUrl: './rapport-visite.component.html',
    styleUrls: ['./rapport-visite.component.scss'],
})
export class RapportVisiteComponent implements OnInit {
    rapportVisiteTable: RapportVisiteTable[] = [];
    rapportVisiteTable2: RapportVisiteTable[] = [];

    constructor(private rvt: RapportDeVisiteService) {}

    ngOnInit(): void {
      this.rapportVisiteTable2 = [
        {id: 0, nom: 'Doe', prenom: 'check', typePersonne: 'Fils'},
        {id: 1, nom: 'Eduroam', prenom: 'check', typePersonne: 'Soeur'},
        {id: 2, nom: 'Bekaert', prenom: 'Wahid', typePersonne: 'File'},
        {id: 3, nom: 'Heinstein', prenom: 'wise', typePersonne: 'Avocat'},
        {id: 4, nom: 'Doe', prenom: 'wise', typePersonne: 'Amie'},
        {id: 5, nom: 'Doe', prenom: 'paste', typePersonne: 'Fils'}
      ]
    }

    view(){
      
    }
}
