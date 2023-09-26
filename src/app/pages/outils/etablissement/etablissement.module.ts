import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EtablissementRoutingModule } from './etablissement-routing.module';
import { EtablissementComponent } from './etablissement.component';


@NgModule({
  declarations: [
    EtablissementComponent
  ],
  imports: [
    CommonModule,
    EtablissementRoutingModule
  ]
})
export class EtablissementModule { }
