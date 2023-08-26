import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import { AccueilComponent } from './accueil/accueil.component';

@NgModule({
    imports: [
        CommonModule,
        DashboardsRoutingModule
    ],
    declarations: [DashboardComponent, AccueilComponent]
})
export class DashboardModule { }
