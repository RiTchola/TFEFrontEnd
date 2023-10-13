

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
import { QRCodeModule } from 'angularx-qrcode';

import { ImagesVideoComponent } from './images-video/images-video.component';
import { RapportVisiteComponent } from './rapport-visite/rapport-visite.component';
import { QrcodeComponent } from './qrcode/qrcode.component';
import {CalendarModule} from "primeng/calendar";
import {DropdownModule} from "primeng/dropdown";
import {FileUploadComponent} from "../../shared/components/file-upload/file-upload.component";
import {FileUploadModule} from "primeng/fileupload";
import {ProgressBarModule} from "primeng/progressbar";
import {RippleModule} from "primeng/ripple";

@NgModule({
    declarations: [
        ImagesVideoComponent,
        RapportVisiteComponent,
        QrcodeComponent
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
        FileUploadComponent,
        FileUploadModule,
        ProgressBarModule,
        RippleModule,

        QRCodeModule
    ]
})
export class OutilsModule {
}
