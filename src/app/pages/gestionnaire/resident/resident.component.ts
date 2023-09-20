import { Component, OnInit } from '@angular/core';

import { Resident } from 'src/app/models/resident';
import { ResidentService } from '../service/resident.service';

@Component({
    selector: 'app-resident',
    templateUrl: './resident.component.html',
    styleUrls: ['./resident.component.scss']
})
export class ResidentComponent implements OnInit {
    residents: Resident[] = [];
    residents2: any[] = [];

    constructor(private srv: ResidentService) {
        this.residents2 = [
            { nom: 'Test', email: 'test@local.com', dateNaissance: '2022.01.12', status: '1', chambre: '1' },
            { nom: 'Test2', email: 'test2@local.com', dateNaissance: '2001.01.12', status: '2', chambre: '2' },
            { nom: 'Test3', email: 'test3@local.com', dateNaissance: '1997.01.12', status: '3', chambre: '3' },
            { nom: 'Test4', email: 'test4@local.com', dateNaissance: '1999.01.12', status: '4', chambre: '4' },
            { nom: 'Test5', email: 'test5@local.com', dateNaissance: '2000.01.12', status: '5', chambre: '5' },
            { nom: 'Test6', email: 'test6@local.com', dateNaissance: '2002.01.12', status: '6', chambre: '6' },
            { nom: 'Test7', email: 'test7@local.com', dateNaissance: '2003.01.12', status: '7', chambre: '7' },
        ];
    }

    ngOnInit(): void {
        this.populateList();
    }

    populateList() {
        this.srv.fetchAllResidents().subscribe({
            next: (r) => this.residents = r,
            error: (err) => console.error(err)
        });
    }

    view() {

    }

    edit() {

    }
}
