import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './shared/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import {adminGuard} from "./core/guards/auth.guard";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', //canActivate: [adminGuard],
                component: AppLayoutComponent,
                children: [
                    { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
                    { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'calendrier', loadChildren: () => import('./pages/calendrier/calendrier.module').then(m => m.CalendrierModule) },
                    { path: 'gestionnaire', loadChildren: () => import('./pages/gestionnaire/gestionnaire.module').then(m => m.GestionnaireModule) },
                    { path: 'outils', loadChildren: () => import('./pages/outils/outils.module').then(m => m.OutilsModule) },
                    { path: 'parametre', loadChildren: () => import('./pages/parametre/parametre.module').then(m => m.ParametreModule) },
                ]
            },
            { path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
