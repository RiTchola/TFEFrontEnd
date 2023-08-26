import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './features/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
                    { path: 'dashboard', loadChildren: () => import('./features/modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'calendrier', loadChildren: () => import('./features/modules/calendrier/calendrier.module').then(m => m.CalendrierModule) },
                    { path: 'gestionnaire', loadChildren: () => import('./features/modules/gestionnaire/gestionnaire.module').then(m => m.GestionnaireModule) },
                    { path: 'outils', loadChildren: () => import('./features/modules/outils/outils.module').then(m => m.OutilsModule) },
                    { path: 'parametre', loadChildren: () => import('./features/modules/parametre/parametre.module').then(m => m.ParametreModule) },
                ]
            },
            { path: 'auth', loadChildren: () => import('./features/modules/auth/auth.module').then(m => m.AuthModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
