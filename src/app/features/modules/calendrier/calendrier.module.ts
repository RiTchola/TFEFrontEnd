import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendrierRoutingModule } from './calendrier-routing.module';
import { ActivitesComponent } from './activites/activites.component';
import { EvenementsComponent } from './evenements/evenements.component';


@NgModule({
  declarations: [
    ActivitesComponent,
    EvenementsComponent
  ],
  imports: [
    CommonModule,
    CalendrierRoutingModule
  ]
})
export class CalendrierModule { }
