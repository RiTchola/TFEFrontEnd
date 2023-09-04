import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import {PasswordModule} from "primeng/password";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {DividerModule} from "primeng/divider";
import {ToastModule} from "primeng/toast";

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        PasswordModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        InputTextModule,
        DividerModule,
        ToastModule
    ],
    declarations: [
      LoginComponent,
      ChangePasswordComponent
    ]
})
export class AuthModule { }
