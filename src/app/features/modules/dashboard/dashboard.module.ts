import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import { AccueilComponent } from './accueil/accueil.component';

@NgModule({
    imports: [
        CommonModule,
        DashboardsRoutingModule
    ],
    declarations: [ AccueilComponent]
})
export class DashboardModule { }
