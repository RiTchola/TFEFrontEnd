import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {ChangePasswordComponent} from "./components/change-password/change-password.component";
import {NewPasswordComponent} from "./components/new-password/new-password.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'error', loadChildren: () => import('./components/error/error.module').then(m => m.ErrorModule) },
        { path: 'access', loadChildren: () => import('./components/access/access.module').then(m => m.AccessModule) },
        { path: 'login', component: LoginComponent},
        { path: 'change-password', component: ChangePasswordComponent},
        { path: 'new-password', component: NewPasswordComponent},
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
