import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExterneComponent} from './externe.component';

const routes: Routes = [{path: '', component: ExterneComponent},
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
