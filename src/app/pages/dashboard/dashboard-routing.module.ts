import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', redirectTo: 'accueil', pathMatch: 'full' },
        {path: 'accueil', component: AccueilComponent}
    ])],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }
