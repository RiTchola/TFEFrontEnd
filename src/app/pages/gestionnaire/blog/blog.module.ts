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
        DialogModule
    ],
    providers: [MessageService]
})
export class BlogModule { }
