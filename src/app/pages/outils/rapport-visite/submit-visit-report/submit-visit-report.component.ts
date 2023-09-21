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
            routerLink: 'info-etablissement',
        },
        {
            routerLink: 'info-residant',
        },
        {
            routerLink: 'info-person-externe',
        },
        {
            routerLink: 'info-visite',
        }
    ];
}
