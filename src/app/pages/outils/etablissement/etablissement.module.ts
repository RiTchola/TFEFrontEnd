import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from "primeng/inputtext";
import { MessageModule } from 'primeng/message';
import { CalendarModule } from 'primeng/calendar';
import { EtablissementRoutingModule } from './etablissement-routing.module';

import { EtablissementComponent } from './etablissement.component';
import { EtablissementFormsComponent } from 'src/app/pages/outils/etablissement/etablissement-forms/etablissement-forms.component';


@NgModule({
    declarations: [
        EtablissementComponent,
        EtablissementFormsComponent
    ],
    imports: [
        CommonModule,
        EtablissementRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        DialogModule,
        InputTextModule,
        MessageModule,
        CalendarModule
    ]
})
export class EtablissementModule { }
