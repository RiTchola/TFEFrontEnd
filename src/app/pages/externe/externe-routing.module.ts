import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [{path: '', redirectTo: 'rapport-visite', pathMatch: 'full'},
    {
        path: 'rapport-visite',
        loadChildren: () =>
            import(
                './submit-visit-report/submit-visit-report.module'
                ).then((m) => m.SubmitVisitReportModule),
    },];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ExterneRoutingModule {
}
