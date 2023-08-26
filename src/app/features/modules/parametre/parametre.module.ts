import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametreRoutingModule } from './parametre-routing.module';
import { ParametreComponent } from './parametre.component';
import { CompteComponent } from './compte/compte.component';
import { DeconnexionComponent } from './deconnexion/deconnexion.component';


@NgModule({
  declarations: [
    ParametreComponent,
    CompteComponent,
    DeconnexionComponent
  ],
  imports: [
    CommonModule,
    ParametreRoutingModule
  ]
})
export class ParametreModule { }
