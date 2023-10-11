import { Component, OnInit } from '@angular/core';
import { PrimeIcons } from 'primeng/api';

import { DashboardService } from '../services/dashboard.service';
import { ResidentService } from '../../gestionnaire/service/resident.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Resident } from 'src/app/models/resident';
import { DailyReport } from 'src/app/models/daily-report';
import { RoleType } from 'src/app/shared/interfaces/roleType';

interface Item {
    color?: string;
    description: string;
    header: string;
    icon: string;
    text: number;
    total: number;
}

@Component({
    selector: 'app-accueil',
    templateUrl: './accueil.component.html',
    styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

    items: Item[] = [];
    residents!: Resident[];
    dailyReports: DailyReport[] = [];
    isAdmin = false;

    constructor(
        private authSrv: AuthService,
        private dashboardSrv: DashboardService,
        private residentSrv: ResidentService
    ) { }

    ngOnInit(): void {
        this.isAdmin = this.authSrv.isAdmin() || this.authSrv.getRole().toLowerCase() == RoleType.etablissement.toLowerCase();
        this.populateItems();
    }

    populateItems() {
        this.fetchAllResidents();
    }

    fetchAllResidents() {
        this.residentSrv.fetchResidents(this.authSrv.getLoggedUser()).subscribe({
            next: (r) => {
                this.residents = r;
                this.items.push({
                    color: 'orange',
                    description: "résidents",
                    icon: PrimeIcons.USER,
                    text: r.length,
                    header: "Résident",
                    total: r.length
                });
            }, complete: () => {
                this.residents.forEach(x => {
                    if (x.id) {
                        this.fetchDailyReports(x.id);
                    }
                });
            }
        })
    }

    fetchDailyReports(id: number) {
        this.dashboardSrv.fetchDailyReports(id).subscribe({
            next: (r) => {
                r.forEach(x => this.dailyReports.push(x));
            },
            error: (err) => console.error(err),
            complete: () => {
                const item = this.items.find(x => x.description == 'rapports');
                if (item) {
                    item.total = this.dailyReports?.length;
                    item.text = item.total;
                }
                else {
                    this.items.push({
                        color: 'green',
                        description: "rapports",
                        icon: PrimeIcons.FILE_PDF,
                        text: this.dailyReports?.length,
                        header: "Rapports",
                        total: this.dailyReports?.length
                    });
                }
            }
        });
    }
}
