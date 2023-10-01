import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuSemaineComponent } from './menu-semaine/menu-semaine.component';
import { MeetUpComponent } from './meet-up/meet-up.component';
import { ResidentComponent } from './resident/resident.component';
import { ResidentFormsComponent } from './resident-forms/resident-forms.component';

const routes: Routes = [
    { path: '', redirectTo: 'resident', pathMatch: 'full' },
    { path: 'resident', component: ResidentComponent },
    { path: 'resident/:id', component: ResidentFormsComponent },
    { path: 'menu-semaine', component: MenuSemaineComponent },
    { path: 'meet-up', component: MeetUpComponent },
    { path: 'blog', loadChildren: () => import('../gestionnaire/blog/blog.module').then(m => m.BlogModule) },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GestionnaireRoutingModule { }
