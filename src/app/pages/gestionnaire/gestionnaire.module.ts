import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { StepsModule } from 'primeng/steps';
import { StepsModule } from 'primeng/steps';
import { TableModule } from 'primeng/table'
import { TagModule } from 'primeng/tag';;
import { ToastModule } from 'primeng/toast';

import { GestionnaireRoutingModule } from './gestionnaire-routing.module';
import { ResidentComponent } from './resident/resident.component';
import { MenuSemaineComponent } from './menu-semaine/menu-semaine.component';
import { MeetUpComponent } from './meet-up/meet-up.component';
import { BlogComponent } from './blog/blog.component';
import { ResidentFormsComponent } from './resident/resident-forms/resident-forms.component';
import { MedecinFormsComponent } from './resident/medecin-forms/medecin-forms.component';
import { UserFormsComponent } from './user-forms/user-forms.component';
import { ManageComponent } from './resident/manage/manage.component';
import { DetailsComponent } from './resident/details/details.component';
import { DailyReportComponent } from './daily-report/daily-report.component';
import { ContactPersonComponent } from './contact-person/contact-person.component';
import { ContactPersonFormComponent } from './contact-person/contact-person-form/contact-person-form.component';
import { ContactPersonDetailsComponent } from './contact-person/details/details.component';
import { DailyReportFormsComponent } from './daily-report/daily-report-forms/daily-report-forms.component';
import { DailyReportDetailsComponent } from './daily-report/daily-report-details/daily-report-details.component';
import { MenuFormsComponent } from './menu-semaine/menu-forms/menu-forms.component';
import { CreateMenuComponent } from './menu-semaine/create-menu/create-menu.component';
import { EditMenuComponent } from './menu-semaine/edit-menu/edit-menu.component';
import { MeetUpFormsComponent } from './meet-up/meet-up-forms/meet-up-forms.component';

@NgModule({
    declarations: [
        ResidentComponent,
        MenuSemaineComponent,
        MeetUpComponent,
        BlogComponent,
        ResidentFormsComponent,
        UserFormsComponent,
        MedecinFormsComponent,
        ManageComponent,
        DetailsComponent,
        DailyReportComponent,
        ContactPersonComponent,
        ContactPersonFormComponent,
        ContactPersonDetailsComponent,
        DailyReportFormsComponent,
        DailyReportDetailsComponent,
        MenuFormsComponent,
        CreateMenuComponent,
        EditMenuComponent,
        MeetUpFormsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CalendarModule,
        CheckboxModule,
        ConfirmDialogModule,
        ConfirmPopupModule,
        DialogModule,
        DropdownModule,
        GestionnaireRoutingModule,
        ButtonModule,
        InputTextModule,
        StepsModule,
        TableModule,
        TagModule,
        ToastModule
    ]
})
export class GestionnaireModule { }
