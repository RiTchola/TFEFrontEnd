import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuSemaineComponent } from './menu-semaine/menu-semaine.component';
import { MeetUpComponent } from './meet-up/meet-up.component';
import { BlogComponent } from './blog/blog.component';
import { ResidentComponent } from './resident/resident.component';
import { ResidentFormsComponent } from './resident-forms/resident-forms.component';

const routes: Routes = [
    { path: '', redirectTo: 'resident', pathMatch: 'full' },
    { path: 'resident', component: ResidentComponent },
    { path: 'resident/:id', component: ResidentFormsComponent },
    { path: 'menu-semaine', component: MenuSemaineComponent },
    { path: 'meet-up', component: MeetUpComponent },
    { path: 'blog', component: BlogComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GestionnaireRoutingModule { }
