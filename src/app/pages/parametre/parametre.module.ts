import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParametreRoutingModule } from './parametre-routing.module';

import { ToastModule } from 'primeng/toast';

import { CompteComponent } from './compte/compte.component';
import { DeconnexionComponent } from './deconnexion/deconnexion.component';
import { EtablissementModule } from '../outils/etablissement/etablissement.module';


@NgModule({
    declarations: [
        CompteComponent,
        DeconnexionComponent,
    ],
    imports: [
        CommonModule,
        ParametreRoutingModule,
        EtablissementModule,
        ToastModule
    ]
})
export class ParametreModule { }
