import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResidentsComponent } from './residents/residents.component';
import { MenuSemaineComponent } from './menu-semaine/menu-semaine.component';
import { MeetUpComponent } from './meet-up/meet-up.component';
import { BlogComponent } from './blog/blog.component';

const routes: Routes = [
  { path: '', redirectTo: 'resident', pathMatch: 'full' },
  { path: 'resident', component: ResidentsComponent },
  { path: 'menu-semaine', component: MenuSemaineComponent },
  { path: 'meet-up', component: MeetUpComponent},
  { path: 'blog', component: BlogComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionnaireRoutingModule { }
