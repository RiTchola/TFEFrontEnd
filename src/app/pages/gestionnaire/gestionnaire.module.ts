import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
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
import { UserFormsComponent } from './resident/user-forms/user-forms.component';
import { ManageComponent } from './resident/manage/manage.component';
import { DetailsComponent } from './resident/details/details.component';

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
    DetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    CheckboxModule,
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
