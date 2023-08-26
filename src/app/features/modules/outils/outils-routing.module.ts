import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OutilsComponent } from './outils.component';

const routes: Routes = [{ path: '', component: OutilsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutilsRoutingModule { }
