import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
    selector: 'app-submit-visit-report',
    templateUrl: './submit-visit-report.component.html',
    styleUrls: ['./submit-visit-report.component.scss'],
    providers: [MessageService],
})
export class SubmitVisitReportComponent {
    items: MenuItem[] = [
        {
            label: "Information de l'établissement",
            routerLink: 'info-etablissement',
        },
        {
            label: 'Information du residant',
            routerLink: 'info-residant',
        },
        {
            label: 'Informations de la personne Externe',
            routerLink: 'info-person-externe',
        },
        {
            label: 'Remplir les informations de la visite',
            routerLink: 'info-visite',
        },
        {
            label: 'Confirmation',
            routerLink: 'confirmation',
        },
    ];
}
