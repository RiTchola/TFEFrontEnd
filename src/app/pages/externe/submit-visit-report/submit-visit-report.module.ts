import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubmitVisitReportRoutingModule } from './submit-visit-report-routing.module';
import { SubmitVisitReportComponent } from './submit-visit-report.component';
import { ToastModule } from 'primeng/toast';
import { StepsModule } from 'primeng/steps';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    SubmitVisitReportComponent,
  ],
    imports: [
        CommonModule,
        SubmitVisitReportRoutingModule,
        ToastModule,
        StepsModule,
        CardModule,
        DropdownModule,
        ButtonModule,
        InputTextModule,
        CalendarModule,
        InputTextareaModule,
        CheckboxModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class SubmitVisitReportModule { }
