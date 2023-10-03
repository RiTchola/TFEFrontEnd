import { Component, OnInit } from '@angular/core';

import { Resident } from 'src/app/models/resident';
import { ResidentService } from '../service/resident.service';

import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/core/services/auth.service';
import { Util } from 'src/app/shared/util';
import { Router } from '@angular/router';

@Component({
    selector: 'app-resident',
    templateUrl: './resident.component.html',
    styleUrls: ['./resident.component.scss'],
    providers: [MessageService]
})
export class ResidentComponent implements OnInit {
    residents: Resident[] = [];

    constructor(
        private authSrv: AuthService,
        public messageService: MessageService,
        private residentSrv: ResidentService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.populateList();
    }

    populateList() {
        const username = this.authSrv.getLoggedUser();
        this.residentSrv.fetchResidents(username).subscribe({
            next: (r) => this.residents = r,
            error: (err) => console.log(err)
        })
    }

    setDateOfBirth(date: Date) {
        return Util.displayAsDate(date);
    }


    view(resident: Resident) {
        this.router.navigate([`/gestionnaire/resident/view/${resident.id}`]);
    }

    edit(resident: Resident) {
        this.router.navigate([`/gestionnaire/resident/edit/${resident.id}`]);
    }
}
