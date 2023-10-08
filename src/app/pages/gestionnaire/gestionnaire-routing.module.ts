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
import { DailyReportFormsComponent } from './daily-report/daily-report-forms/daily-report-forms.component';
import { DailyReportDetailsComponent } from './daily-report/daily-report-details/daily-report-details.component';
import { MenuDetailsComponent } from './menu-semaine/menu-details/menu-details.component';
import { MenuFormsComponent } from './menu-semaine/menu-forms/menu-forms.component';

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
    { path: 'daily-report/details/:residentId/:reportId', component: DailyReportDetailsComponent },
    { path: 'daily-report/edit/:reportId', component: DailyReportFormsComponent },
    { path: 'contact-person/:id', component: ContactPersonComponent },
    { path: 'contact-person/:residentId/add', component: ContactPersonFormComponent },
    { path: 'contact-person/edit/:residentId/:personId', component: ContactPersonFormComponent },
    { path: 'contact-person/details/:residentId/:personId', component: ContactPersonDetailsComponent },
    { path: 'contact-person/edit/user/:userId/:personId', component: UserFormsComponent},
    { path: 'contact-person/add/user/:personId', component: UserFormsComponent},
    { path: 'menu-semaine', component: MenuSemaineComponent },
    { path: 'menu-semaine/details/:date', component: MenuDetailsComponent },
    { path: 'menu-semaine/add', component: MenuFormsComponent },
    { path: 'meet-up', component: MeetUpComponent },
    { path: 'blog', component: BlogComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GestionnaireRoutingModule { }
