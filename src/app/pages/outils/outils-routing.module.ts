import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImagesVideoComponent } from './images-video/images-video.component';
import { RapportVisiteComponent } from './rapport-visite/rapport-visite.component';


const routes: Routes = [
  { path: '', redirectTo: 'images-video', pathMatch: 'full' },
  { path: 'images-video', component: ImagesVideoComponent},
  { path: 'rapport-visite', component: RapportVisiteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutilsRoutingModule { }