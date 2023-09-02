import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import {ButtonModule} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import {RippleModule} from "primeng/ripple";
import {FormsModule} from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        ButtonModule,
        DividerModule,
        InputTextModule,
        PasswordModule,
        RippleModule,
        FormsModule
    ],
    declarations: [
      LoginComponent,
      ChangePasswordComponent
    ]
})
export class AuthModule { }
