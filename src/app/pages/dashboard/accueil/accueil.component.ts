import { Component, OnInit } from '@angular/core';
import { PrimeIcons } from 'primeng/api';

import { DashboardService } from '../services/dashboard.service';

interface Item {
    color?: string;
    description: string;
    header: string;
    icon: string;
    text: string;
    total: number;
}

@Component({
    selector: 'app-accueil',
    templateUrl: './accueil.component.html',
    styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

    items: Item[] = [];

    constructor(private dashboardSrv: DashboardService) { }

    ngOnInit(): void {
        this.populateItems();
    }

    populateItems() {
        this.fetchAllRapports();
        this.fetchAllResidents();
    }

    fetchAllResidents() {
        this.dashboardSrv.fetchAllResidents().subscribe({
            next: (r) => {
                this.items.push({
                    color: 'orange',
                    description: "résidents",
                    icon: PrimeIcons.USER,
                    text: "150",
                    header: "Résident",
                    total: r.length
                });
            },
            error: (err) => console.error(err)
        });
    }

    fetchAllRapports() {
        this.dashboardSrv.fetchAllRapports().subscribe({
            next: (r) => {
                this.items.push({
                    color: 'green',
                    description: "rapports",
                    icon: PrimeIcons.FILE_PDF,
                    text: "150",
                    header: "Rapport upload",
                    total: r.length
                });
            },
            error: (err) => console.error(err)
        });
    }
}
