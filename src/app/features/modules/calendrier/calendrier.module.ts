import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendrierRoutingModule } from './calendrier-routing.module';
import { CalendrierComponent } from './calendrier.component';
import { ActivitesComponent } from './activites/activites.component';
import { EvenementsComponent } from './evenements/evenements.component';


@NgModule({
  declarations: [
    CalendrierComponent,
    ActivitesComponent,
    EvenementsComponent
  ],
  imports: [
    CommonModule,
    CalendrierRoutingModule
  ]
})
export class CalendrierModule { }
