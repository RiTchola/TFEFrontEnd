import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OutilsRoutingModule } from './outils-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from "primeng/inputtext";
import { HttpClientModule } from "@angular/common/http";
import { ToastModule } from 'primeng/toast';
import { ImagesVideoComponent } from './images-video/images-video.component';
import { RapportVisiteComponent } from './rapport-visite/rapport-visite.component';
import {CalendarModule} from "primeng/calendar";
import {DropdownModule} from "primeng/dropdown";
import {FileUploadComponent} from "../../shared/components/file-upload/file-upload.component";

@NgModule({
    declarations: [
        ImagesVideoComponent,
        RapportVisiteComponent,
    ],
    imports: [
        CommonModule,
        OutilsRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        TableModule,
        DialogModule,
        HttpClientModule,
        ButtonModule,
        InputTextModule,
        ToastModule,
        CalendarModule,
        DropdownModule,
        FileUploadComponent

    ]
})
export class OutilsModule {
}
