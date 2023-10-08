import { AuthService } from 'src/app/core/services/auth.service';
import { Injectable } from '@angular/core';

import { ResidentService } from '../../gestionnaire/service/resident.service';
import { DailyReportService } from '../../gestionnaire/service/daily-report.service';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    constructor(private authSrv: AuthService,
        private dailyReportSrv: DailyReportService,
        private residentSrv: ResidentService
    ) { }

    fetchDailyReports(id: number) {
        return this.dailyReportSrv.fetchByResident(id);
    }

    fetchAllResidents() {
        return this.residentSrv.fetchResidents(this.authSrv.getLoggedUser());
    }
}
