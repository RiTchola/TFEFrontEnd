import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubmitVisitReportComponent } from './submit-visit-report.component';

const routes: Routes = [{ path: '', component: SubmitVisitReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubmitVisitReportRoutingModule { }
