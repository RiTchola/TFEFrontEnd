import { Component, OnInit } from '@angular/core';
import { ResidentService } from '../service/resident.service';
import { Router } from '@angular/router';
import { DailyReport } from 'src/app/models/daily-report';

@Component({
  selector: 'app-daily-report',
  templateUrl: './daily-report.component.html',
  styleUrls: ['./daily-report.component.scss']
})
export class DailyReportComponent implements OnInit {

    reports: DailyReport[] = [];
    residentId = 0;

    constructor(
        private residentSrv: ResidentService,
        private router: Router
    ) {
        this.residentId = Number.parseInt(this.router.url.split("/")[this.router.url.split("/").length - 1]);
    }

    ngOnInit(): void {
        this.getResidentById(this.residentId)
    }

    getResidentById(id: number) {
        this.residentSrv.fetchById(id).subscribe({
            next: (r) => this.reports = [],
            complete: () => console.log(this.reports)
        })
    }

    view(report: DailyReport) {

    }

    edit(report: DailyReport) {

    }

}
