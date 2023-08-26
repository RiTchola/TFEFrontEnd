import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OutilsRoutingModule } from './outils-routing.module';
import { OutilsComponent } from './outils.component';
import { ImagesVideoComponent } from './images-video/images-video.component';
import { RapportVisiteComponent } from './rapport-visite/rapport-visite.component';


@NgModule({
  declarations: [
    OutilsComponent,
    ImagesVideoComponent,
    RapportVisiteComponent
  ],
  imports: [
    CommonModule,
    OutilsRoutingModule
  ]
})
export class OutilsModule { }
