import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExterneRoutingModule } from './externe-routing.module';
import { ExterneComponent } from './externe.component';


@NgModule({
  declarations: [
    ExterneComponent
  ],
  imports: [
    CommonModule,
    ExterneRoutingModule
  ]
})
export class ExterneModule { }
