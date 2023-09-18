import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubmitVisitReportRoutingModule } from './submit-visit-report-routing.module';
import { SubmitVisitReportComponent } from './submit-visit-report.component';


@NgModule({
  declarations: [
    SubmitVisitReportComponent
  ],
  imports: [
    CommonModule,
    SubmitVisitReportRoutingModule
  ]
})
export class SubmitVisitReportModule { }
