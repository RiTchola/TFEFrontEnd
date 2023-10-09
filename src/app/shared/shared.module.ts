import { NgModule } from '@angular/core';
import { RouterLink } from "@angular/router";

import { CommonModule } from '@angular/common';

import { NotfoundComponent } from "./components/notfound/notfound.component";
import {TroncatePipe} from "./pipes/troncate.pipe";

@NgModule({
    declarations: [NotfoundComponent, TroncatePipe],
    exports: [NotfoundComponent, TroncatePipe],
    imports: [
        CommonModule,
        RouterLink,
    ]
})
export class SharedModule {
}
