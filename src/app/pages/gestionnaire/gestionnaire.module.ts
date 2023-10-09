import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table'
import { TagModule } from 'primeng/tag';

import { GestionnaireRoutingModule } from './gestionnaire-routing.module';
import { ResidentComponent } from './resident/resident.component';
import { MenuSemaineComponent } from './menu-semaine/menu-semaine.component';
import { MeetUpComponent } from './meet-up/meet-up.component';
import { ResidentFormsComponent } from './resident-forms/resident-forms.component';


@NgModule({
    declarations: [
        ResidentComponent,
        MenuSemaineComponent,
        MeetUpComponent,
        ResidentFormsComponent
    ],
    exports: [
    ],
    imports: [
        CommonModule,
        FormsModule,
        CalendarModule,
        DropdownModule,
        GestionnaireRoutingModule,
        ButtonModule,
        InputTextModule,
        TableModule,
        TagModule
    ]
})
export class GestionnaireModule { }
