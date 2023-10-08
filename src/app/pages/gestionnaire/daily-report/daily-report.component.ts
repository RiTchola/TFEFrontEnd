import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DailyReport } from 'src/app/models/daily-report';
import { MessageService } from 'primeng/api';
import { DailyReportService } from '../service/daily-report.service';
import { Util } from 'src/app/shared/util';

@Component({
    selector: 'app-daily-report',
    templateUrl: './daily-report.component.html',
    styleUrls: ['./daily-report.component.scss'],
    providers: [MessageService]
})
export class DailyReportComponent implements OnInit {

    reports: DailyReport[] = [];
    residentId = 0;
    report?: DailyReport;
    show = false;
    isNewRecord = true;

    constructor(
        private msgSrv: MessageService,
        private reportSrv: DailyReportService,
        private router: Router
    ) {
        this.residentId = Number.parseInt(this.router.url.split("/")[this.router.url.split("/").length - 1]);
    }

    ngOnInit(): void {
        this.fetchAllReports();
    }

    fetchAllReports() {
        this.reportSrv.fetchByResident(this.residentId).subscribe({
            next: (r) => this.reports = r,
            error: (err) => console.log(err)
        })
    }

    onSave(event: string) {
        try {
            const report: DailyReport = JSON.parse(event);
            this.reports.push(report);
            this.onSuccess('Nouveau rapport ajouté avec success');
            this.show = false;
        } catch (error) {
            this.show = true;
        }
    }

    addNewReport() {
        this.isNewRecord = true;
        this.show = true;
    }

    view(report: DailyReport) {
        this.router.navigateByUrl(`/gestionnaire/daily-report/details/${this.residentId}/${report.id}`);
    }

    edit(report: DailyReport) {
        this.router.navigateByUrl(`/gestionnaire/daily-report/edit/${report.id}`);
    }

    onSuccess(msg: string) {
        this.msgSrv.add({ severity: 'success', summary: 'Success', detail: msg });
    }

    onError(msg: string) {
        this.msgSrv.add({ severity: 'error', summary: 'Erreur', detail: msg });
    }

    getDate(date: any) {
        return Util.displayAsDate(date);
    }
}
