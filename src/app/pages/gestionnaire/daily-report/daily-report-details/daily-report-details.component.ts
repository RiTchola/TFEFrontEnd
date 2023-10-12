import { Component, OnInit } from '@angular/core';
import { DailyReport } from 'src/app/models/daily-report';
import { DailyReportService } from '../../service/daily-report.service';
import { Router } from '@angular/router';
import { Util } from 'src/app/shared/util';
import { AuthService } from 'src/app/core/services/auth.service';
import { RoleType } from 'src/app/shared/interfaces/roleType';

@Component({
  selector: 'app-daily-report-details',
  templateUrl: './daily-report-details.component.html',
  styleUrls: ['./daily-report-details.component.scss']
})
export class DailyReportDetailsComponent implements OnInit {

    residentId = 0;
    reportId = 0;
    report?: DailyReport;
    canAdd = false;

    constructor(
        private authSrv: AuthService,
        private reportSrv: DailyReportService,
        private router: Router
    ) {
        const parts = this.router.url.split("/");
        this.reportId = Number.parseInt(parts[parts.length - 1]);
        this.residentId = Number.parseInt(parts[parts.length - 2]);
    }

    ngOnInit(): void {
        this.canAdd = this.authSrv.isAdmin() || this.authSrv.getRole().toLowerCase() === RoleType.etablissement.toLowerCase()
        this.fetchById();
    }

    fetchById() {
        this.reportSrv.fetchById(this.reportId).subscribe({
            next: (r) => this.report = r,
            error: (err) => console.log(err)
        });
    }

    getDate(date: any) {
        return Util.displayAsDate(date);
    }
}