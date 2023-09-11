import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import { CardModule } from 'primeng/card';

import { AccueilComponent } from './accueil/accueil.component';

@NgModule({
    imports: [
        CommonModule,
        DashboardsRoutingModule,
        CardModule
    ],
    declarations: [ AccueilComponent]
})
export class DashboardModule { }
