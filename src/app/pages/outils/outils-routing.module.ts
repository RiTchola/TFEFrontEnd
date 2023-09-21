import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImagesVideoComponent } from './images-video/images-video.component';
import { EtablissementComponent } from './etablissement/etablissement.component';

const routes: Routes = [
    { path: '', redirectTo: 'images-video', pathMatch: 'full' },
    { path: 'images-video', component: ImagesVideoComponent },
    {
        path: 'rapport-visite',
        loadChildren: () =>
            import('./rapport-visite/submit-visit-report/submit-visit-report.module').then(
                (m) => m.SubmitVisitReportModule
            ),
    },
    { path: 'etablissement', component: EtablissementComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OutilsRoutingModule {}
