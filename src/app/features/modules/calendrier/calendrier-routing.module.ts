import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitesComponent } from './activites/activites.component';
import { EvenementsComponent } from './evenements/evenements.component';

const routes: Routes = [
  { path: '', redirectTo: 'activites', pathMatch: 'full' },
  { path: 'activites', component: ActivitesComponent},
  { path: 'evenements', component: EvenementsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendrierRoutingModule { }
