import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OutilsRoutingModule} from './outils-routing.module';
import {ImagesVideoComponent} from './images-video/images-video.component';
import {RapportVisiteComponent} from './rapport-visite/rapport-visite.component';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from "primeng/inputtext";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
    declarations: [
        ImagesVideoComponent,
        RapportVisiteComponent
    ],
    imports: [
        CommonModule,
        OutilsRoutingModule,
        TableModule,
        DialogModule,
        HttpClientModule,
        ButtonModule,
        InputTextModule

    ]
})
export class OutilsModule {
}
