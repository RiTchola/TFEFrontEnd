import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendrierRoutingModule } from './calendrier-routing.module';
import { ActivitesComponent } from './activites/activites.component';
import { EvenementsComponent } from './evenements/evenements.component';
import {FullCalendarModule} from "@fullcalendar/angular";
import {CalendarModule} from "primeng/calendar";
import {InputTextareaModule} from "primeng/inputtextarea";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";


@NgModule({
  declarations: [
    ActivitesComponent,
    EvenementsComponent
  ],
    imports: [
        CommonModule,
        CalendrierRoutingModule,
        FullCalendarModule,
        CalendarModule,
        InputTextareaModule,
        FormsModule,
        InputTextModule,
        DialogModule,
        DropdownModule,
        ToastModule
    ],
    providers: [MessageService]
})
export class CalendrierModule { }
