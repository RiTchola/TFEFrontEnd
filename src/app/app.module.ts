import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import {SharedModule} from "./shared/shared.module";


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        SharedModule,
        AppRoutingModule,
        AppLayoutModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
