import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtablissementComponent } from './etablissement.component';
import { adminGuard, establissementGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [{ path: '', canActivate: [adminGuard, establissementGuard], component: EtablissementComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EtablissementRoutingModule { }
