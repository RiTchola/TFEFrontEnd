import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionnaireRoutingModule } from './gestionnaire-routing.module';
import { ResidentsComponent } from './residents/residents.component';
import { MenuSemaineComponent } from './menu-semaine/menu-semaine.component';
import { MeetUpComponent } from './meet-up/meet-up.component';
import { BlogComponent } from './blog/blog.component';


@NgModule({
  declarations: [
    ResidentsComponent,
    MenuSemaineComponent,
    MeetUpComponent,
    BlogComponent
  ],
  imports: [
    CommonModule,
    GestionnaireRoutingModule
  ]
})
export class GestionnaireModule { }
