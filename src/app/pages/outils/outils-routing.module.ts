import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImagesVideoComponent } from './images-video/images-video.component';
import { EtablissementComponent } from './etablissement/etablissement.component';
import { RapportVisiteComponent } from './rapport-visite/rapport-visite.component';
import { establissementGuard } from 'src/app/core/guards/auth.guard';
import { QrcodeComponent } from './qrcode/qrcode.component';
const routes: Routes = [
    { path: '', redirectTo: 'images-video', pathMatch: 'full' },
    { path: 'images-video', component: ImagesVideoComponent },
    { path: 'rapport-visite', component: RapportVisiteComponent, canActivate: [establissementGuard] },
    { path: 'qrcode', component: QrcodeComponent, canActivate: [establissementGuard] },
    { path: 'etablissement', component: EtablissementComponent, canActivate: [establissementGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OutilsRoutingModule { }
