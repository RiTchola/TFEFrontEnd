import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompteComponent } from './compte/compte.component';
import { DeconnexionComponent } from './deconnexion/deconnexion.component';

const routes: Routes = [
  { path: '', redirectTo: 'compte', pathMatch: 'full' },
  { path: 'compte', component: CompteComponent},
  { path: 'deconnexion', component: DeconnexionComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametreRoutingModule { }
