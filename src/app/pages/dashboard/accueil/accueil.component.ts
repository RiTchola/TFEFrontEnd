import { Component, OnInit } from '@angular/core';
import { PrimeIcons } from 'primeng/api';

import { DashboardService } from '../services/dashboard.service';
import { ResidentService } from '../../gestionnaire/service/resident.service';
import { AuthService } from 'src/app/core/services/auth.service';

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

    constructor(
        private authSrv: AuthService,
        private dashboardSrv: DashboardService,
        private residentSrv: ResidentService
    ) { }

    ngOnInit(): void {
        this.populateItems();
    }

    populateItems() {
        //this.fetchAllRapports();
        this.fetchAllResidents();
    }

    fetchAllResidents() {
        this.residentSrv.fetchResidents(this.authSrv.getLoggedUser()).subscribe({
            next: (r) => {
                this.items.push({
                    color: 'orange',
                    description: "résidents",
                    icon: PrimeIcons.USER,
                    text: r.length,
                    header: "Résident",
                    total: r.length
                });
            }
        })
    }

    fetchAllRapports() {
        this.dashboardSrv.fetchAllRapports().subscribe({
            next: (r) => {
                this.items.push({
                    color: 'green',
                    description: "rapports",
                    icon: PrimeIcons.FILE_PDF,
                    text: r.length,
                    header: "Rapport upload",
                    total: r.length
                });
            },
            error: (err) => console.error(err)
        });
    }
}
