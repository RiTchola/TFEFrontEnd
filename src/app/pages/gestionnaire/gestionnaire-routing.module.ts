import { MeetUpFormsComponent } from './meet-up/meet-up-forms/meet-up-forms.component';
import { CreateMenuComponent } from './menu-semaine/create-menu/create-menu.component';
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
import { MenuFormsComponent } from './menu-semaine/menu-forms/menu-forms.component';
import { EditMenuComponent } from './menu-semaine/edit-menu/edit-menu.component';
import { contactPersonGuard, establissementGuard } from 'src/app/core/guards/auth.guard';
import { ImagesVideoComponent } from '../outils/images-video/images-video.component';

const routes: Routes = [
    { path: '', redirectTo: 'resident', pathMatch: 'full' },
    { path: 'resident', component: ResidentComponent, canActivate: [establissementGuard] },
    { path: 'resident/details/:id', component: DetailsComponent, canActivate: [establissementGuard, contactPersonGuard] },
    {
        path: 'resident/add', component: ManageComponent,
        canActivate: [establissementGuard],
        children: [
            { path: 'user', component: UserFormsComponent },
            { path: 'medecin', component: MedecinFormsComponent },
            { path: 'resident', component: ResidentFormsComponent },
            { path: '', redirectTo: 'user', pathMatch: 'full' },
        ],
    },
    {
        path: 'resident/edit/:id', component: ManageComponent,
        canActivate: [establissementGuard],
        children: [
            { path: 'user', component: UserFormsComponent },
            { path: 'medecin', component: MedecinFormsComponent },
            { path: 'resident', component: ResidentFormsComponent },
            { path: '', redirectTo: 'user', pathMatch: 'full' },
        ],
    },
    { path: 'daily-report/:id', component: DailyReportComponent, canActivate: [establissementGuard, contactPersonGuard] },
    { path: 'daily-report/details/:residentId/:reportId', component: DailyReportDetailsComponent, canActivate: [establissementGuard, contactPersonGuard] },
    { path: 'daily-report/edit/:reportId', component: DailyReportFormsComponent, canActivate: [establissementGuard, contactPersonGuard] },
    { path: 'contact-person/:id', component: ContactPersonComponent },
    { path: 'contact-person/:residentId/add', component: ContactPersonFormComponent, canActivate: [establissementGuard] },
    { path: 'contact-person/edit/:residentId/:personId', component: ContactPersonFormComponent, canActivate: [establissementGuard] },
    { path: 'contact-person/details/:residentId/:personId', component: ContactPersonDetailsComponent },
    { path: 'contact-person/edit/user/:userId/:personId', component: UserFormsComponent, canActivate: [establissementGuard] },
    { path: 'contact-person/add/user/:personId', component: UserFormsComponent, canActivate: [establissementGuard] },
    { path: 'menu-semaine', component: MenuSemaineComponent },
    { path: 'menu-semaine/:date', component: MenuSemaineComponent },
    { path: 'menu-semaine/edit/:date/:day', component: EditMenuComponent, canActivate: [establissementGuard] },
    {
        path: 'menu-semaine/add/:date', component: CreateMenuComponent,
        canActivate: [establissementGuard],
        children: [
            { path: 'lundi', component: MenuFormsComponent },
            { path: 'mardi', component: MenuFormsComponent },
            { path: 'mercredi', component: MenuFormsComponent },
            { path: 'jeudi', component: MenuFormsComponent },
            { path: 'vendredi', component: MenuFormsComponent },
            { path: 'samedi', component: MenuFormsComponent },
            { path: 'dimanche', component: MenuFormsComponent },
            { path: '', redirectTo: 'lundi', pathMatch: 'full' },
        ],
    },
    { path: 'meet-up', component: MeetUpComponent, canActivate: [establissementGuard, contactPersonGuard] },
    { path: 'meet-up/edit/:id', component: MeetUpFormsComponent, canActivate: [establissementGuard, contactPersonGuard] },
    { path: 'blog', loadChildren: () => import('../gestionnaire/blog/blog.module').then(m => m.BlogModule) },
    { path: 'images/video', component: ImagesVideoComponent, canActivate: [establissementGuard, contactPersonGuard] },

       
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GestionnaireRoutingModule { }
