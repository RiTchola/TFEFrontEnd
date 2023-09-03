import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotfoundComponent} from "./components/notfound/notfound.component";
import {RouterLink} from "@angular/router";


@NgModule({
    declarations: [NotfoundComponent],
    exports: [NotfoundComponent],
    imports: [
        CommonModule,
        RouterLink
    ]
})
export class SharedModule {
}
