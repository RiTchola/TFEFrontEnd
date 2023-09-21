import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutilsRoutingModule } from './outils-routing.module';
import { ImagesVideoComponent } from './images-video/images-video.component';
import { RapportVisiteComponent } from './rapport-visite/rapport-visite.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [
    ImagesVideoComponent,
    RapportVisiteComponent
  ],
  imports: [
    CommonModule,
    OutilsRoutingModule,
    TableModule,
    ButtonModule

  ]
})
export class OutilsModule { }
