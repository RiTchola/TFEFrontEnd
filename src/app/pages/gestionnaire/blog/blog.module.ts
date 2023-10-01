import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import {ToastModule} from "primeng/toast";
import {ButtonModule} from "primeng/button";
import {MessageService} from "primeng/api";
import {CardModule} from "primeng/card";
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";
import {InputTextareaModule} from "primeng/inputtextarea";
import {FileUploadComponent} from "../../../shared/components/file-upload/file-upload.component";
import {ImageModule} from "primeng/image";


@NgModule({
  declarations: [
    BlogComponent,
    BlogDetailComponent
  ],
    imports: [
        CommonModule,
        BlogRoutingModule,
        ToastModule,
        ButtonModule,
        CardModule,
        DialogModule,
        InputTextModule,
        ReactiveFormsModule,
        FormsModule,
        CalendarModule,
        InputTextareaModule,
        FileUploadComponent,
        ImageModule
    ],
    providers: [MessageService]
})
export class BlogModule { }
