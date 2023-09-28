import { NgModule } from '@angular/core';
import { RouterLink } from "@angular/router";

import { CommonModule } from '@angular/common';

import { NotfoundComponent } from "./components/notfound/notfound.component";

@NgModule({
    declarations: [NotfoundComponent],
    exports: [NotfoundComponent],
    imports: [
        CommonModule,
        RouterLink,
    ]
})
export class SharedModule {
}
