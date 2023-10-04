import {LOCALE_ID, NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import {SharedModule} from "./shared/shared.module";
import localeFR from "@angular/common/locales/fr";
import {registerLocaleData} from "@angular/common";

registerLocaleData(localeFR);

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        SharedModule,
        AppRoutingModule,
        AppLayoutModule
    ],
    providers: [{provide: LOCALE_ID, useValue: 'fr-FR'}],
    bootstrap: [AppComponent]
})
export class AppModule { }
