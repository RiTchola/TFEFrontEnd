import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubmitVisitReportRoutingModule } from './submit-visit-report-routing.module';
import { SubmitVisitReportComponent } from './submit-visit-report.component';
import { InfoEtablissementComponent } from './info-etablissement/info-etablissement.component';
import { InfoResidantComponent } from './info-residant/info-residant.component';
import { InfoPersonExterneComponent } from './info-person-externe/info-person-externe.component';
import { InfoVisiteComponent } from './info-visite/info-visite.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ToastModule } from 'primeng/toast';
import { StepsModule } from 'primeng/steps';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
    SubmitVisitReportComponent,
    InfoEtablissementComponent,
    InfoResidantComponent,
    InfoPersonExterneComponent,
    InfoVisiteComponent,
    ConfirmationComponent
  ],
  imports: [
    CommonModule,
    SubmitVisitReportRoutingModule,
    ToastModule,
    StepsModule,
    CardModule,
    DropdownModule,
    ButtonModule,
    InputTextModule
  ]
})
export class SubmitVisitReportModule { }
