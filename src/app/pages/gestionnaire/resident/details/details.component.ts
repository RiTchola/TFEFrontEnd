import { Resident } from 'src/app/models/resident';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResidentService } from '../../service/resident.service';
import { Util } from 'src/app/shared/util';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

    residentId = 0;
    resident?: Resident;

    constructor(
        private router: Router,
        private residentSrv: ResidentService
    ) {
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
}
