import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubmitVisitReportComponent } from './submit-visit-report.component';
import { InfoEtablissementComponent } from './info-etablissement/info-etablissement.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { InfoVisiteComponent } from './info-visite/info-visite.component';
import { InfoPersonExterneComponent } from './info-person-externe/info-person-externe.component';
import { InfoResidantComponent } from './info-residant/info-residant.component';

const routes: Routes = [
    {
        path: '',
        component: SubmitVisitReportComponent,
        children: [
            { path: '', component: InfoEtablissementComponent },
            {
                path: 'info-etablissement',
                component: InfoEtablissementComponent,
            },
            { path: 'info-residant', component: InfoResidantComponent },
            {
                path: 'info-person-externe',
                component: InfoPersonExterneComponent,
            },
            { path: 'info-visite', component: InfoVisiteComponent },
            { path: 'confirmation', component: ConfirmationComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SubmitVisitReportRoutingModule {}
