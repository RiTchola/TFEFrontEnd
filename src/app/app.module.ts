import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import {SharedModule} from "./shared/shared.module";
import {JwtInterceptor} from "./core/interceptors/jwt.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        SharedModule,
        AppRoutingModule,
        AppLayoutModule
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
