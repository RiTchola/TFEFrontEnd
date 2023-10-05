import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuSemaineComponent } from './menu-semaine/menu-semaine.component';
import { MeetUpComponent } from './meet-up/meet-up.component';
import { BlogComponent } from './blog/blog.component';
import { ResidentComponent } from './resident/resident.component';
import { ResidentFormsComponent } from './resident/resident-forms/resident-forms.component';
import { MedecinFormsComponent } from './resident/medecin-forms/medecin-forms.component';
import { UserFormsComponent } from './user-forms/user-forms.component';
import { ManageComponent } from './resident/manage/manage.component';
import { DetailsComponent } from './resident/details/details.component';
import { DailyReportComponent } from './daily-report/daily-report.component';
import { ContactPersonComponent } from './contact-person/contact-person.component';
import { ContactPersonFormComponent } from './contact-person/contact-person-form/contact-person-form.component';
import { ContactPersonDetailsComponent } from './contact-person/details/details.component';

const routes: Routes = [
    { path: '', redirectTo: 'resident', pathMatch: 'full' },
    { path: 'resident', component: ResidentComponent },
    { path: 'resident/details/:id', component: DetailsComponent },
    {
        path: 'resident/add', component: ManageComponent,
        children: [
            { path: 'user', component: UserFormsComponent },
            { path: 'medecin', component: MedecinFormsComponent },
            { path: 'resident', component: ResidentFormsComponent },
            { path: '', redirectTo: 'user', pathMatch: 'full' },
        ],
    },
    {
        path: 'resident/edit/:id', component: ManageComponent,
        children: [
            { path: 'user', component: UserFormsComponent },
            { path: 'medecin', component: MedecinFormsComponent },
            { path: 'resident', component: ResidentFormsComponent },
            { path: '', redirectTo: 'user', pathMatch: 'full' },
        ],
    },
    { path: 'daily-report/:id', component: DailyReportComponent },
    { path: 'contact-person/:id', component: ContactPersonComponent },
    { path: 'contact-person/:residentId/add', component: ContactPersonFormComponent },
    { path: 'contact-person/edit/:residentId/:personId', component: ContactPersonFormComponent },
    { path: 'contact-person/details/:residentId/:personId', component: ContactPersonDetailsComponent },
    { path: 'menu-semaine', component: MenuSemaineComponent },
    { path: 'meet-up', component: MeetUpComponent },
    { path: 'blog', component: BlogComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GestionnaireRoutingModule { }
